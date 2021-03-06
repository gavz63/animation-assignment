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

function BlackMage() {
    var blackMage = AM.getAsset("./img/BlackMageSideToSideSheet.png");
    var blackMageDmg = AM.getAsset("./img/BlackMageDmgSheet.png");
    var blackMageFireball = AM.getAsset("./img/Fireball.png");

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
        6, 0.1, 6, false, 3, {x:0, y:1});

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
        6, 0.1, 6, false, 3, {x: 0, y:0});

    this.projectileLeft = new Animation(blackMageFireball, 0,0,
        16, 16,
        4, 0.1, 4, true, 3);
    this.projectileRight = this.projectileLeft;
    this.projectile = {
        startDistance: 50,
        maxDistance: 100,
        speed: 100,
        radius: 8
    }
}

function Lancer() {
    var lancer = AM.getAsset("./img/LancerSideToSideSheet.png");
    var lancerDmg = AM.getAsset("./img/LancerDmgSheet.png");
    var lancerSpecialMove = AM.getAsset("./img/LancerSpecialMoveAllDirections.png");
    var lancerSlash = AM.getAsset("./img/PureSlash.png");

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
        6, 0.1, 6, false, 3, {x:0, y:1});

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
        6, 0.1, 6, false, 3, {x: 0, y:0});

    this.projectileLeft = new Animation(lancerSlash, 0, 0,
        32, 32,
        4, 0.1, 4, false, 3, {x: 0, y:0});
    this.projectileRight = new Animation(lancerSlash, 0, 1,
        32, 32,
        4, 0.1, 4, false, 3, {x: 0, y:1});
    this.projectileUp = new Animation(lancerSlash, 0, 2,
        32, 32,
        4, 0.1, 4, false, 3, {x: 0, y:2});
    this.projectileDown = new Animation(lancerSlash, 0, 3,
        32, 32,
        4, 0.1, 4, false, 3, {x: 0, y:3});
    this.projectile = {
        startDistance: 80,
        maxDistance: 10,
        speed: 30,
        radius: 32
    }
}

Background.prototype.update = function () {
};

//////////////////////////////////////////////////////////////////////////
//////////////////////////// Fighter /////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

function Fighter(game, characterClass, direction, startPos) {
    this.speed = 100;
    this.radius = 32;
    this.game = game;
    this.ctx = game.ctx;
    this.hasStopped = false;
    this.isDying = false;
    this.characterClass = characterClass;
    this.direction = direction;

    if (this.direction === "right") {
        this.animation = this.characterClass.animation.walkingRight;
        this.projectile = this.characterClass.projectileRight;
    } else if (this.direction === "left") {
        this.animation = this.characterClass.animation.walkingLeft;
        this.projectile = this.characterClass.projectileLeft;
    }

    Entity.call(this, game, startPos.x, startPos.y);
}
Fighter.prototype = new Entity();
Fighter.prototype.constructor = Fighter;
Fighter.prototype.update = function () {
    //Check if I've been hit by a projectile
    for (var i = 0; i < this.game.entities.length; i++) {
        if (this.game.entities[i] instanceof Projectile) {
            var projectile = this.game.entities[i];
            if (projectile.owner !== this && isCollided(projectile, this)) {
                projectile.removeFromWorld = true;
                this.takeDmg(this.direction);
            }
        }
    }

    switch (this.direction) {
        case "right":
            this.x += this.game.clockTick * this.speed;
            this.projectile = this.characterClass.projectileRight;
            //This only runs the first time he reaches this point
            if (this.x > 300 && !this.hasStopped) {
                this.hasStopped = true;
                this.x = 300;
                this.speed = 0;
                this.attack();
            }
        break;
        case "left":
            this.x -= this.game.clockTick * this.speed;
            this.projectile = this.characterClass.projectileLeft;
            //This only runs the first time he reaches this point
            if (this.x < 400 && !this.hasStopped) {
                this.hasStopped = true;
                this.x = 400;
                this.speed = 0;
                this.attack();
            }
            break;
        default:
            break;
    }
    if (this.isDying && this.animation.isDone()) {
        this.removeFromWorld = true;
        var dir = 0;
        var startPos = {}
        switch (this.direction) {
            case "left":
                dir = "right";
                startPos = {x: 200, y: 250};
                break;
            case "right":
                dir = "left";
                startPos = {x: 500, y: 250};
                break;
            default:
                break;
        }

        var newFighter = null;
        if (Math.floor(Math.random() * 2)) {
            newFighter = new Fighter(this.game, new BlackMage(),
                dir, startPos);
        } else {
            newFighter = new Fighter(this.game, new Lancer(),
                dir, startPos);
        }
        this.game.addEntity(newFighter);
    }

    Entity.prototype.update.call(this);
};
Fighter.prototype.attack = function() {
    switch (this.direction) {
        case "left":
            this.animation = this.characterClass.animation.regAttackLeft;
            break;
        case "right":
            this.animation = this.characterClass.animation.regAttackRight;
            break;
        default:
            break;
    }
    this.animation.restart();

    this.game.addEntity(
        new Projectile(
            this.game,
            this,
            this.projectile,
            this.characterClass.projectile.startDistance,
            this.characterClass.projectile.radius,
            this.direction,
            this.characterClass.projectile.speed,
            this.characterClass.projectile.maxDistance
        )
    );
};
Fighter.prototype.takeDmg = function(direction) {
    switch (direction) {
        case "left":
            this.animation = this.characterClass.animation.dmgFromLeft;
            this.direction = "right";
            break;
        case "right":
            this.animation = this.characterClass.animation.dmgFromRight;
            this.direction = "left";
            break;
        default:
            break;
    }
    this.isDying = true;
    this.speed = 100;
    this.animation.restart();
};
Fighter.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
};

