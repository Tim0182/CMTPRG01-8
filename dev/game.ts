class Game {

    // Fields
    public  ui              : UI;
    public  GO              : GameOver;
    private pause           : boolean = false;
    private zombiecounter   : number = 0;
    private towers          : Array<Tower> = new Array();
    private zombies         : Array<Zombie> = new Array();
    private bulletList      : Array<Bullet> = new Array();

    private tb = new TowerButton(this);

    constructor() {
        this.ui = new UI(this);
            
        let basicTower : Tower = new Tower(200, 200, this, this.tb);
        this.towers.push(basicTower);
        let singleShotTower : Tower = new Tower(320, 60, this, this.tb);        
        this.towers.push(singleShotTower);
        let multiShotTower : Tower = new Tower(600, 240, this, this.tb);
        this.towers.push(multiShotTower);

        requestAnimationFrame(() => this.gameLoop());
    }

    private gameLoop() : void {
        if(this.pause) { return; } 

        if(this.ui.life <= 0) {
            this.gameOver();
        }
        
        this.zombiecounter++;
        if(this.zombiecounter > 10){
            this.zombiecounter = 0;
            this.zombies.push(new Zombie());
        }
        
        for(let tower of this.towers) {
            this.bulletList = tower.bulletList;
            for(let zombie of this.zombies){
                for(let bullet of this.bulletList) {
                    let hasCollision = bullet.hasCollision(zombie);
                    if (hasCollision) {
                        zombie.remove(bullet, this.bulletList);
                        bullet.remove(zombie, this.zombies);
                        let hasCollision = false;
                    }
                }
                if(zombie.x + zombie.width < 0) {
                    this.ui.decreaseLife(1);
                    zombie.remove(zombie, this.zombies);
                }
            }
            tower.update();

        }
        for(let zombie of this.zombies) {
            zombie.update();
            zombie.draw();
        }

        requestAnimationFrame(() => this.gameLoop());
    }

    private gameOver() : void {
        // TODO handle game over
        this.GO = new GameOver();
    }
}