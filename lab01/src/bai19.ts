
export class Animal {
    speak(): void {
        console.log("The animal makes a sound");
    }
}
export class Dog extends Animal {
    speak(): void {
        console.log("The dog barks: Woof woof!");
    }
}
export class Cat extends Animal {
    speak(): void {
        console.log("The cat meows: Meow!");
    }
}
function makeAnimalSpeak(animal: Animal): void {
    animal.speak(); 
}
const animals: Animal[] = [new Animal(), new Dog(), new Cat()];

for (const a of animals) {
    makeAnimalSpeak(a);
}
