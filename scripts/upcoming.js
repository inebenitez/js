let currentDate = data.currentDate

function filtrarFecha(eventos) {
  let eventNext = []
  for (evento of eventos) {
    if (currentDate < evento.date) {
      eventNext.push(evento)
    }
  }
  return eventNext
}


console.log(filtrarFecha(data.events))
//aplico la funcion de filtrar, esta funcion me devuelve el array con los 7 items
eventosFiltrados = filtrarFecha(data.events);


let card = document.getElementById("card-template");

//antes estaba recorriendo todos los eventos, ahora solo voy a recorrer los que la funcion encontró y posteriormente guarde en mi variable.

const cards = eventosFiltrados.map((x) => { return `
  <div class="col" id="${x._id}">
    <div class="card h-100">
    <img src="${x.image}" class="card-img-top" style="width:100% ; height:15vw ; object-fit:cover;"
      alt="...">
    <div class="card-body  d-flex flex-column">
      <h5 class="card-title text-center">${x.name}</h5>
      <p class="card-text text-wrap">${x.description}</p>
    </div>
    <div class="card-footer d-flex justify-content-between">
      <span p-1>Price: $${x.price}</span>
      <a href="#" class="btn btn-primary btn-dark align-self-end mt-auto stretched-link">Ver mas</a>
      </footer>
    </div>
    </div>
  </div>
`
}).join('');

card.innerHTML  = cards