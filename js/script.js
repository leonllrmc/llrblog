import { randomLetterEffect } from "./randomLetterEffect.js";

document.addEventListener("DOMContentLoaded", () => {
    const titleElement = document.querySelector(".main-title");
    randomLetterEffect(titleElement, titleElement.innerHTML, 2000);
});
