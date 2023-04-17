// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const delayInput = document.querySelector('input[name="delay"]');
const stepInput = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');
const submitBtn = document.querySelector('button[type="submit"]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

submitBtn.addEventListener('click', (evt) => {
  evt.preventDefault();

  submitBtn.disabled = true;

  /* буде отримуватися значення з введених полів форми */
const delayValue = parseInt(delayInput.value);
const stepValue = parseInt(stepInput.value);
const amountValue = parseInt(amountInput.value);

for (let i = 0; i < amountValue; i += 1) {
  const position = i + 1;
  const delay = delayValue + i * stepValue;
  createPromise(position, delay)
    .then(() => {

      Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(() => {
      Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
    })
    .finally(() => {
      form.reset();
      submitBtn.disabled = false;
    })
};
});