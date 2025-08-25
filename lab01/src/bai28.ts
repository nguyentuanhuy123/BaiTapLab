class Animal {
    protected makeSound(): void {
        console.log("sound");
    }
}
class Dog extends Animal {
    protected makeSound(): void {
        console.log("Woof woof");
    }
}
class Cat extends Animal {
    protected makeSound(): void {
        console.log("Meow meow");
    }
}
