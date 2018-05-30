/// <reference path="button.ts" />

class TowerButton extends Button implements Subject {
    
    private progress:number = 0;
    private bar:HTMLElement;
    private _game:Game;
    private _towerPrice : number = 2.5;
    
    public observers : Array<Observer> = new Array<Observer>();

    constructor(game) {
        super("towerbutton");
        this._game = game;

        this.bar = <HTMLElement> document.querySelector("towerbutton progressbar");
        this.bar.style.width = "0%";
    }

    protected handleClick(event: MouseEvent) : void {

        if (this._game.ui.checkGold(this._towerPrice)) {
            this._game.ui.modifyGold(-this._towerPrice);
            this.progress+=10;
            this.bar.style.width = this.progress+"%";

            if(this.progress > 90){
                this.progress = 0;
                super.handleClick(event);
                this.upgrade();
            }
        }
        
    }

    public subscribe(o:Observer) {
        this.observers.push(o);
    }

    public unsubscribe(o:Observer):void {
        //
    }

    private upgrade() {
        for (let o of this.observers) {
            o.notify();
        }
    }
}