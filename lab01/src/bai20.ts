export interface Vehicle{
    getSpeed(): number;

}
export class Car implements Vehicle{
    speed: number;
    constructor(speed: number){
        this.speed=speed
    }
    getSpeed(): number {
        return this.speed;
    }
}
export class Bike implements Vehicle{
    speed: number;
    constructor(speed: number){
        this.speed=speed
    }
    getSpeed(): number {
        return this.speed;
    }
}