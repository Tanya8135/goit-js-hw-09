// color switcher
const btnStart = document.querySelector("[data-start]");
const btnStop = document.querySelector("[data-stop]");
let timerBtnStart;

btnStart.addEventListener('click', () => {
// вимкнення кнопки (робимо неауктивну використовуючи disabled)
btnStart.disabled = true;
// запуск таймера
timerBtnStart = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor(); /* інлайновий стиль */
}, 1000);
});

btnStop.addEventListener('click', () => {
    btnStart.disabled = false; /* включення кнопки "Start" */
    clearInterval(timerBtnStart); /* зупинення таймера */
})


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
