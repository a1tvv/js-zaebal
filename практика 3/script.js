// Задача 1
let number = Number(prompt("Введите число от 2 до 10:"));
if (number >= 2 && number <= 10) {
    for (let i = 1; i <= 10; i++) {
        console.log(`${number} × ${i} = ${number * i}`);
    }
} else {
    console.log("Число должно быть от 2 до 10!");
}

// Задача 2
const cards = ["46782346", "45781218", "79874568", "12157845",
               "36151845", "41250895", "41201961"];
let visaCount = 0;
for (let card of cards) {
    if (card.startsWith("4")) visaCount++;
}
console.log(`Карт VISA ${visaCount} из ${cards.length}`);

// Задача 3
const cardType = prompt("Введите тип карты (SILVER/GOLD/PLATINUM):").toUpperCase();
const liters = Number(prompt("Введите количество литров:"));
let pointsPerLiter = cardType === "SILVER" ? 0.5
                  : cardType === "GOLD"   ? 0.75
                  : cardType === "PLATINUM" ? 1
                  : 0;
if (pointsPerLiter > 0) {
    console.log(`Вы получите ${liters * pointsPerLiter} баллов`);
}