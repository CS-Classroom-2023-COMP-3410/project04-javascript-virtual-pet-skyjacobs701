const dog = document.querySelector('.dog');

// const dogStates = ['idle', 'sad', 'playing', 'sleepy', 'sleeping', 'hungry', 'eating'];   

// let currentIndex = 0;

// dog.addEventListener('click', function() {
//     currentIndex = (currentIndex + 1) % dogStates.length;
//     dog.className = 'dog ' + dogStates[currentIndex];
// });

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
