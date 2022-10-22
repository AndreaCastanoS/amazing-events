console.log(events);

let contenedorGeneral = document.getElementById("containerD");
let searchs = document.getElementById("search");
let check = document.getElementById("check");

function addCards(array) {
  array.forEach(element => {
  contenedorGeneral.innerHTML += `
    <div class="col-md-1  pb-5  container-fluid "  style="width: 20rem; background-color: #ffccfe; "  >
      <div class="card" style="background-color: #550053; " >
          <img src="${element.image}"
              height="171"
               alt="${element.name}" >
              <div class="card-body" >
                <h4 class= "d-flex justify-content-md-center  rounded-5" style="background-color: #ffccfe; color: #550053; " >${element.category}</h4> 
                <h5 class="card-title text-white" >${element.name}</h5>
                <p class="card-text text-white" style="height:4rem">${element.description}</p>
                <div  class="d-flex justify-content-between">
                  <p class="text-white"> $${element.price}</p>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <a href = "./details.html?id=${element._id}" class="btn   btn btn-outline-dark" type="button" style="background-color: #ffccfe;">View More</a>
                 </div>
              </div>
              </div>
            </div>
          </div>
          `
         })
      }

      addCards(events)

      searchs.addEventListener(`input`, (event) => {
        contenedorGeneral.innerHTML = ""
        let arrayPorTexto = buscarTexto(event.target.value, events)
        addCards(arrayPorTexto)
      }); 


      function buscarTexto(texto, arrayDatos){
        let arrayFiltr = arrayDatos.filter(element => element.name.toLowerCase().
        includes(texto.toLowerCase()))
        return arrayFiltr;
      }

      let newEve = new Set(events.map((evento) => evento.category));
      newEve = [...newEve]; 

      function printCheck(arrayCheck) {
       arrayCheck.forEach(element => {
        check.innerHTML += `
        <div class="form-check form-switch  ps-5">
        <input class="form-check-input" type="checkbox"  value= "${element}" role="switch" id="${element}" style="background-color:  #550053">
      <label class="form-check-label" for="${element}">${element}</label>
      </div>
        `;
      })
      }

      printCheck(newEve )

      check.addEventListener("change", () => {
        contenedorGeneral.innerHTML = "";
      })


    function addCheck(){

    }








/* function optimize(data, fn) {
  data.forEach(fn);
}

let getEven = {
  //creo este objeto para ir guardando la lista de filtro que se han ido aplicando y derivarselo a la funcion que filtre y el resultado gurdarlo en la variable actual de valores
}; //
function filter(fn, value) {
  let eve = events; // consulto la lista de eventos
  getEven[fn] = value; // todos los filtros que se haya usado en anteirores veces, los guardo en el objeto getEvent ,
  for (let name in getEven) {
    // Recorro toda la lista de  filtro . Por cada filtro que este en la lista de filtros aplicados decido
    if (name == `filtrado`) {
      let checkboxC = [];
      // si el nombre de la funcion es igual a  'filtrado'
      eve = eve.filter((element) =>
      element.category.toLowerCase().includes(getEven[name].toLowerCase())
      ); //ejecuta este filtro, verificando si la categoria incluye de este filtro getEven[name]
      checkboxC = checkboxC.concat(eve)
      console.log(checkboxC);
    }
    console.log(getEven)
    if (name == `filtrar`) {
      eve = eve.filter((element) =>
        element.name.toLowerCase().includes(getEven[name].toLowerCase())
      );
    }
   /*  if(){

    } */
 /*  }
  return eve; */
//} // si se aplico este filtro  voy hacer otra busqueda tomando el valor que tenga definido para esa busqueda

// 1. Creo el escuchador de eventos, que el evento sea un input(ingreso por teclado) 2. Vacio el contenedor donde estan mis cards 3.filtro y hago la comparacion en el filtro 4. creo un nuevo for each donde recorro la variable del filtro

/* searchs.addEventListener(`input`, (event) => {
  console.log(event.target.value);
  contenedorGeneral.innerHTML = "";

  let escribir= filter(`filtrar`, event.target.value);

  optimize(escribir, addCards);
}); */

// _____CHECKBOX__________-
// 1. Creo un set para eliminar las categorias repetidas y a su vez en este voy mapeando sobre cada una de ellas
//2. creo una copia del set

/* let newEve = new Set(events.map((evento) => evento.category));
newEve = [...newEve]; */

// Creo un funncion para las categorias para imprimirla dinamicamente, y luego las recorro con un for each para imprimirlas , poninendo como array el creado con el set

/* function addCheck(element) {
  check.innerHTML += `
  <div class="form-check form-switch  ps-5">
  <input class="form-check-input" type="checkbox"  value= "${element}" role="switch" id="flexSwitchCheckDefault" style="background-color:  #550053">
<label class="form-check-label" for="flexSwitchCheckDefault">${element}</label>
</div>
  `;
}

newEve.forEach((element) => {
  addCheck(element);
}); */

//Creo un eventos partiendo como base con unn array vacio donde almacenare lo filtrado,poninendo como parametro el evento el "change", creo un if que imprima cuando los checkbox este en true y la categoria del checkbox coincida con la categoria de las card se almacene en el array vacio para posteeriormente imprimirlas

/* check.addEventListener("change", (event) => {
  contenedorGeneral.innerHTML = "";
  if (event.target.checked) {
   eve = filter(`filtrado`, event.target.value);
    

    optimize(checkboxC, addCards); */

    // Anido dos if dentro de un else, uno que pregunte si la longitud de los check es mayor a cero me filtre del array los elementos que sea diferentes la categoria del value del check.
    // el segundo if pregunto si la longitud es igual de mi array es igual a cero entonces imprimo nuevamente todas mis card
 /*  } else {
    if (checkboxC.length > 0) {
      checkboxC = checkboxC.filter(
        (element) =>
          element.category.toLowerCase() !== event.target.value.toLowerCase()
      );

      optimize(checkboxC, addCards);
    }

    if (checkboxC.length === 0) {
      optimize(events, addCards);
    }
  }
}); 
 */