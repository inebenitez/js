let card = document.getElementById("card-template");

const cards = data.events.map((x) => {
  return `
    <div class="col card2" id="${x._id}">
      <div class="card h-100">
        <img src="${x.image}" class="card-img-top" style="width:100% ; height:15vw ; object-fit:cover;" alt="...">
        <div class="card-body  d-flex flex-column">
          <h5 class="card-title text-center">${x.name}</h5>
          <div class="p-3">
          <p class="card-text text-center">Date: ${x.date}</p>
          <p class="card-text text-center">Place: ${x.place}</p>
          </div>
        </div>
        <div class="card-footer d-flex justify-content-between">
          <span p-1>Price: $${x.price}</span>
          <a href="#" class="btn btn-primary btn-dark align-self-end mt-auto stretched-link">Ver mas</a>
          </footer>
        </div>
      </div>
    </div>
  `;
}).join('');

card.innerHTML = cards

//Búsqueda
const searchInput = document.getElementById('search');
const searchButton = document.getElementById('boton');
let busqueda = '';

function filterCards() {
  const cardElements = document.querySelectorAll('.card2');
  cardElements.forEach(kard => {
    console.log(kard)
    const title = kard.querySelector('h5').innerText.toLowerCase();
    const description = kard.querySelector('p').innerText.toLowerCase();
    if (title.includes(busqueda) || description.includes(busqueda)) {
      kard.style.display = 'block';
    } else {
      kard.style.display = 'none';
    }
  });
}
searchButton.addEventListener('click', (e) => {
  busqueda = searchInput.value.toLowerCase()
  console.log(busqueda)
  filterCards()
});
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault
    filterCards()
  }
});

let categoria = document.getElementById("categoria");

const categoriasUnicas = {};
const categoriasHTML = [];

data.events.forEach((evento) => {
  const categoria = evento.category;
  if (!categoriasUnicas[categoria]) {
    categoriasUnicas[categoria] = true;
    categoriasHTML.push(
      `<div class="input-group-text">
        <label class="checkbox-inline">
          <input type="checkbox" id="${evento._id}" value=""> ${categoria}
        </label>
      </div>`
    );
  }
});
categoria.innerHTML = categoriasHTML.join("");
