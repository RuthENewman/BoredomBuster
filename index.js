const boredURLBase = "https://www.boredapi.com/api/activity?participants="
const displayActivityDiv = document.querySelector('.displayActivity');
const submitButton = document.getElementById('submitButton');
const numberInput = document.getElementById('numberInput');

function getActivity(number) {
  displayActivityDiv.style.display = "block";
  displayActivityDiv.innerHTML = '<p class="loadingMessage">Choosing an activity for you...</p>'
  fetch(`${boredURLBase}${number}`)
    .then(response => response.json())
    .then(data => {
      let floatPrice = parseFloat(data.price);
      displayActivityDiv.innerHTML = `
      <p id="activityName">${data.activity}</p>
      <p id="activityType">Type: ${data.type}</p>
      <p id="activityParticipants">Ideal for: ${data.participants} participants</p>
      <p id="priceScale">Price: ${setPrice(floatPrice)}</p>
      `;
    })

}

function setPrice(priceScaleNumber) {
  let priceRange = [];
  let priceLoop = priceScaleNumber * 10
  for(let i = 0; i < priceLoop; i++) {
    priceRange.push("£");
  }
  if (priceRange.join("") == "") {
    return "free"
  }
  return priceRange.join("");
}

submitButton.addEventListener('click', event => {
  event.preventDefault();
  getActivity(numberInput.value);
})
