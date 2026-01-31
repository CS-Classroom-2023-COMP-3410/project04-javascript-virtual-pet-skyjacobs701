const dog = document.querySelector('.dog');

const happinessStatus = document.querySelector('.happiness');
const hungerStatus = document.querySelector('.hunger');
const energyStatus = document.querySelector('.energy');

const playButton = document.getElementById('play-button');
const feedButton = document.getElementById('feed-button');
const sleepButton = document.getElementById('sleep-button');

const petNameInput = document.getElementById("pet-name");
const savedName = localStorage.getItem("pet-name");

if (savedName) {
    petNameInput.value = savedName;
}

petNameInput.addEventListener("input", () => {
    const name = petNameInput.value.trim();
    if (name) {
        localStorage.setItem("pet-name", name);
    } else {
        localStorage.removeItem("pet-name");
    }
});

let happinessInterval;
let hungerInterval;
let energyInterval;

function startStatDecrease() {
    happinessInterval = setInterval(() => {
        happiness -= 1;
        if (happiness < 0) happiness = 0;
        happinessStatus.textContent = happiness;
    }, 6000);

    hungerInterval = setInterval(() => {
        hunger -= 1;
        if (hunger < 0) hunger = 0;
        hungerStatus.textContent = hunger;
    }, 4000);

    energyInterval = setInterval(() => {
        energy -= 1;
        if (energy < 0) energy = 0;
        energyStatus.textContent = energy;
    }, 8000);
}

function stopStatDecrease() {
    clearInterval(happinessInterval);
    clearInterval(hungerInterval);
    clearInterval(energyInterval);
}

startStatDecrease();

playButton.addEventListener("click", () => {
    dog.className = "dog playing";
    
    happiness += 10;
    if (happiness > 100) happiness = 100;

    energy -= 5;
    if (energy < 0) energy = 0;

    hunger -= 5;
    if (hunger < 0) hunger = 0;

    happinessStatus.textContent = happiness;
    energyStatus.textContent = energy;
    hungerStatus.textContent = hunger;

    setTimeout(() => {
        dog.className = "dog idle";
    }, 3000);
});

sleepButton.addEventListener("click", () => {
    stopStatDecrease();

    energy = 100;
    energyStatus.textContent = energy;

    dog.className = "dog sleeping";

    setTimeout(() => {
        dog.className = "dog idle";
        startStatDecrease();
    }, 10000);
});

feedButton.addEventListener("click", () => {
    dog.className = "dog eating";
    
    hunger += 15;
    if (hunger > 100) hunger = 100;
    hungerStatus.textContent = hunger;

    setTimeout(() => {
        dog.className = "dog idle";
    }, 3000);
});
