/// <reference path="button.ts" />

class BulletButton extends Button {

    private _game : Game;
    private _bulletPrice : number = 10;

    constructor(game) {
        super('bulletbutton');

        this._game = game;
    }

    protected handleClick(event: MouseEvent) : void {
        if (this._game.ui.checkGold(this._bulletPrice)) {
            this._game.ui.modifyGold(-this._bulletPrice);

            for (let obj of this._game._gameObjects) {
                if(obj instanceof Tower) 
                    obj.addBullets(1);
            }
        }
    }
}