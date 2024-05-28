// Проверяем, есть ли данные в localStorage
let userBalance = localStorage.getItem('userBalance');
if (!userBalance) {
    userBalance = 0;
    localStorage.setItem('userBalance', userBalance);
} else {
    userBalance = parseInt(userBalance);
}

let watermelons = 0;
let energy = 100;
let boostCoins = 0;

const watermelonImage = document.getElementById('watermelon');
const watermelonsSpan = document.getElementById('watermelons');
const energySpan = document.getElementById('energy');
const boostCoinsSpan = document.getElementById('boost-coins');
const energyBar = document.getElementById('energy-bar');
const gameContainer = document.getElementById('game-container');
const shopContainer = document.getElementById('shop-container');
const prizes = document.getElementById('prizes');
const caseResult = document.getElementById('case-result');

watermelonImage.onclick = (event) => {
    if (energy > 0) {
        watermelons += 1;
        energy -= 1;
        updateStats();
        showFloatingNumber(event.clientX, event.clientY);
    } else {
        alert("У тебя закончилась энергия!");
    }
};

function updateStats() {
    watermelonsSpan.innerText = watermelons;
    energySpan.innerText = energy;
    boostCoinsSpan.innerText = userBalance;
    energyBar.style.width = `${energy}%`;
}

function resetGame() {
    watermelons = 0;
    energy = 100;
    boostCoins = 0;
    updateStats();
}

function showFloatingNumber(x, y) {
    const floatingNumber = document.createElement('div');
    floatingNumber.innerText = '+1';
    floatingNumber.className = 'floating-number';
    floatingNumber.style.left = `${x}px`;
    floatingNumber.style.top = `${y}px`;
    document.body.appendChild(floatingNumber);

    floatingNumber.addEventListener('animationend', () => {
        floatingNumber.remove();
    });
}

function openShop() {
    gameContainer.style.display = 'none';
    shopContainer.style.display = 'block';
}

function closeShop() {
    gameContainer.style.display = 'block';
    shopContainer.style.display = 'none';
    caseResult.innerText = '';
}

function openCase() {
    if (userBalance >= 50) {
        userBalance -= 50;
        updateStats();
        animateCaseOpening();
    } else {
        alert("Недостаточно boost коинов!");
    }
}

function animateCaseOpening() {
    caseResult.innerText = '';
    prizes.style.display = 'block';
    prizes.classList.add('spinning');
    setTimeout(() => {
        prizes.style.display = 'none';
        prizes.classList.remove('spinning');
        let randomPrizeIndex = Math.floor(Math.random() * prizes.children.length);
        let prize = prizes.children[randomPrizeIndex].innerText;
        caseResult.innerText = `Вы выиграли: ${prize}`;
        if (prize === '10000 boost коинов') {
            userBalance += 10000;
            localStorage.setItem('userBalance', userBalance);
            updateStats();
        }
    }, 3000); // Длительность анимации
}
