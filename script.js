const cardContainer = document.getElementById('card-container');
cardContainer.innerHTML = '';
const imageFolder = 'images';
const hidden = 'images/hidden.png'
const black = 'black.png';
const cards = ['0', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'J', 'K', 'Q']
let imageList = [];
let duplicate = [];
let currentCard = 'S';
let count = 5;

//Display Images in Random order

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
        let randomIndex = getRandomInt(0, array.length - 1);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }
}

function setup() {
    imageList = [];
    duplicate = [];
    for (var i = 1; i <= 5; i++) {
        let randNum = getRandomInt(0, 12);
        while (duplicate.includes(randNum)) {
            randNum = getRandomInt(0, 12);
        }
        duplicate.push(randNum);
        imageList.push(cards[randNum] + '0' + '.png');
        imageList.push(cards[randNum] + '1' + '.png');
    }

    shuffle(imageList);

    imageList.forEach(imageName => {
        const imgElement = document.createElement('img');
        imgElement.src = `${hidden}`;
        imgElement.classList.add('check');
        imgElement.dataset.imgsrc = `${imageFolder}/${imageName}`

        const imgItem = document.createElement('div');
        imgItem.classList.add('image-item');
        imgElement.classList.add('C' + imageName.charAt(0));
        imgItem.appendChild(imgElement);

        cardContainer.appendChild(imgItem);
    });
}

//Start Timer when a button is clicked

const startButton = document.getElementById('startButton');
const elapsedTimeDisplay = document.getElementById('elapsedTime');
let startTime;
let intervalId;

startButton.addEventListener('click', () => {
    setup();
    calculate();
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('timeCalc').style.display = 'block';
    document.getElementById('moves').style.display = 'block';
    document.getElementById('card-container').style.display = 'flex';
    startTime = new Date();
    if (intervalId) {
        clearInterval(intervalId);
    }
    intervalId = setInterval(updateElapsedTime, 1000);
});

function updateElapsedTime() {
    const currentTime = new Date();
    const timeElapsed = Math.floor((currentTime - startTime) / 1000);
    elapsedTimeDisplay.textContent = `${timeElapsed} seconds`;
}

//Handle image clicks and move count
function calculate() {
    const imageItems = document.querySelectorAll('.check');
    imageItems.forEach(imageItem => imageItem.addEventListener('click', function() {
        const ctx = this;
        cardContainer.style.pointerEvents = 'none';
        setTimeout(function() {
            console.log(ctx);
            const str = ctx.src;
            if (str.includes(hidden)) {
                ctx.src = ctx.dataset.imgsrc;
                if (currentCard == 'S')
                    currentCard = ctx.classList[1];
                else if (currentCard == ctx.classList[1]) {
                    let x = '.' + ctx.classList[1];
                    const sameImg = document.querySelectorAll(x);
                    sameImg.forEach(img => img.src = black);
                    currentCard = 'S';
                    --count;
                } else
                    ctx.src = hidden;
            }
            console.log(count);
            let move = parseInt(document.querySelector('.move').innerHTML);
            document.querySelector('.move').innerHTML = move + 1;
            if (count == 0) {
                if (intervalId) {
                    clearInterval(intervalId);
                }
                document.getElementById('card-container').style.display = 'none';
                document.getElementById('restartGame').style.display = 'block';
            }
            cardContainer.style.pointerEvents = 'auto';
        }, 500);
    }));
}

const restartButton = document.getElementById('restart');
restartButton.addEventListener('click', function() {
    document.getElementById('startButton').style.display = 'block';
    document.getElementById('timeCalc').style.display = 'none';
    document.getElementById('moves').style.display = 'none';
    document.getElementById('restartGame').style.display = 'none';
});