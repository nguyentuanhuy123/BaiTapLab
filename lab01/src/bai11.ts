export class Animal{
    name:string;
    constructor(name:string){
        this.name=name
    }
}
export class Dog extends Animal{
    constructor(name:string){
        super(name);
    }
    bark(){
        console.log('Woof! Woof!');
        
    }
}
export class Cat extends Animal{
    constructor(name:string){
        super(name);
    }
    meow(){
        console.log('Meow! Meow!');
    }
}