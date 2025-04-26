let scrollPosition = 0;
const modal = document.getElementById("modal");
const modalBtn = document.getElementById("modalBtn");
const showModal = () => {
  scrollPosition = window.pageYOffset;
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollPosition}px`;
  document.body.style.width = "100%";
};

const closeModal = () => {
  modal.style.display = "none";
  document.body.style.overflow = "";
  document.body.style.position = "";
  document.body.style.width = "";
  window.scrollTo({
    top: scrollPosition,
    behavior: "auto",
  });
};

modalBtn.addEventListener("click", () => {
  closeModal();
  window.location.href = "./call.html";
});
