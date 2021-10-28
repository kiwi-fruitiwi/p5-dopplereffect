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
    emitter is a particle with pos, vel, acc
        edges
    emitter makes many circles with some period
    remove -pulses that have expired


 */
let font


function preload() {
    font = loadFont('fonts/Meiryo-01.ttf')
}

let cody

function setup() {
    createCanvas(640, 360)
    colorMode(HSB, 360, 100, 100, 100)

    cody = new Soundpulse(width/2, height/2)
}


function draw() {
    background(234, 34, 24)

    cody.update()
    cody.render()
}



class Soundpulse {
    constructor(x, y) {
        this.pos = new p5.Vector(x, y)

        // we don't want the circle to stop growing on-screen
        this.lifetime = width
        this.expired = false
    }

    update() {
        this.lifetime -= 1
        if (this.lifetime <= 0)
            this.expired = true
    }

    render() {
        noFill()
        stroke(0, 0, 100, 20)
        circle(this.pos.x, this.pos.y, (width - this.lifetime)*2)
    }
}