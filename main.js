const canvas = document.querySelector("#canvas")
const intro = document.querySelector("#intro")
const ctx = canvas.getContext("2d")
const c = intro.getContext("2d")
const startBtn = document.querySelector("#start-btn")
const exitBtn = document.querySelector("#exit-btn")
const homeBtn = document.querySelector("#home")
const back = document.querySelector("#return")

canvas.width = 800
canvas.height = 400

intro.width = 800
intro.height = 400

const background = new Image()
background.src = "images/background.jpg"

const lives1 = new Image()
lives1.src = "lives-removebg-preview.png"

const lives2 = new Image()
lives2.src = "lives-removebg-preview.png"

const lives3 = new Image()
lives3.src = "lives-removebg-preview.png"

const robot = new Image()
robot.src = "images/New Piskel.png"

const energy = new Image()
energy.src = "image-removebg-preview (18).png"

const assets = new Image()
assets.src = "images/New elements.png"

var gameFrame = 0
var yb1 = 0
var yb2 = 1000
var yc1 = 1200
var Pathdiff = Math.floor(Math.random() * 400) + 300
var gameSpeed = 0
var score = 0
var finalScore = 0
var coinCount = 0
const staggeredFrames = 5

var CoinDiff = Math.floor(Math.random() * 100) + 100
var coinX = Math.floor(Math.random() * 750) + 20
var coinY = Math.floor(Math.random() * 60) + 80
var coinX2 = coinX + CoinDiff
var coinY2 = Math.floor(Math.random() * 60) + 80

class Player {
    constructor() {
        this.position = {
            x: 70,
            y: 270
        }
        this.velocity = {
            vy: 0
        }
        this.width = 78
        this.height = 80
        this.mota = 320
        this.lamba = 320
        this.frameX = 0
        this.frameY = 0
        this.load = false
        this.gravity = 0.5
        this.debug = false
        this.life1 = true
        this.life2 = true
        this.life3 = true
        this.message = false
    }

    draw() {
        ctx.drawImage(robot, this.frameX * this.mota, this.frameY * this.lamba, this.mota, this.lamba, this.position.x, this.position.y, this.width, this.height)
        if(this.debug) {
            ctx.strokeStyle = "blue"
            ctx.strokeRect(this.position.x, this.position.y, this.width, this.height)
        }
        if(this.life1)   ctx.drawImage(lives1, 610, 65, 20, 20)
        if(this.life2)   ctx.drawImage(lives2, 640, 65, 20, 20)
        if(this.life3)   ctx.drawImage(lives3, 670, 65, 20, 20)
    }

    update() {
        this.position.y += this.velocity.vy
        if(this.position.y + this.height < 350) {
            this.velocity.vy += this.gravity
        }
        else this.velocity.vy = 0

            if(gameFrame % staggeredFrames === 0) {
                if(this.frameX < 3 ) {
                    this.frameX++
                }
                else {
                    this.frameX = 0
                }
         }
    }
}


