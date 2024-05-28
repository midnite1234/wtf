// Проверяем, есть ли данные в localStorage
let userBalance = localStorage.getItem('userBalance');
if (!userBalance) {
    userBalance = 0;
    localStorage.setItem('userBalance', userBalance);
} else {
    userBalance = parseInt(userBalance);
}

let energy = 100;
let upgradeMultiplier = 1;

const watermelonImage = document.getElementById('watermelon');
const energySpan = document.getElementById('energy');
const boostCoinsSpan = document.getElementById('boost-coins');
const energyBar = document.getElementById('energy-bar');
const gameContainer = document.getElementById('game-container');
const shopContainer = document.getElementById('shop-container');
const prizes = document.getElementById('prizes');
const caseResult = document.getElementById('case-result');

// Функция для обновления отображения статистики
function updateStats() {
    energySpan.innerText = energy;
    boostCoinsSpan.innerText = userBalance;
    energyBar.style.width = `${energy}%`;
}

// Функция для отображения анимации числа, выплывающего из клика пользователя
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

// Функция для открытия лавки
function openShop() {
    gameContainer.style.display = 'none';
    shopContainer.style.display = 'block';
}

// Функция для закрытия лавки
function closeShop() {
    gameContainer.style.display = 'block';
    shopContainer.style.display = 'none';
    caseResult.innerText = '';
}

// Функция для открытия кейса
function openCase() {
    if (userBalance >= 50) {
        userBalance -= 50;
        updateStats();
        animateCaseOpening();
    } else {
        alert("Недостаточно boost коинов!");
    }
}

// Функция для анимации открытия кейса
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

// Функция для покупки улучшения "2x"
function buyUpgrade() {
    const upgradeCost = 100; // Цена улучшения "2x" в boost коинах
    const currentBoostCoins = parseInt(boostCoinsSpan.innerText);
    
    // Проверяем, достаточно ли у пользователя boost коинов для покупки улучшения
    if (currentBoostCoins >= upgradeCost) {
        upgradeMultiplier = 2; // Устанавливаем множитель улучшения в 2
        boostCoinsSpan.innerText = currentBoostCoins - upgradeCost; // Вычитаем стоимость улучшения из boost коинов пользователя
        document.querySelector('.menu div:nth-child(2)').innerText = `2x (${upgradeCost} boost коинов)`; // Обновляем текст кнопки в меню
    } else {
        alert("Недостаточно boost коинов для покупки улучшения!");
    }
}

// Функция для увеличения кликов при нажатии на изображение
watermelonImage.onclick = (event) => {
    if (energy > 0) {
        userBalance += upgradeMultiplier; // Увеличиваем баланс пользователя на основе множителя улучшения
        energy -= 1;
        localStorage.setItem('userBalance', userBalance);
        updateStats();
        showFloatingNumber(event.clientX, event.clientY);
    } else {
        alert("У тебя закончилась энергия!");
    }
};
