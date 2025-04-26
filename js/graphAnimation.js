const values = ["0", "20", "40.28", "136.49", "493.99", "825.50"];
const element = document.getElementById("graphProfit");
let animationTimeout;
let animationInterval;

function resetAnimation() {
  element.textContent = "$ 0";
  clearTimeout(animationTimeout);
  clearInterval(animationInterval);
}

function startAnimationCycle() {
  resetAnimation();

  // Запускаем анимацию через 6 секунд
  animationTimeout = setTimeout(() => {
    let currentIndex = 1; // Начинаем с "$20"
    element.textContent = `$ ${values[currentIndex]}`;
    currentIndex++;

    animationInterval = setInterval(() => {
      if (currentIndex < values.length) {
        element.textContent = `$ ${values[currentIndex]}`;
        currentIndex++;
      } else {
        clearInterval(animationInterval);
      }
    }, 100); // Интервал между сменами текста
  }, 2000); // Задержка перед началом анимации
}

// Запускаем цикл каждые 10 секунд
setInterval(startAnimationCycle, 5000);

// Инициализация первого цикла
startAnimationCycle();
