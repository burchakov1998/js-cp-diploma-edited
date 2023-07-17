<<<<<<< HEAD

let selectSeance = JSON.parse(localStorage.getItem('selectSeance'));
=======
const selectSeanse = JSON.parse(localStorage.selectSeance);
console.log(selectSeanse);
// let selectSeance = JSON.parse(localStorage.selectSeance);
// let bodyRequest = `event=get_hallConfig
// &timestamp=${selectSeanse.seanceTimeStamp}
// &hallId=${selectSeanse.hallId}
// &seanceId=
// ${selectSeanse.seanceId}`;

>>>>>>> 3e5dd85391e2b9c2825c65f856fdaf8408ee4672
let bodyRequest =`event=get_hallConfig
&timestamp=${selectSeanse.seanceTimeStamp}
&hallId=${selectSeanse.hallId}
&seanceId=${selectSeanse.seanceId}`;
document.addEventListener('DOMContentLoaded', () => {
    let buttonAcceptin = document.querySelector('.acceptin-button');
    let buyinginfoTitle = document.querySelector('.buying__info-title');
    let buyingInfoStart = document.querySelector('.buying__info-start');
    let buyingInfoHall = document.querySelector('.buying__info-hall');
    let priceStandart = document.querySelector('.price-standart');
    let confStepWrapper = document.querySelector('.conf-step__wrapper');

     buyinginfoTitle.innerHTML = selectSeanse.filmName;
     buyingInfoStart.innerHTML = `Начало сеанса ${selectSeanse.seanceTime}`;
     buyingInfoHall.innerHTML = selectSeanse.hallName;
     priceStandart.innerHTML = selectSeanse.priceStandart;

    getRequest(bodyRequest, (response) => {
        console.log(response)
        if (response) {
            selectSeanse.hallConfig = response;
        }
        confStepWrapper.innerHTML = selectSeanse.hallConfig;
        let chairs = Array.from(document.querySelectorAll
            ('.conf-step__row .conf-step__chair'));
        buttonAcceptin.setAttribute('disabled', true);

        chairs.forEach(chair => {
            chair.addEventListener('click', (event) => {
                if (event.target.classList.contains('conf-step__chair_taken')) {
                    return;
                }
                event.target.classList.toggle('conf-step__chair_selected');
                let chairSelected =
                 Array.from(document.querySelectorAll
                    ('.conf-step__row .conf-step__chair_selected'));
                if (chairSelected.length > 0) {
                    buttonAcceptin.removeAttribute('disabled');
                }
                else {
                    buttonAcceptin.setAttribute('disabled', true);
                }
            })
        })
    })


    
    buttonAcceptin.addEventListener('click', (Event) => {
        Event.preventDefault()
        let selectedPlaces = Array();
        let rows = Array.from(document.getElementsByClassName('conf-step__row'))
        for (let i = 0; i < rows.length; i++) {
            let spanPlaces = Array.from(rows[i].getElementsByClassName('conf-step__chair'))
            for (let j = 0; j < spanPlaces.length; j++) {
                if(spanPlaces[j].classList.contains('conf-step__chair_selected')){
                let typePlace = (spanPlaces[j].classList.contains('conf-step__chair_standart')) 
                ? 'standart' : 'vip';
                selectedPlaces.push({
                    'row': i + 1,
                    'place': j + 1,
                    'type': typePlace,
                
                })
            }
        }
    }
        let configurationHall = document.querySelector('.conf-step__wrapper').innerHTML;
<<<<<<< HEAD
        selectSeance.hallConfig = configurationHall;
        selectSeance.salesPlaces = selectedPlaces;
        localStorage.getItem('selectSeance', JSON.stringify(selectSeance));
=======
        selectSeanse.hallConfig = configurationHall;
        selectSeanse.spanPlaces = selectedPlaces;
        localStorage.setItem('selectSeance', JSON.stringify(selectSeanse));
>>>>>>> 3e5dd85391e2b9c2825c65f856fdaf8408ee4672
        window.location.href = 'payment.html'
    })
})