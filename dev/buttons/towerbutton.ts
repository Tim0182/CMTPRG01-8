/// <reference path="button.ts" />

class TowerButton extends Button implements Subject {
    
    private progress:number = 0;
    private bar:HTMLElement;
    private game:Game;
    
    public observers : Array<Observer> = new Array<Observer>();

    constructor(game) {
        super("towerbutton");
        this.game = game;

        this.bar = <HTMLElement> document.querySelector("towerbutton progressbar");
        this.bar.style.width = "0%";
    }

    protected handleClick(event: MouseEvent) : void {
        
        this.progress+=10;
        this.bar.style.width = this.progress+"%";

        if(this.progress > 90){
            this.progress = 0;
            super.handleClick(event);
            this.upgrade();
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