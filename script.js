const animals = [
    { emoji: "🐶", name: "کتا" },
    { emoji: "🐱", name: "بلی" },
    { emoji: "🐭", name: "چوہا" },
    { emoji: "🐹", name: "ہیمسٹر" },
    { emoji: "🐰", name: "خرگوش" },
    { emoji: "🦊", name: "لومڑی" },
    { emoji: "🐻", name: "ریچھ" },
    { emoji: "🐼", name: "پانڈا" }
];

let currentScore = 0;
let attempts = 0;
let selectedAnimalIndex = null;
let matchedPairs = new Array(animals.length).fill(false);

const animalsColumn = document.getElementById("animals-column");
const namesColumn = document.getElementById("names-column");
const scoreSpan = document.getElementById("score");
const attemptsSpan = document.getElementById("attempts");
const resetBtn = document.getElementById("reset-btn");
const messageDiv = document.getElementById("message");

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function renderGame() {
    // render animals
    animalsColumn.innerHTML = "";
    animals.forEach((animal, idx) => {
        const card = document.createElement("div");
        card.className = "animal-card";
        if (matchedPairs[idx]) card.classList.add("correct");
        if (selectedAnimalIndex === idx) card.classList.add("selected");
        card.innerHTML = `<div style="font-size:3rem">${animal.emoji}</div><div>${animal.name}</div>`;
        card.addEventListener("click", () => {
            if (matchedPairs[idx]) return;
            if (selectedAnimalIndex === idx) {
                selectedAnimalIndex = null;
            } else {
                selectedAnimalIndex = idx;
            }
            renderGame();
        });
        animalsColumn.appendChild(card);
    });

    // render shuffled names
    const shuffledNames = [...animals];
    shuffleArray(shuffledNames);
    namesColumn.innerHTML = "";
    shuffledNames.forEach((animal, shuffledIdx) => {
        const originalIdx = animals.findIndex(a => a.emoji === animal.emoji);
        const card = document.createElement("div");
        card.className = "name-card";
        if (matchedPairs[originalIdx]) card.classList.add("correct");
        card.innerHTML = animal.name;
        card.addEventListener("click", () => {
            if (matchedPairs[originalIdx]) return;
            if (selectedAnimalIndex === null) {
                messageDiv.innerText = "⚠️ پہلے بائیں طرف سے کوئی جانور منتخب کریں!";
                setTimeout(() => messageDiv.innerText = "", 1000);
                return;
            }
            attempts++;
            attemptsSpan.innerText = attempts;

            if (selectedAnimalIndex === originalIdx) {
                // correct match
                matchedPairs[originalIdx] = true;
                currentScore++;
                scoreSpan.innerText = currentScore;
                messageDiv.innerText = "✅ شاباش! درست جواب! 🎉";
                messageDiv.style.color = "green";
                selectedAnimalIndex = null;

                if (currentScore === animals.length) {
                    messageDiv.innerText = "🏆 مبارک ہو! آپ نے سب پزل حل کر لیا! 🏆";
                }
            } else {
                messageDiv.innerText = "❌ غلط! دوبارہ کوشش کریں۔";
                messageDiv.style.color = "red";
                selectedAnimalIndex = null;
            }
            renderGame();
            setTimeout(() => {
                if (messageDiv.innerText !== "🏆 مبارک ہو! آپ نے سب پزل حل کر لیا! 🏆") {
                    messageDiv.innerText = "";
                }
            }, 1200);
        });
        namesColumn.appendChild(card);
    });
}

function resetGame() {
    currentScore = 0;
    attempts = 0;
    selectedAnimalIndex = null;
    matchedPairs.fill(false);
    scoreSpan.innerText = "0";
    attemptsSpan.innerText = "0";
    messageDiv.innerText = "";
    messageDiv.style.color = "";
    renderGame();
}

resetBtn.addEventListener("click", resetGame);
renderGame();
