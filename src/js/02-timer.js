import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Отримання елементів DOM
const dateTimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysTimer = document.querySelector('[data-days]');
const hoursTimer = document.querySelector('[data-hours]');
const minutesTimer = document.querySelector('[data-minutes]');
const secondsTimer = document.querySelector('[data-seconds]');

startBtn.disabled = true; // Виправлення помилки в назві властивості
let timerInterval;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0].getTime());

        if (selectedDates[0].getTime() - options.defaultDate.getTime() > 0) {
            startBtn.disabled = false;
        } else {
            startBtn.disabled = true;
            Notify.failure('Please choose a date in the future');
        }
    },
};

flatpickr(dateTimePicker, options);

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    /* конвертація часу */
    const days = Math.ceil(ms / day); // змінено Math.floor на Math.ceil
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    const formattedDays = addLeadingZero(days);
    const formattedHours = addLeadingZero(hours);
    const formattedMinutes = addLeadingZero(minutes);
    const formattedSeconds = addLeadingZero(seconds);

    return { days: formattedDays, hours: formattedHours, minutes: formattedMinutes, seconds: formattedSeconds };
}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}

function startTimer() {
    const selectedDate = dateTimePicker.value; /* Отримуємо вибрану користувачем дату без використання formatDate */
    const selectedTimestamp = new Date(selectedDate).getTime(); /* Конвертуємо дату у відповідний таймстемп */
    const currentTimestamp = new Date().getTime(); /* Отримуємо поточний таймстемп */
    const timeDifference = selectedTimestamp - currentTimestamp; /* Обчислюємо різницю в часі між вибраною датою і поточним часом в мілісекундах */

    if (timeDifference <= 0) {
        stopTimer();
        return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference); /* Викликаємо функцію convertMs(ms) і отримуємо об'єкт з розрахунком днів, годин, хвилин та секунд */

    /* Встановлюємо значення відповідних таймерів на сторінці */
    daysTimer.textContent = days;
    hoursTimer.textContent = hours;
    minutesTimer.textContent = minutes;
    secondsTimer.textContent = seconds;
}

function stopTimer() {
    clearInterval(timerInterval)
}

function onBtnClick() {
    // Очищення попереднього інтервалу (якщо він є)
    stopTimer();

    // Запуск нового інтервалу
    timerInterval = setInterval(startTimer, 1000); // Оновлювати таймер кожну секунду

    // Заборона кліку на кнопку під час роботи таймера
    startBtn.disabled = true;
}

startBtn.addEventListener('click', onBtnClick);