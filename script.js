let random = (min, max) => Math.round(Math.random()*(max-min)+min)

class ParticleBG {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')
        this.w = null
        this.h = null
        this.particleData = []
        this.particleMaxCount = 200;

        this.resize()
        this.spawn()
        this.update()
    }
    spawn() {
        if (this.particleData.length < this.particleMaxCount) {
            let [x,y]=[random(0, this.w), random(0, this.h)]
            this.particleData.push(new Particle(x, y))
            this.spawn()
        }
    }

    resize() {
        this.w = this.canvas.width = innerWidth
        this.h = this.canvas.height = innerHeight
    }
    particleMove() {
        let distance = (a, b) => {
            let delta = {
                x: b.x - a.x, 
                y: b.y - a.y,
            }
            return Math.sqrt(delta.x**2 + delta.y**2 ) 

        }
        this.particleData.forEach((el, i) => {
            if (el.dx == 0 || el.dy == 0) {[el.dx,el.dy]=[random(-3, 3), random(-3, 3)]};
            if (el.x  <= 0 || el.x  >= this.w) {el.dx *= -1};
            if (el.y  <= 0 || el.y  >= this.h) {el.dy *= -1};

            this.particleData.forEach(particle => {
                let d = distance(el, particle);
                if (d < 100) {
                    this.ctx.strokeStyle = `rgba(0, 0, 0,${1-d*0.01})`;
                    this.ctx.beginPath();
                    this.ctx.moveTo(el.x, el.y);
                    this.ctx.lineTo(particle.x, particle.y);
                    this.ctx.closePath();
                    this.ctx.lineWidth = 2
                    this.ctx.stroke();
                }
            })

            el.move()
        })
    }

    draw() {
        this.particleData.forEach(el => { el.draw(this.ctx) })
    }

    update() {
        this.resize()
        
        this.particleMove()
        this.draw()
        
        // console.log(this.particleData)
        requestAnimationFrame(this.update.bind(this))
    }
}

class Particle {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.size = 1

        this.dx = random(-3, 3)
        this.dy = random(-3, 3)

    }
    draw(ctx) {
        ctx.fillStyle = 'rgba(200,200,200,.0)'
        ctx.fillRect(this.x, this.y, this.size, this.size)
    }
    move() {

        this.x += this.dx * 0.5
        this.y += this.dy * 0.5
    }
}

let wallBG = new ParticleBG(document.querySelector('canvas'))