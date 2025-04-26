const feedbackLine = document.querySelector(".slider__content-line");
const feedbackContent = document.querySelector(".slider__content");

const sliderLeft = document.getElementById("slider-left");
const sliderRight = document.getElementById("slider-right");

const feedbackLineWidth = feedbackLine.offsetWidth;
const feedbackContentWidth = feedbackContent.offsetWidth;
const feedbackElementWidth = feedbackLine.firstElementChild.offsetWidth + 24;

let position = 0;
const track = feedbackContentWidth - feedbackLineWidth;
console.log(track);

function updateSliderPosition() {
  const offset = position;
  feedbackLine.style.transition = `transform 0.75s ease-out`;
  feedbackLine.style.transform = `translateX(${offset}px)`;
}

sliderLeft.addEventListener("click", () => {
  position = Math.min(position + feedbackElementWidth, 0);
  updateSliderPosition();
});

sliderRight.addEventListener("click", () => {
  position = Math.max(position - feedbackElementWidth, track);
  updateSliderPosition();
});

let isDragging = false;
let startX;
let initialPosition;

feedbackLine.addEventListener("mousedown", dragStart);
document.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragEnd);

feedbackLine.addEventListener("touchstart", dragStart);
document.addEventListener("touchmove", dragging);
document.addEventListener("touchend", dragEnd);

function dragStart(e) {
  isDragging = true;
  startX = e.clientX || e.touches[0].clientX;
  initialPosition = position;
  feedbackLine.style.transition = "none";
  e.preventDefault();
}

function dragging(e) {
  if (!isDragging) return;

  const currentX = e.clientX || e.touches[0].clientX;
  const diff = currentX - startX;
  position = initialPosition + diff;

  position = Math.max(position, track);
  position = Math.min(position, 0);

  feedbackLine.style.transform = `translateX(${position}px)`;
}

function dragEnd() {
  isDragging = false;
  feedbackLine.style.transition = "transform 0.75s ease-out";

  position = Math.max(Math.min(position, 0), track);
  updateSliderPosition();
}
