"use strict";
class Animal {
    speak() {
        console.log("The animal makes a sound");
    }
}
class Dog extends Animal {
    speak() {
        console.log("The dog barks: Woof woof!");
    }
}
class Cat extends Animal {
    speak() {
        console.log("The cat meows: Meow!");
    }
}
function makeAnimalSpeak(animal) {
    animal.speak();
}
const animals = [new Animal(), new Dog(), new Cat()];
for (const a of animals) {
    makeAnimalSpeak(a);
}
