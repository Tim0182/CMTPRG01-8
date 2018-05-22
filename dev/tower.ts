/// <reference path="gameobject.ts" />

class Tower extends GameObject implements Observer {

    private checkTowerLVL   : number = 0;
    private _bullets        : number = 16;
    private _bulletList     : Array<Bullet> = new Array();
    private bulletsDisplay  : HTMLElement;
    public  game            : Game;

    private shootBehaviour : ShootBehaviour;

	public get bullets(): number  {
		return this._bullets;
	}

	public set bullets(value: number ) {
		this._bullets = value;
        this.displayBullets();
	}

    public get bulletList() {
        return this._bulletList;
    }

    constructor(x:number, y:number, g:Game, s:Subject) {
        super(x, y, "tower");

        s.subscribe(this);

        this.game = g;
        // Alle torens zien eruit als een singleshot-tower
        this.div.className = "";
        this.div.classList.add("small-tower");

        // Om aantal kogels weer te geven
        this.bulletsDisplay = document.createElement("div");
        this.div.appendChild(this.bulletsDisplay);
        this.bulletsDisplay.style.fontSize = "14px";

        this.displayBullets();

        this.shootBehaviour = new BasicTower(this);
    }

    public notify() {
        if(this.checkTowerLVL <= 0) {
            this.shootBehaviour = new GrayTower(this);
            this.checkTowerLVL ++;
        } else {
            this.shootBehaviour = new RedTower(this);
        }
    }

    public update() {
        for(let bullet of this._bulletList) {
            bullet.update();
            bullet.draw();
        }
    }

    private displayBullets() : void {
        this.bulletsDisplay.innerHTML = this._bullets + "";
    }
}