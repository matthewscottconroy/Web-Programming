// Base class (Animal) demonstrating encapsulation and abstraction
class Animal {
  // Encapsulation: Use private fields for internal properties
  #species;

  constructor(name, species) {
    this.name = name; // public property
    this.#species = species; // private property
  }

  // Abstracted behavior: Common method for all animals
  eat() {
    console.log(`${this.name} is eating.`);
  }

  // Public getter for the private field (encapsulation)
  getSpecies() {
    return this.#species;
  }

  // Polymorphism: Define a method that can be overridden in subclasses
  speak() {
    console.log(`${this.name} makes a sound.`);
  }
}

// Derived class (Dog) demonstrating inheritance and polymorphism
class Dog extends Animal {
  constructor(name, breed) {
    super(name, 'Dog'); // Call the parent class constructor
    this.breed = breed; // Additional property for Dog
  }

  // Override the speak method (polymorphism)
  speak() {
    console.log(`${this.name}, the ${this.breed}, barks.`);
  }

  fetch() {
    console.log(`${this.name} is fetching the ball!`);
  }
}

// Derived class (Cat) demonstrating inheritance and polymorphism
class Cat extends Animal {
  constructor(name, color) {
    super(name, 'Cat'); // Call the parent class constructor
    this.color = color; // Additional property for Cat
  }

  // Override the speak method (polymorphism)
  speak() {
    console.log(`${this.name}, the ${this.color} cat, meows.`);
  }

  climb() {
    console.log(`${this.name} is climbing the tree!`);
  }
}

// Create instances of Dog and Cat
const myDog = new Dog('Buddy', 'Golden Retriever');
const myCat = new Cat('Whiskers', 'Gray');

// Using encapsulation (public and private fields)
console.log(`${myDog.name} is a ${myDog.getSpecies()}`); // Access public and private data
console.log(`${myCat.name} is a ${myCat.getSpecies()}`);

// Demonstrating polymorphism (speak method is overridden)
myDog.speak(); // Outputs: Buddy, the Golden Retriever, barks.
myCat.speak(); // Outputs: Whiskers, the Gray cat, meows.

// Demonstrating method calling from both parent and subclass
myDog.eat(); // Outputs: Buddy is eating.
myDog.fetch(); // Outputs: Buddy is fetching the ball!

myCat.eat(); // Outputs: Whiskers is eating.
myCat.climb(); // Outputs: Whiskers is climbing the tree!

// Attempt to directly access private property (will fail)
/*
  try {
  console.log(myDog.#species); // Error: Private field '#species' must be declared in an enclosing class
} catch (error) {
  console.error('Error accessing private property:', error.message);
}
*/

