function filtrarFecha(data) {
  let eventPast = []
  let currentDate = data.currentDate;
  for (evento of data.events) {
    if (currentDate > evento.date) {
      eventPast.push(evento)
    }
  }
  return eventPast
}

function mostrarCards(arr) {
  const cards = arr.map((x) => {
    return `
<div class="col card2" id="${x._id}">
<div class="card h-100">
  <img src="${x.image}" class="card-img-top" style="width:100% ; height:15vw ; object-fit:cover;" alt="...">
  <div class="card-body  d-flex flex-column">
    <h5 class="card-title text-center">${x.name}</h5>
    <div class="p-3">
    <p class="oculto">${x.description}</p>
    <p class="card-text text-center">Date: ${x.date}</p>
    <p class="card-text text-center">Place: ${x.place}</p>
    </div>
  </div>
  <div class="card-footer d-flex justify-content-between">
    <span p-1>Price: $${x.price}</span>
    <a href="/details.html?id=${x._id}" class="btn btn-primary btn-dark align-self-end mt-auto stretched-link">Ver mas</a>
  </div>
</div>
</div>
`
  }).join('');
  card.innerHTML = cards
}

let eventosFiltrados = []

fetch('https://mindhub-xj03.onrender.com/api/amazing')
  .then(response => response.json())
  .then(data => {
  eventosFiltrados = filtrarFecha(data)
  mostrarCards(eventosFiltrados)
  mostrarCategory(eventosFiltrados)
  filtros()
  })

let categoriasFiltradas = [];
let card = document.getElementById("card-template");

//BUSQUEDA
const searchInput = document.getElementById('search');
const searchButton = document.getElementById('boton');
let busqueda = '';

function filterCards() {
  const cardElements = document.querySelectorAll('.card2');
  let count = 0;
  cardElements.forEach(kard => {
    const title = kard.querySelector('h5').innerText.toLowerCase();
    const description = kard.querySelector('p').innerText.toLowerCase();
    if (title.includes(busqueda) || description.includes(busqueda)) {
      kard.style.display = 'block';
      count++;
    } else {
      kard.style.display = 'none';
    }
  });
  if (count === 0) {
    const results =
      `<div class='contenedor p-5 fs-4'><span>No se encontaron resultados</span></div>`
    card.innerHTML = results;
  }
}
searchButton.addEventListener('click', (e) => {
  busqueda = searchInput.value.toLowerCase()
  filterCards()
});
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault
    filterCards()
  }
});
let contenedorCategoria = document.getElementById("categoria");

//CATEGORIA
const categoriasUnicas = {};
const categoriasHTML = [];

function mostrarCategory(events){
events.forEach((evento) => {
  const categoria = evento.category;
  if (!categoriasUnicas[categoria]) {
    categoriasUnicas[categoria] = true;
    categoriasHTML.push(
      `<div class="input-group-text">
        <label class="checkbox-inline">
          <input type="checkbox" id="${evento._id}" value="${evento.category}"> ${categoria}
        </label>
      </div>`
    );
  }
});
contenedorCategoria.innerHTML = categoriasHTML.join("");
}

//CHECKBOX
function filtros(){
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
let categoriasSeleccionadas = [];

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('click', (e) => {
    console.log(e);
    if (e.target.checked && !categoriasSeleccionadas.includes(e.target.value)) {
      categoriasSeleccionadas.push(e.target.value);
    } else if (categoriasSeleccionadas.includes(e.target.value)) {
      const catIndex = categoriasSeleccionadas.findIndex(cat => cat === e.target.value);
      categoriasSeleccionadas.splice(catIndex, 1);
    }
    categoriasFiltradas = [];
    categoriasSeleccionadas.forEach(ctg => {
      console.log(categoriasSeleccionadas);
      eventosFiltrados.forEach(evento => {
        if (evento.category === ctg) {
          categoriasFiltradas.push(evento);
        }
      });
    });
    if (categoriasFiltradas.length > 0) {
      console.log(categoriasFiltradas);
      mostrarCards(categoriasFiltradas);
    } else {
      mostrarCards(eventosFiltrados);
    } if (searchInput.value !== '') filterCards()
  });
});
}