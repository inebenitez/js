
let parametro = new URLSearchParams(location.search);
let evento = data.events.find(evento => evento._id == parametro.get("id"));

let container = document.querySelector(".tarjeta")
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
        <P>Assistance: ${evento.assistance}</p>
        <p>Price: $${evento.price}</p>
    </div>
</div></div>`
