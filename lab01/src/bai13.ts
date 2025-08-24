abstract class Shape {
    abstract area(): number;
}
export class Square extends Shape{
    canh:number;
    constructor(canh:number){
        super()
        this.canh=canh;
    }
    area(): number {
        return this.canh *this.canh
    }
}
export class Circle extends Shape{
    duongkinh:number;
    constructor(duongkinh:number){
        super()
        this.duongkinh=duongkinh;
    }
    area(): number {
        return Math.PI * this.duongkinh * this.duongkinh;
    }
}