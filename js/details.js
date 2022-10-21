
    let captur = location.search
    let cap= new URLSearchParams(captur)
    let otherId = parseInt(cap.get("id")) //convierto a un entero
    console.log(otherId)
    let element = events.find((element) => element._id === otherId)
    
    let detailsC = document.getElementById("details")

   detailsC.innerHTML = `
   <div class="card mb-3  " style="max-width: 800px; height: 402px;" >
    <div class="row g-0  ">
    <div class="col-md-6 " >
      <img src="${element.image}" class="img-fluid rounded-start" alt="${element.name}"  style="height: 25rem;">
    </div>
    <div class="col-md-6 ">
      <div class="card-body  d-flex  flex-column align-items-center fs-5 text-white" style="background-color: #550053;  height: 400px;">
        <h2 class="card-title d-flex justify-content-md-center">${element.name}</h2>
        <p class="card-text d-flex d-flex align-items-end ">${element.description} </p>
        <p>Date: ${element.date}</p>
        <p> Category : ${element.category}</p>
        <p>Place: ${element.place}</p>
        <p>Capacity: ${element.capacity}</p>
        <p> Assistance: ${element.assistance || element.estimate} </p>
        <p>Price: ${element.price}</p>
      </div>
    </div>
  </div>
  </div>
    `
