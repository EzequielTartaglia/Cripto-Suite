//Structure Class
class CryptoCoin {
    constructor(name,image,current_price){
      this.name = name,
      this.image = image,
      this.current_price = current_price
    }
  
  }
//Render structure (HTML)
  function createCryptoCard(cryptoCoinObject) {
    const HTML_STRUCTURE = `
      <li class="crypto-card" id="${cryptoCoinObject.name}">
        <img src="${cryptoCoinObject.image}" alt="${cryptoCoinObject.name} icon" class="crypto-icon">
        <span class="crypto-name">${cryptoCoinObject.name}</span>
        <span class="crypto-price"  data-price="${cryptoCoinObject.current_price}">${cryptoCoinObject.current_price} USD</span>
        <span class="crypto-price"  style="display:none"">${Math.round(cryptoCoinObject.current_price)} </span>
        <div>
          <button class="crypto-button crypto-btn">ARS Price</button>
        </div>
      </li>
    `;
    cryptoListHTML.innerHTML += HTML_STRUCTURE;
  }
  