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
Animation.prototype.restart = function() {
    this.elapsedTime = 0;
};

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;

    var xindex = 0;
    var yindex = 0;

    if (this.isDone()) {
        if (this.loop)  {
            this.restart();
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

function BlackMage(blackMage, blackMageDmg, blackMageFireball) {
    this.animation = {};
    this.animation.idleLeft = new Animation(blackMage, 0, 0,
        32, 32,
        6, 0.1, 6, true, 3, {x: 0, y:0});
    this.animation.walkingLeft = new Animation(blackMage, 0, 1,
        32, 32,
        6, 0.1, 6, true, 3);
    this.animation.regAttackLeft = new Animation(blackMage, 0, 2,
        32, 32,
        6, 0.1, 4, false, 3,
        {x: 0, y: 0});
    this.animation.specialLeft = new Animation(blackMage, 0, 3,
        32, 32,
        6, 0.1, 6, false, 3,
        {x: 0, y: 0});
    this.animation.dmgFromLeft = new Animation(blackMageDmg, 0, 1,
        32, 32,
        6, 0.1, 6, true, 3);

    this.animation.idleRight = new Animation(blackMage, 0, 4,
        32, 32,
        6, 0.1, 6, false, 3, {x: 0, y:4});
    this.animation.walkingRight = new Animation(blackMage, 0, 5,
        32, 32,
        6, 0.1, 6, true, 3);
    this.animation.regAttackRight = new Animation(blackMage, 0, 6,
        32, 32,
        6, 0.1, 4, false, 3,
        {x: 0, y: 4});
    this.animation.specialRight = new Animation(blackMage, 0, 7,
        32, 32,
        6, 0.1, 6, false, 3,
        {x: 0, y: 4});
    this.animation.dmgFromRight = new Animation(blackMageDmg, 0, 0,
        32, 32,
        6, 0.1, 6, true, 3);
}

BlackMage.prototype.attack = function () {

};

function Lancer(lancer, lancerDmg, lancerSpecialMove, lancerSlash) {
    this.animation = {};
    this.animation.idleLeft = new Animation(lancer, 0, 0,
        32, 32,
        6, 0.1, 6, false, 3,
        {x: 0, y: 0});
    this.animation.walkingLeft = new Animation(lancer, 0, 1,
        32, 32,
        6, 0.1, 6, true, 3);
    this.animation.regAttackLeft = new Animation(lancer, 0, 2,
        32, 32,
        6, 0.1, 6, false, 3,
        {x: 0, y: 0});
    this.animation.specialLeft = new Animation(lancerSpecialMove, 0, 0,
        32, 32,
        6, 0.1, 6, false, 3,
        {x: 0, y: 0});
    this.animation.dmgFromLeft = new Animation(lancerDmg, 0, 1,
        32, 32,
        6, 0.1, 6, true, 3);

    this.animation.idleRight = new Animation(lancer, 0, 3,
        32, 32,
        6, 0.1, 6, true, 3);
    this.animation.walkingRight = new Animation(lancer, 0, 4,
        32, 32,
        6, 0.1, 6, true, 3);
    this.animation.regAttackRight = new Animation(lancer, 0, 5,
        32, 32,
        6, 0.1, 6, false, 3,
        {x: 0, y: 4});
    this.animation.specialRight = new Animation(lancerSpecialMove, 0, 0,
        32, 32,
        6, 0.1, 6, false, 3,
        {x: 0, y: 4});
    this.animation.dmgFromRight = new Animation(lancerDmg, 0, 0,
        32, 32,
        6, 0.1, 6, true, 3);

    this.projectile = null;
    this.animation.slashLeft = new Animation(lancerSlash, 0, 0,
        32, 32,
        6, 0.1, 6, false, 3, {x: 0, y:0});
    this.animation.slashRight = new Animation(lancerSlash, 0, 1,
        32, 32,
        6, 0.1, 6, false, 3, {x: 0, y:0});
    this.animation.slashUp = new Animation(lancerSlash, 0, 2,
        32, 32,
        6, 0.1, 6, false, 3, {x: 0, y:0});
    this.animation.slashDown = new Animation(lancerSlash, 0, 3,
        32, 32,
        6, 0.1, 6, false, 3, {x: 0, y:0});
}

Background.prototype.update = function () {
};

function Fighter(game, characterClass, direction, startPos) {
    this.hasBeenIdleFor = 0;
    this.speed = 100;
    this.game = game;
    this.ctx = game.ctx;
    this.hasStopped = false;

    this.characterClass = characterClass;
    this.direction = direction;
    this.startPos = startPos;
    if (this.direction === "right") {
        this.animation = this.characterClass.animation.walkingRight;
        this.characterClass.direction = "right";
    } else if (this.direction === "left") {
        this.animation = this.characterClass.animation.walkingLeft;
        this.characterClass.direction = "left";

    }

    Entity.call(this, game, startPos.x, startPos.y);
}
Fighter.prototype = new Entity();
Fighter.prototype.constructor = Fighter;
Fighter.prototype.update = function () {
    if (this.direction === "right") {
        this.x += this.game.clockTick * this.speed;
        if (this.projectile && this.projectile.isDone()) {
            this.projectile = null;
        }
        //This only runs the first time he reaches this point
        if (this.x > 300 && !this.hasStopped) {
            this.hasStopped = true;
            this.x = 300;
            this.speed = 0;
            this.attack();
        }
        //This only runs after attack has started and finished.
        if (this.hasStopped && this.animation.isDone()) {
            this.animation = this.characterClass.animation.idleRight;
        }
    } else if (this.direction === "left") {
        this.x -= this.game.clockTick * this.speed;
        //This only runs the first time he reaches this point
        if (this.x < 400 && !this.hasStopped) {
            this.hasStopped = true;
            this.x = 400;
            this.speed = 0;
            this.attack();
        }
        //This only runs after attack has started and finished.
        if (this.hasStopped && this.animation.isDone()) {
            this.animation = this.characterClass.animation.idleLeft;
        }
    }

    Entity.prototype.update.call(this);
};
Fighter.prototype.attack = function () {
    switch (this.direction) {
        case "left":
            this.animation = this.characterClass.animation.regAttackLeft;
            this.animation.restart();
            break;
        case "right":
            this.animation = this.characterClass.animation.regAttackRight;
            this.animation.restart();
            break;
        default:
            break;
    }
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
    var blackMageDmg = AM.getAsset("./img/BlackMageDmgSheet.png");
    var lancer = AM.getAsset("./img/LancerSideToSideSheet.png");
    var lancerDmg = AM.getAsset("./img/LancerDmgSheet.png");
    var lancerSpecialMove = AM.getAsset("./img/LancerSpecialMoveAllDirections.png");
    var lancerSlash = AM.getAsset("./img/PureSlash.png");
    var blackMageFireball = AM.getAsset("./img/Fireball.png");


    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/bg.jpg")));

    gameEngine.addEntity(
        new Fighter(gameEngine, new BlackMage(blackMage, blackMageDmg, blackMageFireball),
        "right", {x: 0, y: 250})
    );

    gameEngine.addEntity(
        new Fighter(gameEngine, new Lancer(lancer, lancerDmg, lancerSpecialMove, lancerSlash),
            "left", {x: 700, y: 250})
    );

    console.log("All Done!");
});