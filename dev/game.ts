class Game {

    // Fields
    public  ui              : UI;
    private pause           : boolean = false;
    private zombiecounter   : number = 0; 
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

        requestAnimationFrame(() => this.gameLoop());
    }
}