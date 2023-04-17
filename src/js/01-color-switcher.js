const btnStart = document.querySelector("[data-start]");
const btnStop = document.querySelector("[data-stop]");
let timerBtnStart;

btnStart.addEventListener('click', () => {
    // вимкнення кнопки (робимо неактивну використовуючи disabled)
    btnStart.disabled = true;
    btnStop.disabled = false;

    // запуск таймера
    timerBtnStart = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor(); /* інлайновий стиль */
    }, 1000);
});

btnStop.addEventListener('click', () => {
    btnStop.disabled = true;
    clearInterval(timerBtnStart); /* зупинення таймера */
    btnStart.disabled = false; /* включення кнопки "Start" */
    
})


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
