// will delete later, this is to test stuff
const dog = document.querySelector('.dog');

const dogStates = ['idle', 'playful', 'playing', 'sleeping', 'hungry', 'eating', 'sad'];   
let currentIndex = 0;

dog.addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % dogStates.length;
    dog.className = 'dog ' + dogStates[currentIndex];
});
    