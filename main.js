var AM = new AssetManager();

function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.startX = startX;
    this.startY = startY;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = this.startX + (frame % this.sheetWidth);
    yindex = this.startY + Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth * this.scale,
                 this.frameHeight * this.scale);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

// no inheritance
function Background(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
}

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
                   this.x, this.y, 800, 700);
};

Background.prototype.update = function () {
};

//Fighter LEFT
function FighterLeft(game, sideToSide) {
    this.speed = 100;
    this.game = game;
    this.ctx = game.ctx;
    this.file = sideToSide;
    this.animation = new Animation(sideToSide,
        0,
        5,
        32,
        32,
        6,
        0.10,
        6,
        true,
        3);
    Entity.call(this, game, 10, 350);
}
FighterLeft.prototype = new Entity();
FighterLeft.prototype.constructor = FighterLeft;
FighterLeft.prototype.update = function () {
    this.x += this.game.clockTick * this.speed;
    if (this.x > 300) {
        this.x = 300;
        this.speed = 0;
        this.animation = new Animation(this.file,
            0,
            7, //or 7
            32,
            32,
            6,
            0.10,
            6,
            true,
            3);
    }
    console.log(this.x + "," + this.y);
    Entity.prototype.update.call(this);
};
FighterLeft.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
};

// //Fighter RIGHT
// function FighterRight(game, sideToSide) {
//     this.speed = 50;
//     this.game = game;
//     this.ctx = game.ctx;
//     this.animation = new Animation(sideToSide,
//         // 0,
//         // 32,
//         32,
//         32,
//         6,
//         0.10,
//         6,
//         true,
//         1);
//     Entity.call(this, game, 800, 350);
// }
// FighterRight.prototype = new Entity();
// FighterRight.prototype.constructor = FighterLeft;
// FighterRight.prototype.update = function () {
//     this.x -= this.game.clockTick * this.speed;
//     if (this.x < 450) {
//         this.x = 450;
//         this.speed = 0;
//     }
//     Entity.prototype.update.call(this);
// };
// FighterRight.prototype.draw = function () {
//     this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
//     Entity.prototype.draw.call(this);
// };

// function BlackMage(game, sideToSide, dmgSheet) {
//     this.IdleLeftAnimation = new Animation(sideToSide,
//         0,
//         0,
//         32,
//         32,
//         6,
//         0.10,
//         6,
//         true,
//         1);
//     this.WalkingLeftAnimation = new Animation(sideToSide,
//         0,
//         32,
//         32,
//         32,
//         6,
//         0.10,
//         6,
//         true,
//         1);
//     this.RegAttackLeftAnimation = new Animation(sideToSide,
//         0,
//         64,
//         32,
//         32,
//         6,
//         0.10,
//         4,
//         true,
//         1);
//     this.x = 0;
//     this.y = 0;
//     this.speed = 100;
//     this.game = game;
//     this.ctx = game.ctx;
// }


// inheritance 
function Cheetah(game, spritesheet) {
    this.animation = new Animation(spritesheet, 512, 256, 2, 0.05, 8, true, 0.5);
    this.speed = 350;
    this.ctx = game.ctx;
    Entity.call(this, game, 0, 250);
}

Cheetah.prototype = new Entity();
Cheetah.prototype.constructor = Cheetah;

Cheetah.prototype.update = function () {
    this.x += this.game.clockTick * this.speed;
    if (this.x > 800) this.x = -230;
    Entity.prototype.update.call(this);
}

Cheetah.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

// inheritance 
function Guy(game, spritesheet) {
    this.animation = new Animation(spritesheet, 154, 215, 4, 0.15, 8, true, 0.5);
    this.speed = 100;
    this.ctx = game.ctx;
    Entity.call(this, game, 0, 450);
}

Guy.prototype = new Entity();
Guy.prototype.constructor = Guy;

Guy.prototype.update = function () {
    this.x += this.game.clockTick * this.speed;
    if (this.x > 800) this.x = -230;
    Entity.prototype.update.call(this);
}

Guy.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

AM.queueDownload("./img/bg.jpg");
AM.queueDownload("./img/BlackMageDmgSheet.png");
AM.queueDownload("./img/BlackMageSideToSideSheet.png");
AM.queueDownload("./img/LancerDmgSheet.png");
AM.queueDownload("./img/LancerSideToSideSheet.png");
AM.queueDownload("./img/LancerSpecialMoveAllDirections.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/bg.jpg")));
    gameEngine.addEntity(new FighterLeft(gameEngine, AM.getAsset("./img/BlackMageSideToSideSheet.png")));
    //gameEngine.addEntity(new FighterRight(gameEngine, AM.getAsset("./img/BlackMageSideToSideSheet.png")));

    console.log("All Done!");
});