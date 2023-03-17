let events = [];

const traerData = async () => {
    await fetch('https://mindhub-xj03.onrender.com/api/amazing')
        .then(response => response.json())
        .then(json => {
            renderStats(json.events)
            renderStats2(json.events)
            renderStats3(json.events)
        });
};
traerData();

// PRIMER TABLA ASISTENCIA//
const renderStats = (events) => {
    // Eventos con el porcentaje de asistencia calculado.
    const eventsPercentage = events.map((evento) => {
        return { // Crea copia del objeto para agregar una propiedad sin modificarlo
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

// SEGUNDA TABLA PAST //
const renderStats2 = (events) => {
    const categories = {};
    const currentDate = new Date(); // Obtiene la fecha actual
    // Agrupa por categoría para calcular ingresos y porcentaje de asistencia
    events.forEach((evento) => {
        const eventDate = new Date(evento.date); // Obtiene la fecha del evento
        if (eventDate < currentDate) { // Compara la fecha del evento con la actual
            if (evento.category in categories) {
                // Usa [] para acceder a la propiedad del objeto evento.category
                categories[evento.category].revenue += evento.price * evento.assistance;
                categories[evento.category].attendance += evento.assistance;
                categories[evento.category].capacity += evento.capacity;
                // Agrega el ingreso de cada evento a la categoría que corresponde
                categories[evento.category].totalRevenue += evento.price * evento.assistance; 
            } else {
                categories[evento.category] = {
                    revenue: evento.price * evento.assistance,
                    attendance: evento.assistance,
                    capacity: evento.capacity,
                    // Inicializa el total de ingresos de la categoría con el ingreso del primer evento
                    totalRevenue: evento.price * evento.assistance, 
                };
            }
        }
    });
    
    const StatsTable2 = document.getElementById("table-Category2");
    let rows = [];
    let totalRevenue = 0;
    for (const category in categories) {
        const revenue = categories[category].revenue;
        totalRevenue += revenue;
        const attendancePercentage = (categories[category].attendance / categories[category].capacity) * 100;
        const row = `<tr><td>${category}</td><td>$${revenue.toFixed(2)}</td><td>${attendancePercentage.toFixed(2)}%</td></tr>`;
        rows.push(row);
    }
    // Muestra las columnas
    StatsTable2.innerHTML = rows.join("");
}

// TERCERA TABLA UPCOMING //
const renderStats3 = (events) => {
    const categories = {};
    const currentDate = new Date(); // Obtiene la fecha actual
    // Agrupa por categoría para calcular ingresos y porcentaje de asistencia
    events.forEach((evento) => {
        const eventDate = new Date(evento.date); // Obtiene la fecha del evento
        if (eventDate > currentDate) { // Compara la fecha del evento con la actual
            if (evento.category in categories) {
                // Usa [] para acceder a la propiedad del objeto evento.category
                categories[evento.category].revenue += evento.price * evento.estimate;
                categories[evento.category].attendance += evento.estimate;
                categories[evento.category].capacity += evento.capacity;
                // Agrega el ingreso de cada evento a la categoría que corresponde
                categories[evento.category].totalRevenue += evento.price * evento.estimate; 
            } else {
                categories[evento.category] = {
                    revenue: evento.price * evento.estimate,
                    estimate: evento.estimate,
                    capacity: evento.capacity,
                    // Inicializa el total de ingresos de la categoría con el ingreso del primer evento
                    totalRevenue: evento.price * evento.estimate, 
                };
            }
        }
    });
    
    const StatsTable3 = document.getElementById("table-Category3");
    let rows = [];
    let totalRevenue = 0;
    for (const category in categories) {
        const revenue = categories[category].revenue;
        totalRevenue += revenue;
        const estimatePercentage = (categories[category].estimate / categories[category].capacity) * 100;
        const row = `
        <tr><td>${category}</td>
        <td>$${revenue.toFixed(2)}</td>
        <td>${estimatePercentage.toFixed(2)}%</td>
        </tr>`;
        rows.push(row);
    }
    // Muestra las columnas
    StatsTable3.innerHTML = rows.join("");
}
