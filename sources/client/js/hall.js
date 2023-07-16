
let selectSeance = JSON.parse(localStorage.getItem('selectSeance'));
// let bodyRequest = `event=get_hallConfig
// &timestamp=${selectSeanse.seanceTimeStamp}
// &hallId=${selectSeanse.hallId}
// &seanceId=
// ${selectSeanse.seanceId}`;

let bodyRequest =`event=get_hallConfig
&timestamp=${selectSeance.seanceTimeStamp}
&hallId=${selectSeance.hallId}
&seanceId=${selectSeance.seanceId}`;
document.addEventListener('DOMContentLoaded', () => {
    let buttonAcceptin = document.querySelector('.acceptin-button');
    let buyinginfoTitle = document.querySelector('.buying__info-title');
    let buyingInfoStart = document.querySelector('.buying__info-start');
    let buyingInfoHall = document.querySelector('.buying__info-hall');
    let priceStandart = document.querySelector('.price-standart');
    let confStepWrapper = document.querySelector('.conf-step__wrapper');

     buyinginfoTitle.innerHTML = selectSeance.filmName;
     buyingInfoStart.innerHTML = `Начало сеанса ${selectSeance.seanceTime}`;
     buyingInfoHall.innerHTML = selectSeance.hallName;
     priceStandart.innerHTML = selectSeance.priceStandart;

    getRequest(bodyRequest, (response) => {
        console.log(response)
        if (response) {
            selectSeance.hallConfig = response;
        }
        confStepWrapper.innerHTML = selectSeance.hallConfig;
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
                if(spanPlaces[n].classList.contains('conf-step__chair_selected')){
                let typePlace = (spanPlaces[n].classList.contains('conf-step__chair_standart')) 
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
        selectSeance.hallConfig = configurationHall;
        selectSeance.spanPlaces = selectedPlaces;
        localStorage.setItem('selectSeance', JSON.stringify(selectSeance));
        window.location.href = 'payment.html'
    })
})