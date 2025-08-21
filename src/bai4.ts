export class Rectangle{
    width:number;
    height:number;
    constructor(width:number,height:number){
        this.width=width;
        this.height=height;
    }
    calculateArea(){
        return "area: "+ this.width*this.height;
    }
    calculatePerimeter(){
        return "perimeter: "+(this.width+this.height)*2
    }
}