var AM = new AssetManager();

function Animation(spriteSheet, startX, startY,
                   frameWidth, frameHeight,
                   sheetWidth,
                   frameDuration, frames,
                   loop, scale, doneXY = null) {
    this.spriteSheet = spriteSheet;
    this.startX = startX;
    this.startY = startY;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    if (!loop) {
        this.doneXY = {x: doneXY.x, y: doneXY.y};
    }
    this.scale = scale;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;

    var xindex = 0;
    var yindex = 0;

    if (this.isDone()) {
        if (this.loop)  {
            this.elapsedTime = 0;
        } else {
            xindex = this.doneXY.x;
            yindex = this.doneXY.y;
            ctx.drawImage(this.spriteSheet,
                xindex * this.frameWidth, yindex * this.frameHeight,
                this.frameWidth, this.frameHeight,
                x, y,
                this.frameWidth * this.scale,
                this. frameHeight * this.scale);
            return;
        }
    }

    var frame = this.currentFrame();

    xindex = this.startX + (frame % this.sheetWidth);
    yindex = this.startY + Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth * this.scale,
                 this.frameHeight * this.scale);
};

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
};

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
};

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

function Fighter(game, walk, attack, takeDmg, idle, direction, startPos) {
    this.speed = 100;
    this.game = game;
    this.ctx = game.ctx;

    this.walk = walk;
    this.attack = attack;
    this.takeDmg = takeDmg;
    this.idle = idle;
    this.direction = direction;
    this.startPos = startPos;
    this.animation = this.walk;

    Entity.call(this, game, startPos.x, startPos.y);
}
Fighter.prototype = new Entity();
Fighter.prototype.constructor = Fighter;
Fighter.prototype.update = function () {
    if (this.direction === "left") {
        this.x += this.game.clockTick * this.speed;
        if (this.x > 300) {
            this.x = 300;
            this.speed = 0;
            this.animation = this.attack;
        }
    } else {
        this.x -= this.game.clockTick * this.speed;
        if (this.x < 400) {
            this.x = 400;
            this.speed = 0;
            this.animation = this.attack;
        }
    }

    Entity.prototype.update.call(this);
};
Fighter.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
};

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

    var blackMage = AM.getAsset("./img/BlackMageSideToSideSheet.png");
    var blackMageDmgFromRight = AM.getAsset("./img/BlackMageDmgSheet.png");
    var blackMageDmgFromLeft = AM.getAsset("./img/BlackMageDmgSheet.png");
    var lancer = AM.getAsset("./img/LancerSideToSideSheet.png");
    var lancerDmgFromLeft = AM.getAsset("./img/LancerDmgSheet.png");
    var lancerDmgFromRight = AM.getAsset("./img/LancerDmgSheet.png");
    var lancerSpecialMove = AM.getAsset("./img/LancerSpecialMoveAllDirections.png");


    //Create Animations
    var BlackMageIdleLeftAnimation = new Animation(blackMage, 0, 0,
        32, 32,
        6, 0.1, 6, true, 3);
    var BlackMageWalkingLeftAnimation = new Animation(blackMage, 0, 1,
        32, 32,
        6, 0.1, 6, true, 3);
    var BlackMageRegAttackLeftAnimation = new Animation(blackMage, 0, 2,
        32, 32,
        6, 0.1, 4, false, 3,
        {x: 0, y: 0});
    var BlackMageSpecialMoveLeftAnimation = new Animation(blackMage, 0, 3,
        32, 32,
        6, 0.1, 6, false, 3,
        {x: 0, y: 0});
    var BlackMageDmgFromLeftAnimation = new Animation(blackMageDmgFromLeft, 0, 0,
        32, 32,
        6, 0.1, 6, true, 3);

    var BlackMageIdleRightAnimation = new Animation(blackMage, 0, 4,
        32, 32,
        6, 0.1, 6, true, 3);
    var BlackMageWalkingRightAnimation = new Animation(blackMage, 0, 5,
        32, 32,
        6, 0.1, 6, true, 3);
    var BlackMageRegAttackRightAnimation = new Animation(blackMage, 0, 6,
        32, 32,
        6, 0.1, 4, false, 3,
        {x: 0, y: 4});
    var BlackMageSpecialMoveRightAnimation = new Animation(blackMage, 0, 7,
        32, 32,
        6, 0.1, 6, false, 3,
        {x: 0, y: 4});
    var BlackMageDmgFromRightAnimation = new Animation(blackMageDmgFromRight, 0, 0,
        32, 32,
        6, 0.1, 6, true, 3);

    //Lancer
    var LancerIdleLeftAnimation = new Animation(lancer, 0, 0,
        32, 32,
        6, 0.1, 6, false, 3,
        {x: 0, y: 0});
    var LancerWalkingLeftAnimation = new Animation(lancer, 0, 1,
        32, 32,
        6, 0.1, 6, true, 3);
    var LancerRegAttackLeftAnimation = new Animation(lancer, 0, 2,
        32, 32,
        6, 0.1, 6, false, 3,
        {x: 0, y: 0});
    var LancerSpecialMoveLeftAnimation = new Animation(lancerSpecialMove, 0, 0,
        32, 32,
        6, 0.1, 6, false, 3,
        {x: 0, y: 0});
    var LancerDmgFromLeftAnimation = new Animation(lancerDmgFromLeft, 0, 0,
        32, 32,
        6, 0.1, 6, true, 3);

    var LancerIdleRightAnimation = new Animation(lancer, 0, 3,
        32, 32,
        6, 0.1, 6, true, 3);
    var LancerWalkingRightAnimation = new Animation(lancer, 0, 4,
        32, 32,
        6, 0.1, 6, true, 3);
    var LancerRegAttackRightAnimation = new Animation(lancer, 0, 5,
        32, 32,
        6, 0.1, 6, false, 3,
        {x: 0, y: 4});
    var LancerSpecialMoveRightAnimation = new Animation(lancerSpecialMove, 0, 0,
        32, 32,
        6, 0.1, 6, false, 3,
        {x: 0, y: 4});
    var LancerDmgFromRightAnimation = new Animation(lancerDmgFromRight, 0, 0,
        32, 32,
        6, 0.1, 6, true, 3);

    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/bg.jpg")));


    gameEngine.addEntity(
        new Fighter(gameEngine,
        BlackMageWalkingRightAnimation,
        BlackMageRegAttackRightAnimation,
        BlackMageDmgFromRightAnimation,
        BlackMageIdleRightAnimation,
        "left", {x: 0, y: 250})
    );

    gameEngine.addEntity(
        new Fighter(gameEngine,
            LancerWalkingLeftAnimation,
            LancerRegAttackLeftAnimation,
            LancerDmgFromLeftAnimation,
            LancerIdleLeftAnimation,
            "right", {x: 800, y: 250})
    );

    console.log("All Done!");
});