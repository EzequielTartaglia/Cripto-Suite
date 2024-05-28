   const url = 'https://raw.githubusercontent.com/EzequielTartaglia/Cripto-Suite/main/Json/developer_info.json';

   fetch(url, {
     mode: 'cors', 
     cache: 'no-cache',
     credentials: 'same-origin', 
     headers: {
       'Content-Type': 'application/json'
     }
   })
   .then(response => {
     if (!response.ok) {
       throw new Error('Network response was not ok');
     }
     return response.json();
   })
   .then(data => {
     const footer = document.getElementById('footer');
     footer.innerHTML = `
       <div class="credit"> Crypto Suite&#174; | Developed by <span class="credito"><a href="${data.linkedin}" target="_blank">${data.name}</a></span> | All rights reserved 2023&copy;</div>
     `;
   })
   .catch(error => console.error('Error loading JSON:', error));