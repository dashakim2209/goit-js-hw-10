import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const PromiseField = document.querySelector('.form');

const promiseFn = event => {
  event.preventDefault();
  const DelayField = Number(event.target.elements.delay.value);
  const StateField = event.target.elements.state.value;
  createPromise(DelayField, StateField);
};

PromiseField.addEventListener('submit', promiseFn);

const createPromise = (delay, state) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(result => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${result}ms`,
        position: 'topRight',
      });
    })
    .catch(error => {
      iziToast.error({
        message: `❌ Rejected promise in ${error}ms`,
        position: 'topRight',
      });
    });
};
