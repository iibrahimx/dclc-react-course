// Select all FAQ items
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {

        // Close an already opend item after clicking
        if (item.classList.contains("active")) {
            item.classList.remove("active");
            return;
        }

        // Close ALL other FAQ items
        faqItems.forEach(i => i.classList.remove("active"));

        // Open the clicked item
        item.classList.add("active");
    });
});
