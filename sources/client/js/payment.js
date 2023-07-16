let selectSeance = JSON.parse(localStorage.getItem('selectSeance'));
let places ='';
let price = 0;
selectSeance.salesPlaces.array.forEach(salePlace => {
    if(places){
        places +=',';
    }
    places +=`${salePlace.row}/${salePlace.place}`;
    price += salePlace.type === 'standart'? Number(selectSeance.priceStandart): Number(selectSeance.priceVip);

});
document.querySelector('.ticket__title').innerHTML = selectSeance.filmName;
document.querySelector('.ticket__chairs').innerHTML = places;
document.querySelector('.ticket__hall').innerHTML = selectSeance.HallName;
document.querySelector('.ticket__start').innerHTML = selectSeance.seanceTime;
document.querySelector('.ticket__cost').innerHTML = price;

let newHallConfig = selectSeance.hallConfig.replace(/selected/g, 'taken');
console.log(newHallConfig);
let bodyRequest = `event=sale_add
&timeStamp=${selectSeance.seanceTimeStamp}
&hallId=${selectSeance.hallId}
&seanceId=${selectSeance.seanceId}
&hallConfiguration=${newHallConfig}`;

document.querySelector('.acceptin-button').addEventListener('click',(Event)=>{
    Event.preventDefault();

let xhr = new XMLHttpRequest();
xhr.open('POST', 'https://jscp-diplom.netoserver.ru/', true);
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.send(bodyRequest);

xhr.onload = function(){
    if(xhr.status !=200){
        alert('Ошибка: ' + xhr.status)
        return;
    }
    window.location.href = 'ticket.html'
}
xhr.onerror = function(){
    alert('Запрос не удался');

}
})