class GoldTower implements ShootBehaviour {
    private tower: Tower;    
    private rotation: number = 0;

    constructor (t:Tower) {
        this.tower = t;
        setInterval(() => this.shoot(), 1900);        
        this.tower.div.classList.add("gold-tower");
        this.tower.div.classList.remove("multishot-tower");
    }

    public shoot(){
        while(this.rotation != 360 && this.tower.bullets > 0) {
            this.tower.bulletList.push(
                new Bullet(
                    this.tower.x + 40, 
                    this.tower.y + 60, this.rotation,
                    "bullet-yellow")
                );
            this.tower.bullets--;
            this.rotation += 25;
        }

        this.rotation = 0;
    }
}