class RedTower implements ShootBehaviour {
    private tower: Tower;    
    private rotation: number = 0;

    constructor (t:Tower) {
        this.tower = t;
        setInterval(() => this.shoot(), 1900);        
        this.tower.div.classList.add("multishot-tower");
        this.tower.div.classList.remove("singleshot-tower");
    }

    public shoot(){
        while(this.rotation != 360 && this.tower.bullets > 0) {
            this.tower.bulletList.push(
                new Bullet(
                    this.tower.x + 40, 
                    this.tower.y + 60, this.rotation,
                    "bullet-blue")
                );
            this.tower.bullets--;
            this.rotation += 45;
        }

        this.rotation = 0;
    }
}