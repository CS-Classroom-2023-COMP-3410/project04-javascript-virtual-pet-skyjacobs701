/*
Skylar Jacobs 
Project 4: Virtual Pet
*/

// I've realized that half the time I refer to it as a "pet" and the other half as a "dog"
// They're basically interchangeable
// Maybe someday I'll come back and add a cat, who knows

// Constants
const dog = document.querySelector('.dog');

const happinessStatus = document.querySelector('.happiness');
const hungerStatus = document.querySelector('.hunger');
const energyStatus = document.querySelector('.energy');

const playButton = document.getElementById('play-button');
const feedButton = document.getElementById('feed-button');
const sleepButton = document.getElementById('sleep-button');

const petNameInput = document.getElementById("pet-name");
const savedName = localStorage.getItem("pet-name");
const petName = document.querySelector('.pet-name');

const status = document.querySelector('.status');

// Load saved name
if (savedName) {
    petNameInput.value = savedName;
    petName.textContent = savedName;
} else {
    petName.textContent = "Your pet";
}

// Allows user to name the dog
petNameInput.addEventListener("input", () => {
    const name = petNameInput.value.trim();
    if (name) {
        localStorage.setItem("pet-name", name);
    } else {
        localStorage.removeItem("pet-name");
    }
    petName.textContent = name || "Your pet";
});

// Initializes or loads stats
let happiness = parseInt(localStorage.getItem("happiness")) || 100;
let hunger = parseInt(localStorage.getItem("hunger")) || 100;
let energy = parseInt(localStorage.getItem("energy")) || 100;

happinessStatus.textContent = happiness;
hungerStatus.textContent = hunger;
energyStatus.textContent = energy;

// Saves stats to local storage
function saveStats() {
    localStorage.setItem("happiness", happiness);
    localStorage.setItem("hunger", hunger);
    localStorage.setItem("energy", energy);
}

let happinessTimeout, hungerTimeout, energyTimeout;

// Decreases happiness by 1 or 2 at random intervals
function decreaseHappiness() {
    happinessTimeout = setTimeout(() => {
        happiness -= Math.floor(Math.random() * 2) + 1;
        if (happiness < 0) {
            happiness = 0;
        }
        happinessStatus.textContent = happiness;
        checkStats();
        saveStats();
        decreaseHappiness();
    }, Math.floor(Math.random() * 2000) + 1200);
}

// Decreases hunger by 1 or 2 at random intervals
function decreaseHunger() {
    hungerTimeout = setTimeout(() => {
        hunger -= Math.floor(Math.random() * 2) + 1;
        if (hunger < 0) {
            hunger = 0;
        }
        hungerStatus.textContent = hunger;
        checkStats();
        saveStats();
        decreaseHunger();
    }, Math.floor(Math.random() * 1200) + 800);
}

// Decreases energy by 1 or 2 at random intervals
function decreaseEnergy() {
    energyTimeout = setTimeout(() => {
        energy -= Math.floor(Math.random() * 2) + 1;
        if (energy < 0) {
            energy = 0;
        }
        energyStatus.textContent = energy;
        checkStats();
        saveStats();
        decreaseEnergy();
    }, Math.floor(Math.random() * 2000) + 2000);
}

// Stops any current stat decay (so they don't overlap) and starts it
function startStatDecay() {
    stopStatDecay();
    decreaseHappiness();
    decreaseHunger();
    decreaseEnergy();
}

// Stops stat decay
function stopStatDecay() {
    clearTimeout(happinessTimeout);
    clearTimeout(hungerTimeout);
    clearTimeout(energyTimeout);
}

// Checks stats of the dog
// If any are below 25, updates the dog's state accordingly
// Priority order is sad > hungry > sleepy
function checkStats() {
    if (!dog.className.includes("playing") && !dog.className.includes("eating") && !dog.className.includes("sleeping")) {
        if (happiness < 25) {
            dog.className = "dog sad";
        } 
        else if (hunger < 25) {
            dog.className = "dog hungry";
        } 
        else if (energy < 25) {
            dog.className = "dog sleepy";
        } 
        else {
            dog.className = "dog idle";
        }
    }

    updateStatus();
}

// Disables buttons during actions
function disableButtons() {
    playButton.disabled = true;
    feedButton.disabled = true;
    sleepButton.disabled = true;
}

// Enables buttons after actions
function enableButtons() {
    playButton.disabled = false;
    feedButton.disabled = false;
    sleepButton.disabled = false;
}

// Play button, shows dog as playing, increases happiness, decreases energy and hunger
playButton.addEventListener("click", () => {
    stopStatDecay();
    disableButtons();

    dog.className = "dog playing";
    updateStatus();

    happiness += 15;
    if (happiness > 100) {
        happiness = 100;
    }
    energy -= 5;
    if (energy < 0) {
        energy = 0;
    }
    hunger -= 5;
    if (hunger < 0) {
        hunger = 0;
    }

    happinessStatus.textContent = happiness;
    energyStatus.textContent = energy;
    hungerStatus.textContent = hunger;
    saveStats();

    setTimeout(() => {
        dog.className = "dog idle";
        updateStatus();
        enableButtons();
        startStatDecay();
    }, 3000);
});

// Feed button, shows dog as eating, increases hunger, increases happiness
feedButton.addEventListener("click", () => {
    stopStatDecay();
    disableButtons();

    dog.className = "dog eating";
    updateStatus();

    hunger += 15;
    if (hunger > 100) {
        hunger = 100;
    }
    happiness += 5;
    if (happiness > 100) {
        happiness = 100;
    }

    hungerStatus.textContent = hunger;
    happinessStatus.textContent = happiness;
    saveStats();

    setTimeout(() => {
        dog.className = "dog idle";
        updateStatus();
        enableButtons();
        startStatDecay();
    }, 3000);
});

// Sleep button, shows dog as sleeping, increases energy
sleepButton.addEventListener("click", () => {
    stopStatDecay();
    disableButtons();

    // May be a little impractical to have sleep autmoatically restore full energy,
    // but oh well I like it anyway
    energy = 100;
    energyStatus.textContent = energy;
    saveStats();

    dog.className = "dog sleeping";
    updateStatus();

    setTimeout(() => {
        dog.className = "dog idle";
        updateStatus();
        enableButtons();
        startStatDecay();
    }, 6000);
});

// Updates the status text based on the dog's state
// Priority order (if not in idle or an action) is sad > hungry > sleepy
function updateStatus() {
    let statusText = "happy";

    console.log(dog.className);

    if (dog.className.includes("playing")) {
        statusText = "playing";
    } 
    else if (dog.className.includes("eating")) {
        statusText = "eating";
    } 
    else if (dog.className.includes("sleeping")) {
        statusText = "sleeping";
    } 
    else if (dog.className.includes("sad")) {
        statusText = "sad";
    } 
    else if (dog.className.includes("hungry")) {
        statusText = "hungry";
    } 
    else if (dog.className.includes("sleepy")) {
        statusText = "sleepy";
    } 
    else if (dog.className.includes("idle")) {
        statusText = "happy";
    }

    status.textContent = statusText;
}

// Beginning of stat decay
startStatDecay();