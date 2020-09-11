const fruits = ["banana", "peach", "orange", "lemon"]
const timetotal = 50;

let match = 0;
let openCards = [];
let timeleft = 50;
let startGame = false;

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
    for (let i = 0; i < words.length; i++) {
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
        // Do nothing if the card is active, matched or if there is already two  
        if ($this.hasClass('active') || $this.hasClass('match') || openCards.length === 2) {
            return true;
        }

        // Flip the card otherwise
        $this.addClass('active show');

        // Get the card type 
        let fruit = getFruit($this[0].className);
        if (fruit) {
            openCards.push(fruit);
        } else {
            console.error("Carte non trouvée");
        }

        // Compare card if there is two selected
        if (openCards.length === 2) {
            if (openCards[0] === openCards[1]) {
                // Add match class and then remove the active class
                $(".deck").find('.active').addClass('match');
                setTimeout(function () {
                    $(".deck").find('.active').removeClass('active');
                    openCards = [];
                }, 500);

                // Increment the number of matchedPairs
                match++;
            } else {
                // If no match, both cards are flipped back
                setTimeout(function () {
                    $(".deck").find('.active').removeClass('active show');
                    openCards = [];
                }, 1000);
            }
        }

        if (fruits.length === match) {
            gameOver(true);
        }
    });
};

function gameOver(success) {
    if (success) {
        let score = timetotal - timeleft;
        setTimeout(function () {
            alert('Gagnééééé en ' + score + ' secondes !');
        }, 500)
    } else {
        setTimeout(function () {
            alert('Looooser');
        }, 500)
    }
    // Reload the page
    setTimeout(function () {
        document.location.reload(true);
    }, 1000)
}

function getScores() {
    $.get('http://localhost:3000/', function (data) {
        console.log('data', data);
        $('p').text(data.text);
    });
}

$(document).ready(function () {
    /*
    * First step:
    * Append Memory Cards to the playing board
    */
    createDeck();

    getScores();

    /*
    * Start game on button click
    */
    $("#start").click(() => {
        // Disabled the button after first click
        $(this).prop('disabled', true);

        // Start countdown

        let countdown = setInterval(() => {
            // Animate countdown width in window
            let countdownWidth = (timeleft - 1) / timetotal * 100;
            $(".countdown").animate({ width: countdownWidth + '%' }, 1000).html(timeleft)

            // Game is over when time is finished
            if (timeleft <= 0) {
                clearInterval(countdown);
                gameOver();
            }

            // Time left decreases each second
            timeleft -= 1;
        }, 1000)


        // Listen cards click    
        addCardListener();
    });

});

