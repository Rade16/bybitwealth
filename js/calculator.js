// Инициализация констант и шагов
const initialCapitalSteps = [
  150, 300, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000,
];
const interestRateSteps = [
  150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650,
]; // 100-1100 с шагом 50

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
    `<b>${value.toLocaleString()}</b>` + `<span class="gray"> $</span>`;
  updateRangeBackground(e.target, e.target.value, e.target.max);
  calculateProfit();
}

// Обновление процентной ставки
function updateInterestRate(e) {
  const rate = interestRateSteps[e.target.value];
  document.querySelector("#interestRate").innerHTML = `<b>${rate}%</b>`;
  updateRangeBackground(e.target, e.target.value, e.target.max);
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
  const displayedYears = value + 1;
  document.querySelector(
    "#investmentPeriod"
  ).innerHTML = `<b>${displayedYears}</b>`;
  updateRangeBackground(e.target, value, e.target.max);
  calculateProfit();
}

function calculateProfit() {
  const initialCapital = initialCapitalSteps[initialCapitalRange.value];
  const months = parseInt(investmentPeriodRange.value) + 1;
  const annualRate = interestRateSteps[interestRateRange.value] / 100;
  const isReinvest = reinvestCheckbox.checked;

  let total, profit;

  if (isReinvest) {
    if (isReinvest) {
      const monthlyRate = annualRate / 12;
      total = initialCapital * Math.pow(1 + monthlyRate, months);
    }
  } else {
    total = initialCapital * (1 + ((annualRate * 1) / 12) * months);
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
