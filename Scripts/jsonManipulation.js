fetch('/Json/developer_info.json')
        .then(response => response.json())
        .then(data => {
          const footer = document.getElementById('footer');
          footer.innerHTML = `
            <div class="credit"> Crypto Suite&#174; | Developed by <span class="credito"><a href="${data.linkedin}" target="_blank">${data.name}</a></span> | All rights reserved 2023&copy;</div>
          `;
        })
        .catch(error => console.error('Error loading JSON:', error));