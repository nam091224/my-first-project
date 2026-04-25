let name = "Buddy";
let age = 5;
let greeting = `Hello ${name}, you are ${age} years old!`;
const city = "New York";

//let city = "Los Angeles"; // This will cause an error because city is declared as a constant
console.log("Name: " + name);
console.log("Age: " + age);
console.log("City: " + city);
console.log(greeting);


if (age > 3) {
    let message = "You are an adult dog!";
    console.log(message);
}
else {
    let message = "You are not an adult dog.";
    console.log(message);
} 