//////////////////////////////////////////////////////////////////////////////
////////////////////////// PROJECTILES ///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

function Projectile(game, owner, animation, startDistance, radius, direction, speed, maxDistance) {
    this.game = game;
    this.radius = radius;
    this.animation = animation;
    this.owner = owner;
    this.startDistance = startDistance;
    this.direction = direction;
    this.speed = speed;
    this.maxDistance = maxDistance;

    switch (this.direction) {
        case "left":
            this.startPos = {x: owner.x - this.startDistance, y: owner.y};
            break;
        case "right":
            this.startPos = {x: owner.x + this.startDistance, y: owner.y};
            break;
        default:
            this.startPos = {x: owner.x, y: owner.y};
    }
    this.x = this.startPos.x;
    this.y = this.startPos.y;
    Entity.call(this, game, this.startPos.x, this.startPos.y);
}
Projectile.prototype = new Entity();
Projectile.prototype.constructor = Projectile;
Projectile.prototype.update = function () {
    switch (this.direction) {
        case "right":
            if (this.x > this.startPos.x + this.maxDistance) {
                this.removeFromWorld = true;
            }
            this.x += this.game.clockTick * this.speed;
            break;
        case "left":
            if (this.x < this.startPos.x - this.maxDistance) {
                this.removeFromWorld = true;
            }
            this.x -= this.game.clockTick * this.speed;
            break;
        default:
            break;
    }

    Entity.prototype.update.call(this);

};
Projectile.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.game.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
};

//////////////////////////////////////////////////////////////////////////////
////////////////////////// START GAME ////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

AM.queueDownload("./img/bg.jpg");
AM.queueDownload("./img/BlackMageDmgSheet.png");
AM.queueDownload("./img/BlackMageSideToSideSheet.png");
AM.queueDownload("./img/LancerDmgSheet.png");
AM.queueDownload("./img/LancerSideToSideSheet.png");
AM.queueDownload("./img/LancerSpecialMoveAllDirections.png");
AM.queueDownload("./img/Fireball.png");
AM.queueDownload("./img/PureSlash.png");


AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/bg.jpg")));



    var blackMageEntity = new Fighter(gameEngine, new BlackMage(),
            "left", {x: 500, y: 250});
    var lancerEntity = new Fighter(gameEngine, new Lancer(),
            "right", {x: 200, y: 250});

    gameEngine.addEntity(blackMageEntity);
    gameEngine.addEntity(lancerEntity);


    console.log("All Done!");
});