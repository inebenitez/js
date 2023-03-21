let parametro = new URLSearchParams(location.search);
let container = document.querySelector(".tarjeta")
container.innerHTML = '<div class="cargando row justify-content-center aling-items-center p-4"><p>Cargando...</p></div>';

fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(data => {
        let evento = data.events.find(evento => evento._id == parametro.get("id"));
        container.innerHTML = `<div class="contenido">
    <div class="ladoIzq">
        <img src="${evento.image}" alt="${evento.name}"/>
    </div>
    <div class="ladoDer text-center">
        <h2 class="titulo">${evento.name}</h2>
        <div class="cuerpo text-center">
            <p>Date: ${evento.date}</p>
            <p>Description: ${evento.description}</p>
            <p>Category: ${evento.category}</p>
            <p>Place: ${evento.place}</p>
            <p>capacity: ${evento.capacity}</p>
            <p>${evento.assistance ? `Assistance: ${evento.assistance}` : ''}
            ${evento.estimate ? `Estimate: ${evento.estimate}`: ''}</p>
            <p>Price: $${evento.price}</p>
        </div>
    </div>
    </div>`
    })
