
const form = document.getElementById("car-form");
const titleElement = document.querySelector("#title");
const priceElement = document.querySelector("#price");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-cars");

//UI objesini başlatma

const ui = new UI();
const storage = new Storage();

// tüm eventleri yükleme

eventListeners();

function eventListeners(){
    form.addEventListener("submit", addcar);
    document.addEventListener("DOMContentLoaded",function(){
        let cars = storage.getCarsFromStorage();
        ui.loadAllCars(cars);
    })
    cardBody.addEventListener("click", deleteCar);
    clear.addEventListener("click", clearAllCars);

}

function addcar(e){

    

    const title = titleElement.value;
    const price = priceElement.value;
    const url = urlElement.value;

    if (title === "" || price === "" || url === ""){

        e.preventDefault();


        ui.displayMessages("Tüm alanları doldurunuz...", "danger");

    } else {

        // yeni araç;
       

        const newCar = new Car(title, price, url);

        ui.addCarToUI(newCar);
        storage.addCarToStorage(newCar);
        ui.displayMessages("Araç başarı ile eklendi...", "success");

    }

    ui.clearInputs(titleElement, priceElement, urlElement);

    e.preventDefault();
   
}

function deleteCar(e){
    if(e.target.id === "delete-car"){
        ui.deleteCarFromUI(e.target);
        storage.deleteCarFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        ui.displayMessages("Araç başarılı şekilde silindi...", "success");
    }

}
function clearAllCars(){

    
    if(confirm("Bütün araçlar silinecek, emin misiniz?")){

        ui.clearAllCarsFromUI();
        storage.clearAllCarsFromStorage();

    }



}