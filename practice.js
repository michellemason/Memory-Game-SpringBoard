const gameContainer = document.getElementById("game");

function factorySettings() {
    let card1 = null;
    let card2 = null;
}

let cardsFlippedTotal = 0;
let flipCounter = 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(e) {  
    flipCounter++;

    if (flipCounter === 1) {
        card1 = e.target;
        card1.style.backgroundColor = e.target.classList[0];
        card1.classList.add('flipped');
        // console.log(card1.className);
        card1.removeEventListener('click', handleCardClick);

    } else if (flipCounter === 2) {
        card2 = e.target;
        card2.style.backgroundColor = e.target.classList[0];
        card2.classList.add('flipped');
        // console.log(card2.className);
        card2.removeEventListener('click', handleCardClick);

        if (card1.className === card2.className) {
            cardsFlippedTotal += 2;
            //add event listeners back to cards
            card1.addEventListener('click', handleCardClick);
            card2.addEventListener('click', handleCardClick);
            //reset cards back to original setting
            factorySettings();
            flipCounter = 0;
        } else {
            setTimeout(function() {
                card1.style.backgroundColor = '';
                card2.style.backgroundColor = '';
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                factorySettings();
                flipCounter = 0;
            }, 1000);
            //make sure other cards can be clicked on after finding or not finding a match
            card1.addEventListener('click', handleCardClick);
            card2.addEventListener('click', handleCardClick);
        }
    }
    if (cardsFlippedTotal === COLORS.length) {
        setTimeout(function() {
            alert ("Congratulations! You finished the game!");
        }, 500);
    }

}
// when the DOM loads
createDivsForColors(shuffledColors);