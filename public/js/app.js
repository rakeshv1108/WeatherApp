

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;
  messageOne.style.color = '#000000';
  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.err) {
          messageOne.textContent = data.err;
          messageOne.style.color = '#ff0000';
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecastMessage;
        }
      });
    }
  );
});
