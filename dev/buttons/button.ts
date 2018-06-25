class Button {

    protected div : HTMLElement;

    constructor(tag:string) {
        this.div = <HTMLElement> document.getElementsByTagName(tag)[0];
        this.div.addEventListener("click", (e:MouseEvent) => this.handleClick(e));
    }

    protected handleClick(event: MouseEvent) : void {
        
    }
}