/// <reference path="gameobject.ts" />

class GameOver extends GameObject{

    private static _instance    : GameOver;
    private resetGame          : number = 0;

    private constructor() {
        super(window.innerWidth / 2 - 50, window.innerHeight / 2 - 25, "gameover");        
        this.div.innerHTML = `GAME OVER<br><br> game restarts in 5 sec...`;
    }

    public static getInstance() {
        if (!GameOver._instance) {
            GameOver._instance = new GameOver()
            }
        return GameOver._instance
    }

    public resetLevel() {
        this.resetGame++;
        if(this.resetGame > 300){
            window.location.reload(true);
        }
    }
    
}