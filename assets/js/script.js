const cardColors = ["yellow", "yellow", "green", "green", "red", "red", "blue", "blue", "brown", "brown", "grey", "grey", "light-green", "light-green", "cadetblue", "cadetblue", "violet", "violet" ];



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

        Array.prototype.shuffled = function() {
            return this.map(function(n){ return [Math.random(), n] })
                       .sort().map(function(n){ return n[1] });
          }
          function flipCard({target: clickedCard}) {
            if(cardOne !== clickedCard && !disableDeck) {
                clickedCard.classList.add("flipCard");
                if(!cardOne) {
                    return cardOne = clickedCard;
                }
                cardTwo = clickedCard;
                disableDeck = true;
                let cardOneImg = cardOne.querySelector(".back-view img").src,
                cardTwoImg = cardTwo.querySelector(".back-view img").src;
                matchCards(cardOneImg, cardTwoImg);
            }
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
    /* 2 seconds hidden */
    setTimeout(function () {
        cards.forEach(card => {
            card.classList.add("hidden")
            card.addEventListener("click", clickCard)
        })
    }, 200)
};

shuffleCard();






