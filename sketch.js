/*
@author Kiwi
@date 2021-10-28

using particles and emitters to create a doppler effect

tutorial: moving particle emits circle
    circles are objects that have a fixed x,y position and lifespan
		alpha proportional to lifespan
		reaches 0: remove from circlesArray
	now we just move the circle around

coding plan:
.   expanding circle with lifetime
    .   update ➜ lifetime increase
    .   r ➜ gets bigger
    , emitter is a particle with pos, vel, acc
        edges
    . emitter makes many circles with some period
    . remove -pulses that have expired
 */


let font


function preload() {
    font = loadFont('fonts/Meiryo-01.ttf')
}


let cody
const pulses = [] // these are sound waves. circles that expand with time


function setup() {
    createCanvas(640, 360)
    colorMode(HSB, 360, 100, 100, 100)
    frameRate(60)

    cody = new Speaker(width/2, height/2)
    cody.vel = new p5.Vector()
}


function draw() {
    background(234, 34, 24)

    // have our emitter / speaker move in a circle
    cody.pos.x = 150 * cos(TAU/200*frameCount) + width/2
    cody.pos.y = 150 * sin(TAU/200*frameCount) + height/2
    cody.update()
    cody.render()
}


/*
    A speaker is a particle emitter. In this case, it emits sound waves as
    Soundpulse objects
 */
class Speaker {
    constructor(x, y) {
        this.pos = new p5.Vector(x, y)
        this.vel = p5.Vector.random2D().mult(random(0.5))
        this.acc = new p5.Vector()

        this.pulses = []
    }

    update() {
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        this.acc.mult(0)

        let n = 1
        // every n frames, we add a new pulse to our pulses
        if (frameCount % n === 0)
            this.pulses.push(new Soundpulse(this.pos.x, this.pos.y))

        // remove pulses that have exceeded their lifetime!
        for (let i=0; i<this.pulses.length; i++) {
            let p = this.pulses[i]
            p.update()
            if (p.expired)
                this.pulses.splice(1, i)
        }

        console.log(this.pulses.length)
    }

    render() {
        fill(0, 0, 100, 50)
        strokeWeight(1)
        stroke(0, 0, 100)
        square(this.pos.x, this.pos.y, 5)

        this.pulses.forEach(p => p.render())
    }
}


/*
    A single sound wave in the form of an expanding circle
 */
class Soundpulse {
    constructor(x, y) {
        this.pos = new p5.Vector(x, y)
        this.MAXLIFE = 360

        // we don't want the circle to stop growing on-screen
        this.lifetime = this.MAXLIFE
        this.expired = false
    }

    update() {
        this.lifetime -= 2.5
        if (this.lifetime <= 0)
            this.expired = true
    }

    render() {
        noFill()
        stroke(this.pos.x % 360, 100, 100,
            map(this.lifetime, 0, this.MAXLIFE, 0, 100))
        circle(this.pos.x, this.pos.y, (this.MAXLIFE - this.lifetime)*2)

        // point(this.pos.x, this.pos.y)
    }
}


function mousePressed() {
    noLoop()
}