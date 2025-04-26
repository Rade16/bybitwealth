// Инициализация констант и шагов
const initialCapitalSteps = [
  150, 300, 500, 1000, 1500, 2000, 3000, 5000, 10000, 15000,
];
const interestRateSteps = Array.from({ length: 21 }, (_, i) => (i + 2) * 50); // 100-1100 с шагом 50

// Ползунки
const initialCapitalRange = document.querySelector("#initialCapitalRange");
const investmentPeriodRange = document.querySelector("#investmentPeriodRange");
const interestRateRange = document.querySelector("#interestRateRange");

// Обработчики событий
initialCapitalRange.addEventListener("input", updateInitialCapital);
investmentPeriodRange.addEventListener("input", updateInvestmentPeriod);
interestRateRange.addEventListener("input", updateInterestRate);

// Инициализация значений
document.addEventListener("DOMContentLoaded", initCalculator);

function initCalculator() {
  // Установка начальных значений
  updateInitialCapital({ target: initialCapitalRange });
  updateInvestmentPeriod({ target: investmentPeriodRange });
  updateInterestRate({ target: interestRateRange });
  calculateProfit();
}

// Обновление начального капитала
function updateInitialCapital(e) {
  const value = initialCapitalSteps[e.target.value];
  document.querySelector("#initialCapital").innerHTML =
    value.toLocaleString() + `<span class="gray"> $</span>`;
  updateRangeBackground(e.target, e.target.value, e.target.max);
  calculateProfit();
}

// Обновление периода инвестиций
function updateInvestmentPeriod(e) {
  const years = parseInt(e.target.value) + 1;
  document.querySelector(
    "#investmentPeriod"
  ).innerHTML = `<b>${years} years</b>`;
  updateRangeBackground(e.target, e.target.value, e.target.max);
  calculateProfit();
}

// Обновление процентной ставки
function updateInterestRate(e) {
  const rate = interestRateSteps[e.target.value - 2]; // т.к. min=2
  document.querySelector("#interestRate").innerHTML = `<b>${rate}%</b>`;
  updateRangeBackground(e.target, e.target.value - 2, 20); // 21 элемент (0-20)
  calculateProfit();
}

// Обновление фона ползунка
function updateRangeBackground(range, current, max) {
  const progress = (current / max) * 100;
  range.style.background = `linear-gradient(to right, #ffba2f ${progress}%, #f5f7fa ${progress}%)`;
}

const reinvestCheckbox = document.querySelector("#reinvest");
reinvestCheckbox.addEventListener("change", calculateProfit);

// Расчет прибыли
function updateInvestmentPeriod(e) {
  const value = parseInt(e.target.value);
  const displayedYears = value + 1; // Для отображения "1-10 лет"
  document.querySelector(
    "#investmentPeriod"
  ).innerHTML = `<b>${displayedYears} years</b>`;
  updateRangeBackground(e.target, value, e.target.max);
  calculateProfit();
}

// В функции расчета прибыли используйте исходное значение
function calculateProfit() {
  const initialCapital = initialCapitalSteps[initialCapitalRange.value];
  const years = parseInt(investmentPeriodRange.value) + 1; // Исправлено: +1 для реального срока
  const annualRate = interestRateSteps[interestRateRange.value - 2] / 100;
  const isReinvest = reinvestCheckbox.checked;

  let total, profit;

  if (isReinvest) {
    const n = 12;
    total = initialCapital * Math.pow(1 + annualRate / n, n * years);
  } else {
    total = initialCapital * (1 + annualRate * years); // Формула простых процентов
  }

  profit = total - initialCapital;

  document.getElementById("yourProfit").textContent = `+ ${Math.round(
    profit
  ).toLocaleString()} $`;
  document.getElementById("total").textContent = `+ ${Math.round(
    total
  ).toLocaleString()} $`;
}

const info = document.querySelector(".calculator__calc-rate-info");
const infoBlock = document.querySelector(".calculator__calc-rate-info-text");
info.addEventListener("mouseenter", () => {
  infoBlock.style.display = "block";
});
info.addEventListener("mouseleave", () => {
  infoBlock.style.display = "none";
});
