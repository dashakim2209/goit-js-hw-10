import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = null;

const StartButton = document.querySelector('button[data-start]');
StartButton.disabled = true;
const TimePicker = document.querySelector('#datetime-picker');

const Days = document.querySelector('[data-days]');
const Hours = document.querySelector('[data-hours]');
const Minutes = document.querySelector('[data-minutes]');
const Seconds = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const SelectedDate = selectedDates[0];

    if (SelectedDate <= new Date().getTime()) {
      iziToast.warning({
        title: 'Warning',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
    } else {
      userSelectedDate = SelectedDate;
      StartButton.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

const TimerWorks = () => {
  StartButton.disabled = true;

  const SetInterval = setInterval(() => {
    const CurrentTime = new Date();
    const DifferenceInTime = userSelectedDate - CurrentTime.getTime();

    if (DifferenceInTime <= 0) {
      TimePicker.disabled = false;
      clearInterval(SetInterval);
      updateTimerDisplay(0);
      return;
    }
    updateTimerDisplay(DifferenceInTime);
  }, 1000);
};

StartButton.addEventListener('click', TimerWorks);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimerDisplay(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);

  Days.textContent = addLeadingZero(days);
  Hours.textContent = addLeadingZero(hours);
  Minutes.textContent = addLeadingZero(minutes);
  Seconds.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
