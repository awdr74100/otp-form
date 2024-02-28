import './tailwind.css';

const inputs = [...document.querySelectorAll<HTMLInputElement>('input[type=number]')];
const button = document.querySelector<HTMLButtonElement>('button[type=submit]')!;
const form = document.querySelector<HTMLFormElement>('form')!;

window.addEventListener('load', () => inputs[0].focus());

inputs.forEach((input, outerIndex) => {
  input.addEventListener('keyup', (e) => {
    e.preventDefault();

    const currentInput = input;
    const previousInput = input.previousElementSibling as HTMLInputElement | null;
    const nextInput = input.nextElementSibling as HTMLInputElement | null;

    if (currentInput.value) {
      currentInput.value = currentInput.value.slice(-1);
    }

    if (currentInput.value && nextInput) {
      nextInput.disabled = false;
      nextInput.focus();
    }

    if (e.key === 'Backspace') {
      inputs.forEach((input, innerIndex) => {
        if (innerIndex !== 0 && innerIndex >= outerIndex) {
          input.value = '';
          input.disabled = true;
        }
      });

      if (previousInput) {
        previousInput.focus();
      }
    }

    if (inputs.every((input) => input.value)) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  });
});

inputs[0].addEventListener('paste', (e) => {
  e.preventDefault();

  const pastedValue = e.clipboardData?.getData('text');

  if (!pastedValue) return;

  inputs.forEach((input, index) => {
    if (pastedValue[index]) {
      input.disabled = false;
      input.value = pastedValue[index];
    }else{
      input.disabled = true;
      input.value = '';
    }
  });

  if (pastedValue.length >= inputs.length) {
    inputs[inputs.length - 1].focus();
  } else {
    inputs[pastedValue.length].disabled = false;
    inputs[pastedValue.length].focus();
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const otp = inputs.reduce((arr, cur) => arr + cur.value, '');

  console.log(otp);
});

// const inputs = [...document.querySelectorAll<HTMLInputElement>('input[type=number]')];
// const btn = document.querySelector<HTMLButtonElement>('button[type=submit]')!;
// const form = document.querySelector('form')!;

// window.addEventListener('load', () => inputs[0].focus());

// inputs[0].addEventListener('paste', (e) => {
//   e.preventDefault();

//   const pastedValue = e.clipboardData!.getData('text');

//   for (let i = 0; i < inputs.length; i++) {
//     if (i < pastedValue.length) {
//       inputs[i].value = pastedValue[i];
//       inputs[i].removeAttribute('disabled');
//       inputs[i].focus();
//     }
//   }
// });

// inputs.forEach((input, index1) => {
//   input.addEventListener('keyup', (e) => {
//     const currentInput = input;
//     const prevInput = currentInput.previousElementSibling as HTMLButtonElement;
//     const nextInput = currentInput.nextElementSibling as HTMLButtonElement;

//     if (currentInput.value.length > 1) {
//       currentInput.value = '';
//       return;
//     }

//     if (nextInput && nextInput.hasAttribute('disabled') && currentInput.value !== '') {
//       nextInput.removeAttribute('disabled');
//       nextInput.focus();
//     }

//     if (e.key === 'Backspace') {
//       // clear after all input
//       inputs.forEach((input, index2) => {
//         if (prevInput && index2 >= index1) {
//           input.setAttribute('disabled', 'disabled');
//           input.value = '';
//           prevInput.focus();
//         }
//       });
//     }

//     if (inputs.every((input) => !input.disabled && input.value)) {
//       btn.disabled = false;
//     } else {
//       btn.disabled = true;
//     }
//   });
// });

// form.addEventListener('submit', (e) => {
//   e.preventDefault();

//   const otp = inputs.reduce((arr, cur) => arr + cur.value, '');

//   console.log(otp);
// });
