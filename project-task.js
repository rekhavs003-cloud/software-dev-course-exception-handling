const readlineSync = require('readline-sync');

let animals = [];
let fees = [];

function addAnimal(name, fee) {
    if (!name || name.trim() === "" || isNaN(fee) || fee < 0) {
        throw new Error("Invalid animal name or adoption fee!");
    }
    animals.push(name);
    fees.push(fee);
}

function getAdoptionFee(animalName) {
    if (!animalName || animalName.trim() === "") {
        throw new Error("Invalid animal name!");
    }

    let index = animals.indexOf(animalName);

    if (index === -1) {
        throw new Error("Animal not found in records!");
    }

    return fees[index];
}

console.log("Welcome to the Pet Shelter System");

while (true) {
    try {
        let action = readlineSync.question("Choose an action: 'add', 'fee', or 'exit': ").toLowerCase();

        if (action === "exit") {
            console.log("Goodbye!");
            break;
        }

        else if (action === "add") {
            let animal = readlineSync.question("Enter the animal's name: ");
            let fee = Number(readlineSync.question("Enter the adoption fee: "));

            try {
                addAnimal(animal, fee);
                console.log(`${animal} added with a fee of $${fee}.`);
            } catch (err) {
                console.log("Error adding animal:", err.message);
            }
        }

        else if (action === "fee") {
            let animal = readlineSync.question("Enter the animal's name to find its adoption fee: ");

            try {
                console.log(`${animal}'s adoption fee is $${getAdoptionFee(animal)}.`);
            } catch (err) {
                console.log("Error retrieving fee:", err.message);
            }
        }

        else {
            console.log("Invalid action. Please choose 'add', 'fee', or 'exit'.");
        }

    } catch (err) {
        console.log("Unexpected error:", err.message);
    }
}