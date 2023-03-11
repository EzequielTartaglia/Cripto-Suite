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
async function getDollarCryptoValue() {
  const response = await fetch(`${url}?${new URLSearchParams(paramsARS)}`);
  const data = await response.json();
  const usdToArs = data.find((cryptoCoin) => cryptoCoin.id === "usd-coin").current_price;
  return usdToArs;
}
fetch(`${url}?${new URLSearchParams(paramsUSD)}`)
  .then((response) => response.json())
  .then((data) => {
    //Get the html container to the data
    const cryptoList = document.getElementById("crypto-list");
    //Create a card for each crypto
    data.forEach((cryptoCoin) => {
      const htmlStructure = `
      <li class="crypto-card" id="${cryptoCoin.name}">
        <img src="${cryptoCoin.image}" alt="${cryptoCoin.name} icon" class="crypto-icon">
        <span class="crypto-name">${cryptoCoin.name}</span>
        <span class="crypto-price"  data-price="${cryptoCoin.current_price}">${cryptoCoin.current_price} USD</span>
        <span class="crypto-price"  style="display:none"">${cryptoCoin.current_price} </span>
        <div>
        <button class="crypto-button crypto-btn">ARS Price</button>
        </div>
      </li>
          `;
      cryptoList.innerHTML += htmlStructure;
    });
    //Create the element to manipulate in the HTML (crypto-card from api)
    const cards = document.querySelectorAll(".crypto-card");
    //Create the element to manipulate in the HTML (crypto-button from api)
    const buttons = document.getElementsByClassName("crypto-button");

    //Function for each button (More details)
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", () => {
        cards.forEach(async (card) => {
          //The card selected when click
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

            // Convert USD to ARS
            const usdPrice = parseFloat(clickedCardPrice.replace(" USD", ""));
            const arsPrice = usdPrice * parseInt(await getDollarCryptoValue()).toFixed(2);

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
              // show all cards again
              cards.forEach((card) => {
                card.style.display = "block";
              });
            });
          }
          //For the other cards
          else {
            card.style.display = "block";
          }
        });
      });
    }
    /* --------------------------- Switch coins filters  --------------------- */
    
    function getDollarCryptoValue() {
      return fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
        .then((res) => res.json())
        .then((data) => {
          return data.bpi.USD.rate_float;
        });
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
        const priceUSD = parseFloat(card.querySelector(".crypto-price").dataset.price);
        card.querySelector(".crypto-price").textContent = `${priceUSD.toFixed(2)} USD`;
      });
    }
    
    function convertAllToARS() {
      const cards = document.querySelectorAll(".crypto-card");
      cards.forEach(async (card) => {
        changeButtonToUSD(card);
        const priceUSD = parseFloat(card.querySelector(".crypto-price").dataset.price);
        const priceARS = (priceUSD * await getDollarCryptoValue()).toFixed(2);
        card.querySelector(".crypto-price").textContent = `${priceARS} ARS`;
        changeButtonToOpened(card);
      });
    }
    
    const convertToARSbtn = document.getElementById("convertToARS-btn");
    convertToARSbtn.addEventListener("click", convertAllToARS);
    
    const convertToUSDbtn = document.getElementById("refresh-btn");
    convertToUSDbtn.addEventListener("click", convertAllToUSD);
    
    const cryptoCards = document.querySelectorAll(".crypto-card");
    cryptoCards.forEach((card) => {
      card.addEventListener("click", () => {
        const details = card.querySelector(".crypto-details");
        details.classList.toggle("crypto-details-opened");
      });
    });
    
    /* --------------------------- Switch coins filters  --------------------- */

        /* ----------------------------------------------------------------- */
    //Search bar
    function searchCrypto(value) {
      const searchValue = value.toLowerCase();

      cards.forEach((card) => {
        const title = card
          .querySelector(".crypto-name")
          .textContent.toLowerCase();
          
        if (title.includes(searchValue)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      
        card.addEventListener("click", () => {
          searchBar.value = ""; 
          searchCrypto(searchBar.value);
        });
      
      });
    }

    // Add event listener to search bar
    const searchBar = document.getElementById("search-bar");
    searchBar.addEventListener("input", (e) => {
      searchCrypto(e.target.value);
    });
    /* ----------------------------------------------------------------- */

  })
  .catch((error) => {
    console.error(error);
  });
