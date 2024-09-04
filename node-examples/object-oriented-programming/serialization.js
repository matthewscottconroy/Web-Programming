class Person {
  constructor(name, age, occupation) {
    this.name = name;
    this.age = age;
    this.occupation = occupation;
  }

  introduce() {
    return `Hi, my name is ${this.name}, I'm ${this.age} years old, and I work as a ${this.occupation}.`;
  }
}

// Create an instance of the class
const person = new Person('Alice', 30, 'Software Engineer');

// Serialize the object to JSON
const serializedPerson = JSON.stringify(person);
console.log('Serialized:', serializedPerson);

// Deserialize the JSON back to an object
const deserializedPerson = JSON.parse(serializedPerson);
console.log('Deserialized:', deserializedPerson);

// The deserialized object doesn't have methods (only properties)

