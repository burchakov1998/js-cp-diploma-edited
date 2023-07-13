
let selectSeance = JSON.parse(sessionStorage.selectSeance);
let bodyRequest =
    // `event=get_hallConfig&timestamp=${selectSeance.seanceTimeStamp}&hallId=${selectSeance.hallId}&seanceId=${selectSeanse.seanceId}`;
    `event=update_hall_config
&timestamp=${selectSeance.seanceTime}
&hallId=${selectSeance.hall_id}
&seanceId=${selectSeance.seance_id}`;
document.addEventListener('DOMContentLoaded', () => {
    let buttonAcceptin = document.querySelector('.acceptin-button');
    let buyinginfoTitle = document.querySelector('.buying__info-title');
    let buyingInfoStart = document.querySelector('.buying__info_start');
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
        let chairs = Array.from(document.querySelectorAll('.conf-step__row.conf-step__chair'));
        buttonAcceptin.setAttribute('disabled', true);
        chairs.forEach(chair => {
            chair.addEventListener('click', (Event) => {


                if (Event.target.classList.contains('conf-step__chair_taken')) {
                    return;
                }
                Event.target.classList.toggle('conf-step__chair_selected');
                let chairSelected =
                 Array.from(document.querySelectorAll('.conf-step__row.conf-step__chair_selected'));
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
            for (let n = 0; n < spanPlaces.length; n++) {
                let typePlace = (spanPlaces[n].classList.contains('conf-step__chair_standart')) ? 'standart' : 'vip';
                selectedPlaces.push({
                    'row': i + 1,
                    'place': n + 1,
                    'type': typePlace,
                })
            }
        }

        let configurationHall = document.querySelector('.conf-step__wrapper').innerHTML;
        selectSeance.hallConfig = configurationHall;
        selectSeance.spanPlaces = selectedPlaces;
        sessionStorage.setItem('selectSeance', JSON.stringify(selectSeance));
        window.location.href = 'payment.html'
    })
})