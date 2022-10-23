let contenedorGeneral = document.getElementById("containerD");
let searchs = document.getElementById("search");
let check = document.getElementById("check");

function addCards(array) {
  array.forEach((element) => {
    contenedorGeneral.innerHTML += `
      <div class="col-md-1  pb-5  container-fluid "  style="width: 20rem; background-color: #ffccfe; "  >
        <div class="card" style="background-color: #550053; " >
            <img src="${element.image}"
                height="171"
                 alt="${element.name}" >
                <div class="card-body" >
                  <h4 class= "d-flex justify-content-md-center 
                 rounded-5" style="background-color: #ffccfe; color: #550053; " >${element.category}</h4> 
                 <h5 class="card-title text-white" >${element.name}</h5>
                  <p class="card-text text-white" style="height:4rem">${element.description}</p>
                  <div  class="d-flex justify-content-between">
                    <p class="text-white">$${element.price}</p>
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                  <a href = "./details.html?id=${element._id}" class="btn   btn btn-outline-dark" type="button" style="background-color: #ffccfe;">View More</a>
                   </div>
                </div>
                </div>
              </div>
            </div>
   
            `;
  });
}

function buscarTexto(texto, arrayDatos) {
  let arrayFiltr = arrayDatos.filter((element) =>
    element.name.toLowerCase().includes(texto.toLowerCase())
  );
  return arrayFiltr;
}

function printCheck(arrayCheck) {
  arrayCheck.forEach((element) => {
    check.innerHTML += `
        <div class="form-check form-switch  ps-5">
        <input class="form-check-input" type="checkbox"  value= "${element}" role="switch" id="${element}" style="background-color:  #550053">
      <label class="form-check-label" for="${element}">${element}</label>
      </div>
        `;
  });
}

function filtradoPorCategoria(arrayD) {
  let checkboxes = document.querySelectorAll("input[type = 'checkbox']");
  let arrayChecks = Array.from(checkboxes);
  let checksAzules = arrayChecks.filter((check) => check.checked);
  let categories = checksAzules.map((checkAzul) => checkAzul.value);
  if (categories.length > 0) {
    let arrayFiltrado = arrayD.filter((element) =>
      categories.includes(element.category)
    );
    return arrayFiltrado;
  }
  return arrayD;
}

async function capture() {
  try {
    let api = await fetch(`https://mind-hub.up.railway.app/amazing`);
    let data = await api.json();
    let events = data.events;
    console.log(events);
    let currentDate = data.date;
    let upcoming = events.filter((event) => event.date > currentDate);
    console.log(upcoming);

    addCards(upcoming);

    let newEve = new Set(events.map((evento) => evento.category));
    newEve = [...newEve];

    printCheck(newEve);

    searchs.addEventListener(`input`, () => {
      contenedorGeneral.innerHTML = "";
      let arrayPorCategoria = filtradoPorCategoria(upcoming);
      let arrayPorTexto = buscarTexto(search.value, arrayPorCategoria);
      addCards(arrayPorTexto);
    });

    check.addEventListener("change", () => {
      contenedorGeneral.innerHTML = "";
      let arrayTexto = buscarTexto(search.value, upcoming);
      let arrayChecked = filtradoPorCategoria(arrayTexto);
      addCards(arrayChecked);
    });
  } catch (error) {
    console.log("hubo en error y no te pude mandar nada");
  }
}

capture();
