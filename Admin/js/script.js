const tarrifName = document.querySelector('.tarrifName');
const licenseCount = document.querySelector('.license-count');
const trackCount = document.querySelector('.track-count');
const tarrifSumm = document.querySelector('.tariff-summ');
let indexDelleteItem = null; //здесь мы храним индекс удаляемого элемента

//Функция для открытия модального окна
function modal(modalWindow){
    document.querySelector(modalWindow).style.display = 'flex';
}

//Функция для закрытия модального окна
function closeModal(){
    tarrifName.value = "";
    licenseCount.value = "";
    trackCount.value = "";
    tarrifSumm.value = "";
    document.querySelectorAll('.modal-window')
    .forEach((close) =>{
        close.style.display = 'none';
    });
}

const tarrifsTable = document.querySelector('.tarrifs-table tbody');
let tarrifs = [
    {
        tarrifName: "Базовый",
        license: "1",
        trackCount: "1",
        price: "10000"
    },
    {
        tarrifName: "Продвинутый", 
        license: "3",
        trackCount: "10",
        price: "18000"
    }
];

function tarrifAdd(){
    if(tarrifName.value && licenseCount.value && trackCount.value && tarrifSumm.value){
        tarrifs.push({tarrifName: tarrifName.value, license: licenseCount.value, trackCount: trackCount.value, price: tarrifSumm.value});
        tarrifName.value = "";
        licenseCount.value = "";
        trackCount.value = "";
        tarrifSumm.value = "";
        closeModal();
        renderList();
    }else{
        alert("Заполните все поля!");
    }
}

function renderList(){
    tarrifsTable.innerHTML = "";
    tarrifs.forEach((tarrifsObject, index)=>{
        const tableTr = document.createElement("tr");
        tableTr.innerHTML = `
            <td>${tarrifsObject.tarrifName}</td>
            <td>${tarrifsObject.license}</td>
            <td>${tarrifsObject.trackCount}</td>
            <td>${tarrifsObject.price}т</td>
            <td>
                <button title="Редактировать" class="tariff-edit" data-index="${index}">
                    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="34" height="34" rx="5" fill="#FFC702"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M22.204 15.7959L24 13.9999C24.5453 13.4547 24.8179 13.1821 24.9636 12.888C25.2409 12.3284 25.2409 11.6715 24.9636 11.1119C24.8179 10.8178 24.5453 10.5452 24 9.99994C23.4548 9.45469 23.1821 9.18207 22.888 9.03633C22.3285 8.75905 21.6715 8.75905 21.112 9.03633C20.8179 9.18207 20.5453 9.45469 20 9.99994L18.1814 11.8186C19.1452 13.4692 20.5314 14.8448 22.204 15.7959ZM16.7269 13.2731L9.8564 20.1436C9.43134 20.5686 9.21881 20.7812 9.07907 21.0422C8.93934 21.3033 8.88039 21.5981 8.7625 22.1875L8.1471 25.2645C8.08058 25.5971 8.04732 25.7634 8.14193 25.858C8.23654 25.9526 8.40284 25.9194 8.73545 25.8529L11.8124 25.2375C12.4019 25.1196 12.6966 25.0606 12.9577 24.9209C13.2188 24.7812 13.4313 24.5686 13.8564 24.1436L20.7458 17.2542C19.1241 16.2385 17.7524 14.8762 16.7269 13.2731Z" fill="#333333"/>
                    </svg>     
                </button>
                <button title="Удалить" class="tariff-delette" data-index="${index}">
                    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="34" height="34" rx="5" fill="#FF5C16"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M26 11H8V14C9.10457 14 10 14.8954 10 16V20C10 22.8284 10 24.2426 10.8787 25.1213C11.7574 26 13.1716 26 16 26H18C20.8284 26 22.2426 26 23.1213 25.1213C24 24.2426 24 22.8284 24 20V16C24 14.8954 24.8954 14 26 14V11ZM15.5 16C15.5 15.4477 15.0523 15 14.5 15C13.9477 15 13.5 15.4477 13.5 16V21C13.5 21.5523 13.9477 22 14.5 22C15.0523 22 15.5 21.5523 15.5 21V16ZM20.5 16C20.5 15.4477 20.0523 15 19.5 15C18.9477 15 18.5 15.4477 18.5 16V21C18.5 21.5523 18.9477 22 19.5 22C20.0523 22 20.5 21.5523 20.5 21V16Z" fill="#FAFAFA"/>
                        <path d="M15.0681 8.37059C15.1821 8.26427 15.4332 8.17033 15.7825 8.10332C16.1318 8.03632 16.5597 8 17 8C17.4403 8 17.8682 8.03632 18.2175 8.10332C18.5668 8.17033 18.8179 8.26427 18.9319 8.37059" stroke="#FAFAFA" stroke-width="2" stroke-linecap="round"/>
                    </svg>  
                </button>
            </td>
        `
        tarrifsTable.appendChild(tableTr);
    });
    deleteTarif();
    editTarif();
}


function editTarif(){
    document.querySelectorAll(".tariff-edit").forEach((editButton) =>{
        editButton.addEventListener('click', (e)=>{
            const targetButton = e.target.closest('.tariff-edit');
            if (targetButton) {
                // Получаем индекс из атрибута data-index
                indexDelleteItem = parseInt(targetButton.dataset.index, 10);

                // Открываем модальное окно
                modal('.modal-tariff-edit');
            }
        });
    });
}






//вызываем эту функцию при нажатии на кнопку удалить у списка тарифов
//она открывает модальное окно подтверждения и заполучает индекс элемента на который кликнули
function deleteTarif(){
    document.querySelectorAll('.tariff-delette').forEach((deletteButton)=>{
        deletteButton.addEventListener('click', (e)=>{
            const targetButton = e.target.closest('.tariff-delette');
            if (targetButton) {
                // Получаем индекс из атрибута data-index
                indexDelleteItem = parseInt(targetButton.dataset.index, 10);

                // Открываем модальное окно
                modal('.modal-tariff-delette');
            }
        }); 
    });   
}

// Подтверждение удаления
document.getElementById("confirm-delete").addEventListener("click", () => {
    if (indexDelleteItem !== null) {
      // Удаляем элемент из массива
      tarrifs.splice(indexDelleteItem, 1);
  
      // Перерисовываем список
      renderList();
  
      // Сбрасываем индекс
      indexDelleteItem = null;
  
      // Скрываем модальное окно
      closeModal();
    }
});
renderList();




