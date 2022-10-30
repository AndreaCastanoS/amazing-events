const tableOne = document.getElementById("table1");
const tableTwo = document.getElementById("table2");
const tableThree = document.getElementById("table3");

async function captureEvents() {
  await fetch("https://mh-amazing.herokuapp.com/amazing")
    .then((response) => response.json())
    .then((data) => (dataEvents = data));
  console.log(dataEvents);

  //capturo los eventos de la API
  let getEvents = dataEvents.events;
  console.log(getEvents);

  //filtro los eventos que tienen asistencia (pasados)
  let past = dataEvents.events.filter((event) => event.assistance);

  //filtro los eventos que tienen estimado (futuros)
  let upcoming = dataEvents.events.filter((event) => event.estimate);
  console.log(upcoming);

  /*  getEvents.map(event => {
          event.percentageAssistance = 100 * event.assistance / event.capacity
          event.revenue = event.price * event.assistance
      }) */

  // recorro los eventos del pasado y futuro con un map sacando el porcentaje de asistencia y la ganancia
  past.map((event) => {
    event.percentageAssistance = (100 * event.assistance) / event.capacity;
    event.revenue = parseInt(event.price) * parseInt(event.assistance);
  });

  upcoming.map((event) => {
    event.percentageAssistance = (100 * event.estimate) / event.capacity;
    event.revenue = parseInt(event.price) * parseInt(event.estimate);
  });

  //Creo de mis eventos y les aplico un sort para organizar de menor a mayor capacidad
  let orderEvents = [...getEvents].sort((e1, e2) => e1.capacity - e2.capacity);

  //tomo el ultimo elemento de mi array para sacar el evento con mayor capacidad
  let maxCapacity = orderEvents[orderEvents.length - 1];

  //organizo mis eventos de menor porcentaje de asistencia a mayor porcentaje
  let percentAttend = [...past].sort(
    (a, b) => a.percentageAssistance - b.percentageAssistance
  );

  // capturo el de menor porcentaje de asistencia
  let minPerAttend = percentAttend[0];
  //capturo el evento con mayor porcentaje de asistencia
  let maxPercAttend = percentAttend[percentAttend.length - 1];

  //creo un map dentro de un set capturando las categoria de mi array y eliminando las categorias repetidas con el set
  let filterCategory = new Set(past.map((event) => event.category));
  filterCategory = [...filterCategory];
  console.log(filterCategory);

  let dateCategory = [...new Set(getEvents.map((event) => event.category))];
  let upcomingCategory = [...new Set(upcoming.map((event) => event.category))];

  dateCategory.forEach((element) => {
    let capacity = 0;
    let assistance = 0;
    let revenues = 0;
    past.forEach((event) => {
      if (event.category === element) {
        capacity += event.capacity;
        assistance += event.assistance;
        revenues += event.revenue;
      }
    });
    tableThree.innerHTML += `<tr>
                                  <td class="data_table fst-italic ps-1">${element}</td>
                                  <td class="data_table fst-italic ps-1">${revenues.toLocaleString(
                                    "de-DE"
                                  )}</td>
                                  <td class="data_table fst-italic ps-1">${Math.round(
                                    (assistance * 100) / capacity
                                  )}%</td>
                              </tr>`;
  });

  upcomingCategory.forEach((element) => {
    let capacity = 0;
    let estimate = 0;
    let revenues = 0;
    upcoming.forEach((event) => {
      if (event.category === element) {
        capacity += event.capacity;
        estimate += event.estimate;
        revenues += event.revenue;
      }
    });
    tableTwo.innerHTML += `<tr>
                                  <td class="data_table fst-italic ps-1">${element}</td>
                                  <td class="data_table fst-italic ps-1">${revenues.toLocaleString(
                                    "de-DE"
                                  )}</td>
                                  <td class="data_table fst-italic ps-1">${Math.round(
                                    (estimate * 100) / capacity
                                  )}%</td>
                              </tr>`;
  });

  tableOne.innerHTML += `<tr>
                                  <td class="data_table fst-italic ps-1">${
                                    maxPercAttend.name
                                  }: ${Math.round(
    maxPercAttend.percentageAssistance
  )}%</td>
                                  <td class="data_table fst-italic ps-1">${
                                    minPerAttend.name
                                  }: ${minPerAttend.percentageAssistance}%</td>
                                  <td class="data_table fst-italic ps-1">${
                                    maxCapacity.name
                                  }: ${parseInt(
    maxCapacity.capacity
  ).toLocaleString("de-DE")}</td>
                              </tr>`;
}
captureEvents();
