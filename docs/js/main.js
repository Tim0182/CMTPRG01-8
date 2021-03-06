class BasicTower {
    constructor(t) {
        this.tower = t;
    }
    shoot() {
    }
}
class GoldTower {
    constructor(t) {
        this.rotation = 0;
        this.tower = t;
        setInterval(() => this.shoot(), 1900);
        this.tower.div.classList.add("gold-tower");
        this.tower.div.classList.remove("multishot-tower");
    }
    shoot() {
        while (this.rotation != 360 && this.tower.bullets > 0) {
            this.tower.bulletList.push(new Bullet(this.tower.x + 40, this.tower.y + 60, this.rotation, "bullet-yellow"));
            this.tower.bullets--;
            this.rotation += 25;
        }
        this.rotation = 0;
    }
}
class GrayTower {
    constructor(t) {
        this.rotation = 0;
        this.tower = t;
        setInterval(() => this.shoot(), 900);
        this.tower.div.classList.add("singleshot-tower");
        this.tower.div.classList.remove("small-tower");
    }
    shoot() {
        if (this.tower.bullets > 0) {
            this.tower.bulletList.push(new Bullet(this.tower.x + 48, this.tower.y + 60, this.rotation, "bullet-red"));
            this.tower.bullets--;
            this.rotation += 45;
            if (this.rotation == 360)
                this.rotation = 0;
        }
    }
}
class RedTower {
    constructor(t) {
        this.rotation = 0;
        this.tower = t;
        setInterval(() => this.shoot(), 1900);
        this.tower.div.classList.add("multishot-tower");
        this.tower.div.classList.remove("singleshot-tower");
    }
    shoot() {
        while (this.rotation != 360 && this.tower.bullets > 0) {
            this.tower.bulletList.push(new Bullet(this.tower.x + 40, this.tower.y + 60, this.rotation, "bullet-blue"));
            this.tower.bullets--;
            this.rotation += 45;
        }
        this.rotation = 0;
    }
}
class GameObject {
    constructor(x, y, tag) {
        this._x = 0;
        this._y = 0;
        this._width = 0;
        this._height = 0;
        this._x = x;
        this._y = y;
        let parent = document.getElementsByTagName("game")[0];
        this._div = document.createElement(tag);
        parent.appendChild(this._div);
        this._width = this._div.clientWidth;
        this._height = this._div.clientHeight;
        this.draw();
    }
    get x() { return this._x; }
    set x(value) { this._x = value; }
    get y() { return this._y; }
    set y(value) { this._y = value; }
    get width() { return this._width; }
    set width(v) { this._width = v; }
    get height() { return this._height; }
    set height(v) { this._height = v; }
    get div() { return this._div; }
    set div(v) { this._div = v; }
    update() {
    }
    draw() {
        this._div.style.transform = `translate(${this._x}px, ${this._y}px)`;
    }
    hasCollision(obj) {
        return (this.x < obj.x + obj.width &&
            this.x + this.width > obj.x &&
            this.y < obj.y + obj.height &&
            this.y + this.height > obj.y);
    }
    remove(arr) {
        this.div.remove();
        let i = arr.indexOf(this);
        if (i != -1) {
            arr.splice(i, 1);
        }
    }
}
class Bullet extends GameObject {
    constructor(x, y, rotation, tag) {
        super(x, y, tag);
        this.speed = 5;
        this.speedX = 0;
        this.speedY = 0;
        this.speedX = this.speed * Math.cos(rotation / 180 * Math.PI);
        this.speedY = this.speed * Math.sin(rotation / 180 * Math.PI);
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    isOutsideWindow() {
        return (this.x > window.innerWidth ||
            this.x + this.width < 0 ||
            this.y > window.innerHeight ||
            this.y + this.height < 0);
    }
}
class Button {
    constructor(tag) {
        this.div = document.getElementsByTagName(tag)[0];
        this.div.addEventListener("click", (e) => this.handleClick(e));
    }
    handleClick(event) {
    }
}
class BulletButton extends Button {
    constructor(game) {
        super('bulletbutton');
        this._bulletPrice = 10;
        this._game = game;
    }
    handleClick(event) {
        if (this._game.ui.checkGold(this._bulletPrice)) {
            this._game.ui.modifyGold(-this._bulletPrice);
            for (let obj of this._game._gameObjects) {
                if (obj instanceof Tower)
                    obj.addBullets(1);
            }
        }
    }
}
class TowerButton extends Button {
    constructor(game) {
        super("towerbutton");
        this.progress = 0;
        this._towerPrice = 2.5;
        this.observers = new Array();
        this._game = game;
        this.bar = document.querySelector("towerbutton progressbar");
        this.bar.style.width = "0%";
    }
    handleClick(event) {
        if (this._game.ui.checkGold(this._towerPrice)) {
            this._game.ui.modifyGold(-this._towerPrice);
            this.progress += 10;
            this.bar.style.width = this.progress + "%";
            if (this.progress > 90) {
                this.progress = 0;
                super.handleClick(event);
                this.upgrade();
            }
        }
    }
    subscribe(o) {
        this.observers.push(o);
    }
    unsubscribe(o) {
    }
    upgrade() {
        for (let o of this.observers) {
            o.notify();
        }
    }
}
class Game {
    constructor() {
        this.pause = false;
        this.zombiecounter = 0;
        this._gameObjects = new Array();
        this.tb = new TowerButton(this);
        this.ui = new UI(this);
        let basicTower = new Tower(200, 200, this, this.tb);
        this._gameObjects.push(basicTower);
        let basicTower1 = new Tower(320, 60, this, this.tb);
        this._gameObjects.push(basicTower1);
        let basicTower2 = new Tower(340, 180, this, this.tb);
        this._gameObjects.push(basicTower2);
        requestAnimationFrame(() => this.gameLoop());
    }
    gameLoop() {
        if (this.pause) {
            return;
        }
        if (this.ui.life <= 0) {
            GameOver.getInstance().resetLevel();
        }
        this.zombiecounter++;
        if (this.zombiecounter > 20) {
            this.zombiecounter = 0;
            this._gameObjects.push(new Zombie());
        }
        for (let gameObject of this._gameObjects) {
            if (gameObject instanceof Zombie) {
                if (gameObject.x + gameObject.width < 0) {
                    this.ui.decreaseLife(5);
                    gameObject.remove(this._gameObjects);
                }
            }
            if (gameObject instanceof Tower) {
                for (let bullet of gameObject.bulletList) {
                    for (let otherObject of this._gameObjects) {
                        if (otherObject instanceof Zombie) {
                            console.log("This is a zombie.");
                            if (bullet.hasCollision(otherObject)) {
                                console.log('has collision.');
                                this.ui.modifyGold(otherObject.getGoldReward);
                                otherObject.remove(this._gameObjects);
                                bullet.remove(this._gameObjects);
                            }
                        }
                    }
                    let outsideWindow = bullet.isOutsideWindow();
                    if (outsideWindow) {
                        bullet.remove(this._gameObjects);
                    }
                }
            }
            gameObject.update();
            gameObject.draw();
        }
        requestAnimationFrame(() => this.gameLoop());
    }
}
class GameOver extends GameObject {
    constructor() {
        super(window.innerWidth / 2 - 50, window.innerHeight / 2 - 25, "gameover");
        this.resetGame = 0;
        this.div.innerHTML = `GAME OVER<br><br> game restarts in 5 sec...`;
    }
    static getInstance() {
        if (!GameOver._instance) {
            GameOver._instance = new GameOver();
        }
        return GameOver._instance;
    }
    resetLevel() {
        this.resetGame++;
        if (this.resetGame > 300) {
            window.location.reload(true);
        }
    }
}
window.addEventListener("load", function () {
    new Game();
});
class Tower extends GameObject {
    constructor(x, y, g, s) {
        super(x, y, "tower");
        this.checkTowerLVL = 0;
        this._bullets = 20;
        this._bulletList = new Array();
        s.subscribe(this);
        this.game = g;
        this.div.className = "";
        this.div.classList.add("small-tower");
        this.bulletsDisplay = document.createElement("div");
        this.div.appendChild(this.bulletsDisplay);
        this.bulletsDisplay.style.fontSize = "14px";
        this.displayBullets();
        this.shootBehaviour = new BasicTower(this);
    }
    get bullets() {
        return this._bullets;
    }
    set bullets(value) {
        this._bullets = value;
        this.displayBullets();
    }
    get bulletList() {
        return this._bulletList;
    }
    addBullets(amount) {
        this._bullets += amount;
        this.displayBullets();
    }
    notify() {
        if (this.checkTowerLVL <= 0) {
            this.shootBehaviour = new GrayTower(this);
            this.checkTowerLVL++;
        }
        else if (this.checkTowerLVL == 1) {
            this.shootBehaviour = new RedTower(this);
            this.checkTowerLVL++;
        }
        else if (this.checkTowerLVL == 2) {
            this.shootBehaviour = new GoldTower(this);
        }
    }
    update() {
        for (let bullet of this._bulletList) {
            bullet.update();
            bullet.draw();
        }
    }
    displayBullets() {
        this.bulletsDisplay.innerHTML = this._bullets + "";
    }
}
class UI {
    constructor(game) {
        this.life = 100;
        this.gold = 200;
        this.coindiv = document.getElementsByTagName("counter")[0];
        this.coindiv.innerHTML = this.gold.toLocaleString();
        this.lifediv = document.querySelector("lifebar progressbar");
        this.lifediv.style.width = this.life + "%";
        this.lifediv.classList.add("blinking");
        this.btnBullets = new BulletButton(game);
        this.btnUpgrade = new TowerButton(game);
    }
    checkGold(amount) {
        if (this.gold >= amount) {
            return true;
        }
        else {
            return false;
        }
    }
    modifyGold(amount) {
        this.gold += amount;
        this.coindiv.innerHTML = this.gold.toLocaleString();
    }
    decreaseLife(amount) {
        this.life -= amount;
        this.lifediv.style.width = this.life + "%";
    }
}
class Zombie extends GameObject {
    constructor() {
        super(window.innerWidth, Math.random() * window.innerHeight, "unit");
        this.speed = 2;
        this.goldReward = 10;
        this.setTarget();
    }
    get getGoldReward() {
        return this.goldReward;
    }
    update() {
        this.x -= this.xspeed;
        this.y -= this.yspeed;
        this.xdist = this.x - this.xtarget;
        this.ydist = this.y - this.ytarget;
        if (Math.sqrt(this.xdist * this.xdist + this.ydist * this.ydist) < 10) {
            this.setTarget();
        }
    }
    setTarget() {
        this.xtarget = this.x - 200;
        this.ytarget = Math.random() * (window.innerHeight - this.y);
        this.setSpeed(this.x - this.xtarget, this.y - this.ytarget);
    }
    setSpeed(xdist, ydist) {
        let distance = Math.sqrt(xdist * xdist + ydist * ydist);
        this.xspeed = (xdist / distance) * this.speed;
        this.yspeed = (ydist / distance) * this.speed;
    }
}
//# sourceMappingURL=main.js.map