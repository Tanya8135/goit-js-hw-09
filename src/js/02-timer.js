import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateTimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysTimer = document.querySelector('[data-days]');
const hoursTimer = document.querySelector('[data-hours]');
const minutesTimer = document.querySelector('[data-minutes]');
const secondsTimer = document.querySelector('[data-seconds]');

startBtn.disabled = true;
let timerInterval; /* зміна для збереження ідентифікатора інтервалу таймера. 
                      Використовується для функції startTimer, яка знаходиться в convertMs(ms) */

const options = { /* опція з бібліотеки */
    enableTime: true, /* включает выбор времени */
    time_24hr: true, /* Отображает средство выбора времени в 24-часовом режиме без 
                        выбора AM/PM, если включено. */
    defaultDate: new Date(), /* Устанавливает начальную выбранную дату (даты).
    Если вы используете mode: "multiple"или диапазонный календарь, укажите Arrayобъекты Dateили массив строк даты, которые следуют за вашим файлом dateFormat.
    В противном случае вы можете указать один объект Date или строку даты. */
    minuteIncrement: 1, /* Регулирует шаг ввода минут (включая прокрутку) */
    onClose(selectedDates) { /* Функция(и) для запуска при каждом закрытии календаря */
        console.log(selectedDates[0].getTime()); /* массив объектов Date, выбранных пользователем. Когда даты не выбраны, массив пуст */

        // якщо час більше за defaultDate тоді активується кнопка
        if (selectedDates[0].getTime() - options.defaultDate.getTime() > 0) {
            startBtn.disabled = false;
        } else { /* якщо час меньше за defaultDate деактивується кнопка */
            startBtn.disabled = true; /* деактування кнопки */
            Notify.failure('Please choose a date in the future'); /* використання опції з бібліотеки */
        }
    },
};

flatpickr(dateTimePicker, options);

/* Для підрахунку значень використовуй готову функцію convertMs, де ms - 
різниця між кінцевою і поточною датою в мілісекундах. */
function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    /* конвертація часу */
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    // додавання нуля, тобно відображення 01, а не 1
    const formattedDays = addLeadingZero(days);
    const formattedHours = addLeadingZero(hours);
    const formattedMinutes = addLeadingZero(minutes);
    const formattedSeconds = addLeadingZero(seconds);
    // що до чого повертається
    return { days: formattedDays, hours: formattedHours, minutes: formattedMinutes, seconds: formattedSeconds };
}

function addLeadingZero(value) { /* функція для додавання "0" */
    return value.toString().padStart(2, '0');
}

function startTimer() {
    const selectedDate = dateTimePicker.value; /* Отримуємо вибрану користувачем дату */
    const selectedTimestamp = new Date(selectedDate).getTime(); /* конвертуємо дату у відповідний таймстемп */
    const currentTimestamp = new Date().getTime(); /* отримуємо поточний таймстемп */
    const timeDifference = selectedTimestamp - currentTimestamp; /* обчислюємо різницю в часі між вибраною датою і поточним часом в мілісекундах */

    // зупинка таймера коли дойде до 00:00
    if (timeDifference <= 0) {
        stopTimer();
        return;
    }

    /* Викликаємо функцію convertMs(ms) і отримуємо об'єкт з розрахунком днів, годин, хвилин та секунд */
    const { days, hours, minutes, seconds } = convertMs(timeDifference);

    /* Встановлюємо значення відповідних таймерів на сторінці */
    daysTimer.textContent = days;
    hoursTimer.textContent = hours;
    minutesTimer.textContent = minutes;
    secondsTimer.textContent = seconds;
}

function stopTimer() { /* ф-ія відповідає за зупинку таймера */
    clearInterval(timerInterval)
}

function onBtnClick() {
    // Очищення попереднього інтервалу
    stopTimer();

    // Запуск нового інтервалу
    timerInterval = setInterval(startTimer, 1000); // Оновлюватиме таймер кожну секунду

    // Заборона кліку на кнопку під час роботи таймера
    startBtn.disabled = true;
}

startBtn.addEventListener('click', onBtnClick);