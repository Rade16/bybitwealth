const accordionHeaders = document.querySelectorAll(".faq__accordion-header");
const accordionContents = document.querySelectorAll(".faq__accordion-content");

accordionHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const accordionItem = header.parentElement;
    const accordionContent = accordionItem.querySelector(
      ".faq__accordion-content"
    );

    // Закрываем все другие аккордеоны
    accordionHeaders.forEach((otherHeader) => {
      if (otherHeader !== header) {
        otherHeader.classList.remove("active");
        const otherContent = otherHeader.parentElement.querySelector(
          ".faq__accordion-content"
        );
        otherContent.classList.remove("active");
        otherContent.style.maxHeight = "0";
      }
    });

    // Переключаем класс active для заголовка
    header.classList.toggle("active");

    // Переключаем класс active и анимацию для контента
    accordionContent.classList.toggle("active");

    if (accordionContent.classList.contains("active")) {
      accordionContent.style.maxHeight = 1000 + "px";
    } else {
      accordionContent.style.maxHeight = "0";
      header.classList.remove("active"); // Убираем active если закрываем
    }
  });
});
