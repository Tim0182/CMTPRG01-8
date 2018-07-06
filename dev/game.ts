class Game {

    // Fields
    public  ui              : UI;
    private pause           : boolean = false;
    private zombiecounter   : number = 0;
    // private towers          : Array<Tower> = new Array();
    // private zombies         : Array<Zombie> = new Array();
    // private bulletList      : Array<Bullet> = new Array(); 
    public _gameObjects : Array<GameObject> = new Array();

    private tb = new TowerButton(this);

    constructor() {
        this.ui = new UI(this);
            
        let basicTower : Tower = new Tower(200, 200, this, this.tb);
        this._gameObjects.push(basicTower);
        let basicTower1 : Tower = new Tower(320, 60, this, this.tb);        
        this._gameObjects.push(basicTower1);
        let basicTower2 : Tower = new Tower(340, 180, this, this.tb);
        this._gameObjects.push(basicTower2);

        requestAnimationFrame(() => this.gameLoop());
    }

    private gameLoop() : void {
        if(this.pause) { return; } 

        if(this.ui.life <= 0) {
            GameOver.getInstance().resetLevel();
        }
        
        this.zombiecounter++;
        if(this.zombiecounter > 20){
            this.zombiecounter = 0;
            this._gameObjects.push(new Zombie());
        }
        
        for(let gameObject of this._gameObjects) {
            // Remove zombies when they're outside the window frame.
            if(gameObject instanceof Zombie) {
                if(gameObject.x + gameObject.width < 0) {
                    this.ui.decreaseLife(5);
                    gameObject.remove(this._gameObjects); 
                }
            }
            

            //Bullet collision
            if(gameObject instanceof Tower) {
                for(let bullet of gameObject.bulletList) {
                    for(let otherObject of this._gameObjects){
                        if(otherObject instanceof Zombie) {
                            console.log("This is a zombie.");
                            if(bullet.hasCollision(otherObject)){
                                console.log('has collision.');
                                this.ui.modifyGold(otherObject.getGoldReward);
                                otherObject.remove(this._gameObjects);
                                bullet.remove(this._gameObjects);
                            }
                            
                        }
                    }
                    
                    let outsideWindow = bullet.isOutsideWindow();
                    if(outsideWindow) {
                        bullet.remove(this._gameObjects);
                    }
                }
            }
            
            gameObject.update();    
            gameObject.draw();            
        }
        // for(let tower of this.towers) {
        //     this.bulletList = tower.bulletList;
        //     for(let zombie of this.zombies){
        //         for(let bullet of this.bulletList) {
        //             let hasCollision = bullet.hasCollision(zombie);
        //             if (hasCollision) {
        //                 zombie.remove(bullet, this.bulletList);
        //                 bullet.remove(zombie, this.zombies);
        //                 this.ui.modifyGold(zombie.getGoldReward);
        //                 let hasCollision = false;
        //             }
        //         }
        //         if(zombie.x + zombie.width < 0) {
        //             this.ui.decreaseLife(5);
        //             zombie.remove(zombie, this.zombies);
        //         }
        //     }
        //     for(let bulletBoundaries of this.bulletList) {
        //         let outsideWindow = bulletBoundaries.isOutsideWindow();
        //         if(  ) {
        //             bulletBoundaries.remove(bulletBoundaries, this.bulletList);
        //         }
        //     }
        //     tower.update();

        // }
        // for(let zombie of this.zombies) {
        //     zombie.update();
        //     zombie.draw();
        // }

        requestAnimationFrame(() => this.gameLoop());
    }
}