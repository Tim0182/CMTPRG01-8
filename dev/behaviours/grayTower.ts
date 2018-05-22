class GrayTower implements ShootBehaviour {
    private tower: Tower;
    private rotation: number = 0;

    constructor (t:Tower) {
        this.tower = t;
        setInterval(() => this.shoot(), 900);
        this.tower.div.classList.add("singleshot-tower");
        this.tower.div.classList.remove("small-tower");
    }

    public shoot(){
        if (this.tower.bullets > 0) {
            this.tower.bulletList.push(
                new Bullet(
                    this.tower.x + 48, 
                    this.tower.y + 60, this.rotation,
                    "bullet-red")
                );
            this.tower.bullets--;
            this.rotation += 45;
            if (this.rotation == 360) this.rotation = 0;
        }
    }    
}