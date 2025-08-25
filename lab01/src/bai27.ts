import { Person } from "./bai1";
class Teacher extends Person{
    subject:string;
    constructor(name: string,age: number,subject:string){
        super(name,age)
        this.subject=subject
    }
    introduce() :void{
        console.log(`my name is ${this.name}`);
        
    }
}