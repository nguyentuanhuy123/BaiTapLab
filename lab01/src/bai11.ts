class Animal{
    name:string;
    constructor(name:string){
        this.name=name
    }
}
class Dog extends Animal{
    constructor(name:string){
        super(name);
    }
    bark(){
        console.log('Woof! Woof!');
        
    }
}
class Cat extends Animal{
    constructor(name:string){
        super(name);
    }
    meow(){
        console.log('Meow! Meow!');
    }
}