//Get the information from the Api and manipulate that
const url = "https://api.coingecko.com/api/v3/coins/markets";
const paramsUSD = {
  vs_currency: "usd",
  order: "market_cap_desc",
  per_page: "1000",
  page: "1",
  sparkline: "false",
};
const paramsARS = {
  vs_currency: "ars",
  order: "market_cap_desc",
  per_page: "1000",
  page: "1",
  sparkline: "false",
};
//Get the element from HTML
const cryptoListHTML = document.getElementById("crypto-list");
//Array empty to manipulate the api data
let cryptoCoinsArray = [];

async function getDollarCryptoValue() {
  const response = await fetch(`${url}?${new URLSearchParams(paramsARS)}`);
  const data = await response.json();
  const usdToArs = data.find(
    (cryptoCoin) => cryptoCoin.id === "usd-coin"
  ).current_price;
  return usdToArs;
}

function createCryptoCard(cryptoCoin) {
  const card = document.createElement('li');
  card.id = cryptoCoin.name;
  card.className = 'crypto-card';
  card.innerHTML = `
    <img src="${cryptoCoin.image}" alt="${cryptoCoin.name} icon" class="crypto-icon">
    <span class="crypto-name">${cryptoCoin.name}</span>
    <span class="crypto-price" data-price="${cryptoCoin.current_price}">${cryptoCoin.current_price} USD</span>
    <div>
      <button class="crypto-button crypto-btn">ARS Price</button>
    </div>
  `;
  cryptoListHTML.appendChild(card);
}

function loadCryptoData(data) {
  data.forEach((cryptoCoin) => {
    cryptoCoinsArray.push(
      new CryptoCoin(
        cryptoCoin.name,
        cryptoCoin.image,
        cryptoCoin.current_price
      )
    );
    localStorage.setItem("cryptoCoinsArray", JSON.stringify(cryptoCoinsArray));
    createCryptoCard(cryptoCoin);
  });
  addEventListenersToButtons();
}

function addEventListenersToButtons() {
  const cards = document.querySelectorAll(".crypto-card");
  const buttons = document.getElementsByClassName("crypto-button");

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", () => {
      cards.forEach(async (card) => {
        if (card.id === buttons[i].parentNode.parentNode.id) {
          const clickedCard = document.getElementById(
            buttons[i].parentNode.parentNode.id
          );

          const clickedCardName =
            clickedCard.querySelector(".crypto-name").textContent;
          const clickedCardPrice =
            clickedCard.querySelector(".crypto-price").textContent;
          const clickedCardImg =
            clickedCard.querySelector(".crypto-icon").src;

          const usdPrice = parseFloat(clickedCardPrice.replace(" USD", ""));
          const arsPrice = Math.round(
            usdPrice * parseFloat(await getDollarCryptoValue())
          );
          clickedCard.style.display = "block";
          clickedCard.innerHTML = `
            <li id="${clickedCardName} class="crypto-card ">
              <img src="${clickedCardImg}" alt="${clickedCardName} icon" class="crypto-icon">
              <span class="crypto-name">${clickedCardName}</span>
              <span class="crypto-price">${arsPrice} ARS</span>
              <div>
                <button class="crypto-button crypto-btn crypto-button-dissabled" style=" pointer-events: none;">Opened</button>
              </div>
            </li>`;

          const closeButton = clickedCard.querySelector(".crypto-button");

          closeButton.addEventListener("click", () => {
            clickedCard.style.display = "none";
            cards.forEach((card) => {
              card.style.display = "block";
            });
          });
        } else {
          card.style.display = "block";
        }
      });
    });
  }
}

function changeButtonToOpened(card) {
  const button = card.querySelector(".crypto-button");
  button.classList.add("crypto-button-dissabled");
  button.textContent = "Opened";
  button.style.pointerEvents = "none";
}

function changeButtonToUSD(card) {
  const button = card.querySelector(".crypto-button");
  button.classList.remove("crypto-button-dissabled");
  button.textContent = "ARS Price";
  button.style.pointerEvents = "auto";
}

function convertAllToUSD() {
  const cards = document.querySelectorAll(".crypto-card");
  cards.forEach(async (card) => {
    changeButtonToUSD(card);
    const priceUSD = parseFloat(
      card.querySelector(".crypto-price").dataset.price
    );
    card.querySelector(".crypto-price").textContent = `${priceUSD} USD`;

    location.reload();
  });
}

async function convertAllToARS() {
  const cards = document.querySelectorAll(".crypto-card");
  for (let card of cards) {
    let priceE