const player = new Player()

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    c.clearRect(0, 0, intro.width, intro.height)
    c.drawImage(background, 0, 0, intro.width, intro.height)
    c.fillStyle = "black"
    c.strokeStyle = "white"
    c.font = "60px Arial"
    c.fillText("ROBOTA", 290, 100)
    c.strokeText("ROBOTA", 290, 100)
    c.drawImage(robot, player.frameX * player.mota, player.frameY * player.lamba, player.mota, player.lamba, player.position.x, player.position.y, player.width, player.height)
    ctx.drawImage(background, yb1, 0, 1000, canvas.height)
    ctx.drawImage(background, yb2, 0, 1000, canvas.height)
    ctx.drawImage(assets, 3 * 80, 2* 80, 80, 80, yc1, 300, 80, 80)
    ctx.drawImage(assets, 3 * 80, 2 * 80, 80, 80, yc1 + Pathdiff, 300, 80, 80)
    ctx.drawImage(energy, coinX, coinY, 60, 60)
    ctx.drawImage(energy, coinX2, coinY2, 60, 60)
    ctx.drawImage(energy, 40, 20, 20, 20)
    ctx.fillStyle = "black"
    ctx.font = "25px Arial"
    ctx.fillText(" X " + coinCount, 60, 40)
    gameFrame++

    ctx.font = "30px Arial"
    ctx.fillStyle = "blue"
    ctx.strokeText("Score: " + score, 600, 50)
    ctx.fillText("Score: " + score, 600, 50)

    yb1 -= gameSpeed/2
    yb2 -= gameSpeed/2
    yc1 -= gameSpeed
    coinX -= gameSpeed
    coinX2 -= gameSpeed

    if(player.debug) {
        ctx.strokeStyle = "yellow"
        ctx.strokeRect(yc1, 300, 80, 80)
        ctx.strokeRect(yc1 + Pathdiff, 300, 80, 80)
    }

    if(yb1 + 1000 < 0) yb1 = 0
    if(yb2 < 0) yb2 = 1000
    if(yc1 + 100 < -600) {
        yc1 = 820
        Pathdiff = Math.floor(Math.random() * 400) + 300
    }
    if(coinX + 60 < -10) {
        coinX = 900
        coinY = Math.floor(Math.random() * 60) + 80
    }
    if(coinX2 + 60 < -10) {
        CoinDiff = Math.floor(Math.random() * 100) + 100
        coinX2 = 900 + CoinDiff
        coinY2 = Math.floor(Math.random() * 60) + 80
    }

    if(player.position.x  + player.width >= yc1 + 25 &&
        player.position.x < yc1 + 50 &&
        player.position.y + player.height >= 270) {
            yc1 = 2000
            coinX = 900
            coinY = Math.floor(Math.random() * 60) + 80
            CoinDiff = Math.floor(Math.random() * 100) + 100
            coinX2 = 900 + CoinDiff
            coinY2 = Math.floor(Math.random() * 60) + 80
            if(player.life1 === true) {
                player.life1 = false
            }
            else if(player.life1 === false && player.life2 === true) {
                player.life2 = false
            }
            else if(player.life1 === false && player.life2 === false && player.life3 === true) {
                player.life3 = false
                player.load = false
                finalScore = score
                player.message = true
                gameSpeed = 0
                score = 0
                player.life1 = true
                player.life2 = true
                player.life3 = true
                homeBtn.style.display = "flex"
                exitBtn.style.display = "none"
            }
        }
    
    if(player.position.x + player.width >= yc1 + Pathdiff + 25 &&
        player.position.x < yc1 + Pathdiff + 50 &&
        player.position.y + player.height >= 270) {
            yc1 = 2000
            Pathdiff = Math.floor(Math.random() * 400) + 300
            coinX = 900
            coinY = Math.floor(Math.random() * 60) + 80
            CoinDiff = Math.floor(Math.random() * 100) + 100
            coinX2 = 900 + CoinDiff
            coinY2 = Math.floor(Math.random() * 60) + 80
            if(player.life1 === true) {
                player.life1 = false
            }
            else if(player.life1 === false && player.life2 === true) {
                player.life2 = false
            }
            else if(player.life1 === false && player.life2 === false && player.life3 === true) {
                player.life3 = false
                player.load = false
                finalScore = score
                player.message = true
                gameSpeed = 0
                score = 0
                player.life1 = true
                player.life2 = true
                player.life3 = true
                homeBtn.style.display = "flex"
                exitBtn.style.display = "none"
            }
        }

    if(player.position.x + 0.1 + player.width > coinX &&
        player.position.y - 0.1 < coinY + 20 &&
        player.position.x - 0.1 < coinX + 20) {
            score += 50
            coinCount++
            coinX = 900
            coinY = Math.floor(Math.random() * 60) + 80
        }

    if(player.position.x + 0.1 + player.width > coinX2 &&
        player.position.y - 0.1 < coinY2 + 20 &&
        player.position.x - 0.1 < coinX2 + 20) {
            score += 50
            coinCount++
            CoinDiff = Math.floor(Math.random() * 100) + 100
            coinX2 = 900 + CoinDiff
            coinY2 = Math.floor(Math.random() * 60) + 80
        }
    
        if(player.message === true) {
            ctx.font = "50px Arial"
            ctx.fillStyle = "white"
            ctx.strokeStyle = "black"
            ctx.fillText("Final Score: " + finalScore, 200, 150)
            ctx.strokeText("Final Score: " + finalScore, 200, 150)
        }

    window.requestAnimationFrame(animate)
    player.draw()
    player.update()
}
animate()

window.addEventListener("keydown", (e) => {
    switch(e.key) {
        case "ArrowUp": {
            if(player.velocity.vy === 0) {
                player.velocity.vy = -13
            }
        break
        }
        case "d": {
            player.debug = !player.debug
        }
        break
    }
})

function start() {
    player.load = true
    startBtn.style.display = "none"
    canvas.style.display = "flex"
    intro.style.display = "none"
    exitBtn.style.display = "flex"
    back.style.display = "none"
    gameSpeed = 6
}

function exitGame() {
    yc1 = 1200
    player.load = false
    startBtn.style.display = "flex"
    canvas.style.display = "none"
    intro.style.display = "flex"
    exitBtn.style.display = "none"
    homeBtn.style.display = "none"
    back.style.display = "flex"
    gameSpeed = 0
    score = 0
    finalScore = 0
    player.message = false
    coinCount = 0
    player.life1 = true
    player.life2 = true
    player.life3 = true
}