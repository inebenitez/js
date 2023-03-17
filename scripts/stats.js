let events = [];

const traerData = async () => {
    await fetch('https://mindhub-xj03.onrender.com/api/amazing')
        .then(response => response.json())
        .then(json => {
            renderStats(json.events)
            renderStats2(json.events)
        });
};
traerData();

//Primer Tabla//
const renderStats = (events) => {
    // Eventos con el porcentaje de asistencia calculado.
    const eventsPercentage = events.map((evento) => {
        return { // crea copia del objeto para agregar una propiedad sin modificarlo
            ...evento, aPercent: (evento.assistance / evento.capacity) * 100,
        };
    });
    // Busca el evento con el porcentaje de asistencia más alto y más bajo
    const { maxEvent, minEvent } = eventsPercentage.reduce((acc, evento) => {
        if (acc.maxEvent == null || evento.aPercent > acc.maxEvent.aPercent) {
            acc.maxEvent = evento;
        }
        if (acc.minEvent == null || evento.aPercent < acc.minEvent.aPercent) {
            acc.minEvent = evento;
        }
        return acc;
    }, { maxEvent: null, minAttendanceEvent: null });

    // Muestra en la tabla
    const StatsTable = document.getElementById('table-Category');
    const rows = [
        `<tr><td>${maxEvent.name} - ${maxEvent.aPercent.toFixed(3)}%</td></tr>`, //toFixed para decimales
        `<tr><td>${minEvent.name} - ${minEvent.aPercent.toFixed(3)}%</td></tr>`,
        `<tr><td>${events.reduce((prev, current) => (prev.capacity > current.capacity) ? prev : current).name} - ${events.reduce((prev, current) => (prev.capacity > current.capacity) ? prev : current).capacity}</td></tr>`
    ];
    StatsTable.innerHTML = rows.join('');
};

// Filtros
const StatsEvents = (data, filtrofecha) => {
    let eventspastbydate = [];
    if (filtrofecha === 'upcoming') {
        eventspastbydate = data.events.filter(evento => evento.date > data.currentDate);
    } else if (filtrofecha === 'past') {
        eventspastbydate = data.events.filter(evento => evento.date < data.currentDate);
    }
    return eventspastbydate;
}

// Llamada a la función StatsEvents para obtener los eventos pasados
const pastEvents = StatsEvents({ events: events, currentDate: new Date() }, 'past');


//Segunda Tabla//
const renderStats2 = (events) => {
    const categories = {};

    // Agrupar eventos por categoría para calcular ingresos y porcentaje de asistencia
    events.forEach((evento) => {
        if (evento.category in categories) {
            categories[evento.category].revenue += evento.price;
            categories[evento.category].attendance += evento.assistance;
            categories[evento.category].capacity += evento.capacity;
        } else {
            categories[evento.category] = {
                revenue: evento.price,
                attendance: evento.assistance,
                capacity: evento.capacity,
            };
        }
    });

    const StatsTable2 = document.getElementById("table-Category2");
    let rows = [];

    for (const category in categories) {
        const revenue = categories[category].revenue;
        const attendancePercentage =
            (categories[category].attendance / categories[category].capacity) * 100;
        const row = `<tr><td>${category}</td><td>$${revenue.toFixed(2)}</td><td>${attendancePercentage.toFixed(2)}%</td></tr>`;
        rows.push(row);
    }

    StatsTable2.innerHTML = rows.join(""); // Usar corchetes y join en lugar de paréntesis
};

