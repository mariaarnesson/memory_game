var cardColors = ['yellow', 'yellow', 'green', 'green', 'red', 'red', 'blue', 'blue', 'brown', 'brown', 'grey', 'grey', 'light-green', 'light-green', 'cadetblue', 'cadetblue', 'violet', 'violet' ];



let cards = document.querySelectorAll("div");
cards = [...cards];

const startTime = new Date().getTime();

let activeCard = "";
const activeCards = [];

const gameLength = cards.length /2; //9

/*Result information - how many pairs have been made*/
let gameResult = 0;

/*After clicking on a card*/
const clickCard = function() {
    activeCard = this;

    if (activeCard == activeCards[0]) return;

    /*Hide the card that was clicked*/
    activeCard.classList.remove("hidden");

    if (activeCards.length === 0) {
        console.log("1 element");
        activeCards[0] = activeCard;
        return;
    }else {
        console.log("2 element");

        function shuffle(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;
              
            while (0 !== currentIndex) {
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex -= 1;
              temporaryValue = array[currentIndex];
              array[currentIndex] = array[randomIndex];
              array[randomIndex] = temporaryValue;
            }
          
            return array;
          }

        /*romove the possibility of clicking*/
        cards.forEach(card => card.removeEventListener("click", clickCard))
        activeCards[1] = activeCard;

        setTimeout(function (){
            if (activeCards[0].className === activeCards[1].className) {
                console.log("You win!")
                activeCards.forEach(card => card.classList.add("off"));
                gameResult++;
                cards = cards.filter(card => !card.classList.contains("off"));

                /*Game is over*/
                if (gameResult == gameLength) {
                    const endTime = new Date().getTime();
                    const gameTime = (endTime - startTime) / 1000
                    alert(`Well Done!! Your score is: ${gameTime} seconds`)
                    location.reload();
                }
            }
            /*defeat, hide again*/
            else {
                console.log("defeat")
                activeCards.forEach(card => card.classList.add("hidden"))
            }
            /*Reset*/
            activeCard = ""; /* active card is blank */
            activeCards.length = 0;
            cards.forEach(card => card.addEventListener("click", clickCard))

        }, 500)
    }

};
/* Function instalized after start */
const shuffleCard = function () {
    cards.forEach(card => {

        const position = Math.floor(Math.random() * cardColors.length); //1

        card.classList.add(cardColors[position]);
        cardColors.splice(position, 1);
    })
    /* 5 seconds hidden */
    setTimeout(function () {
        cards.forEach(card => {
            card.classList.add("hidden")
            card.addEventListener("click", clickCard)
        })
    }, 500)
};

shuffleCard();






