class UI {
    
    public  life        : number        = 100;
    public  gold        : number        = 200;

    private coindiv     : HTMLElement;
    private lifediv     : HTMLElement;

    public  btnBullets  : Button;
    public  btnUpgrade  : Button;

    constructor(game : Game) {
        this.coindiv = <HTMLElement> document.getElementsByTagName("counter")[0];
        this.coindiv.innerHTML = this.gold.toLocaleString();

        this.lifediv = <HTMLElement> document.querySelector("lifebar progressbar");
        this.lifediv.style.width = this.life + "%";

        this.lifediv.classList.add("blinking");

        this.btnBullets  = new BulletButton(game);
        this.btnUpgrade  = new TowerButton(game);
    }

    public checkGold(amount : number) : boolean {
        if (this.gold >= amount) {
            return true;
        } else {
            return false;
        }
    }

    public modifyGold(amount : number) : void {
        this.gold += amount;
        this.coindiv.innerHTML = this.gold.toLocaleString();
    }

    public decreaseLife(amount : number) : void {
        this.life -= amount;
        this.lifediv.style.width = this.life + "%";
    }
}