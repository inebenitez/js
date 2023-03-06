let card = document.getElementById("details-tarjeta");

const events = data.events;
const parametro = new URLSearchParams(window.location.search);
const x = events.find(x => x._id == parametro.get('evento'));

function mostrarDetails() {
    const details = events.map((x) => {
        return `<div class="contenido">
    <div class="ladoIzq">
        <img src="${x.image}" alt="${x.name}"/>
    </div>
    <div class="ladoDer text-center">
        <h2 class="titulo">${x.name}</h2>
        <div class="cuerpo text-center">
            <p>Date: ${x.date}</p>
            <p>Description: ${x.description}</p>
            <p>Category: ${x.category}</p>
            <p>Place: ${x.place}</p>
            <p>capacity: ${x.capacity}</p>
            <P>Assistance: ${x.assistance}</p>
            <p>Price: $${x.price}</p>
        </div>
    </div>
</div>`;
    }).join('');
    card.innerHTML = details;
}
mostrarDetails(x)
