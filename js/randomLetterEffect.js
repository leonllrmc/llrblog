function randomLetterEffect(element, text, totalTime) {
    const symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZ12334567890!@#$%^&*()_+-=~`|\\:;\"'<>,.?/{}[]";
    let interval = null;
    let counter = -1;

    // Build one span per character, each sized to fit its final letter
    element.innerHTML = text.split("").map((letter, i) => {
        const isSpace = letter === " ";
        return `<span id="rle-char-${i}" style="display:inline-block;text-align:center;${isSpace ? "width:0.3em;" : ""}">${isSpace ? "&nbsp;" : letter}</span>`;
    }).join("");

    // Measure and lock each span's width to the final character's width
    text.split("").forEach((letter, i) => {
        const span = element.querySelector(`#rle-char-${i}`);
        if (letter !== " ") {
            span.style.width = span.offsetWidth + "px";
        }
    });

    clearInterval(interval);
    interval = setInterval(() => {
        const shuffleInterval = setInterval(() => {
            text.split("").forEach((letter, index) => {
                const span = element.querySelector(`#rle-char-${index}`);
                if (index < counter) {
                    span.textContent = letter;
                } else {
                    span.textContent = symbols[Math.floor(Math.random() * symbols.length)];
                }
            });
            if (counter >= text.length) {
                clearInterval(shuffleInterval);
            }
        }, 20);
        counter++;
    }, totalTime / text.length);
    setTimeout(() => {
        element.classList.add("text-glitch");
    },  totalTime);
    setTimeout(() => {
        element.classList.remove("text-glitch");
    }, totalTime + 2000);
}
export { randomLetterEffect };
