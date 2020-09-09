const fruits = ["banana", "peach", "orange", "lemon"]

let match = 0;
let openCards = [];

function createDeck() {
    // create the cards
    fruits.forEach(fruit => {
        $(".deck").append("<div class='cards " + fruit + "'></div>") &&
            $("." + fruit).clone().appendTo(".deck");
    })


    // randomize cards in deck
    let parent = $(".deck");
    let divs = parent.children();
    while (divs.length) {
        let card = divs.splice(Math.floor(Math.random() * divs.length), 1)[0];
        parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
    }
};

// This function return the first fruit found in a string
// Return false if no fruits have been found
function getFruit(str) {
    const words = str.split(' ');
    for (i = 0; i < words.length; i++) {
        if (fruits.includes(words[i])) {
            return words[i];
        }
    }
    return false;
}


// This function allows user to active a card (i.e. to show it)
// It also validate if there is two activated card and if so if they are matching
function addCardListener() {
    $(".deck").find('.cards').bind('click', function () {
        let $this = $(this);
        // Do nothing if the card has already been flipped or matched    
        if ($this.hasClass('active') || $this.hasClass('match')) { return true; }

        // Flip the card otherwise
        $this.addClass('active show');

        // Get the card type (fruit in future...)
        let fruit = getFruit($this[0].className);
        if (fruit) {
            openCards.push(fruit);
        } else {
            console.error("Carte non trouvée");
        }

        // Compare card if there is already one selected
        if (openCards.length > 1) {
            if (openCards[0] === openCards[1]) {
                // Add match class and then remove the active class
                $(".deck").find('.active').addClass('match');
                setTimeout(function () {
                    $(".deck").find('.active').removeClass('active');
                }, 500);

                // Increment the number of matchedPairs
                match++;
            } else {
                // If no match, both cards are flipped back
                setTimeout(function () {
                    $(".deck").find('.active').removeClass('active show');
                }, 1000);
            }
            // Flush openCards
            openCards = [];
        }

        if (fruits.length === match) {
            gameOver();
        }


    });
};

function gameOver() {
    setTimeout(function () {
        alert('Fini !');
    }, 500);
}


$(document).ready(function () {
    /*
    * First step:
    * Append Memory Cards to the playing board
    */
    createDeck();

    /*
    * Listen click events
    */
    addCardListener();

});
