let selectSeance = JSON.parse(sessionStorage.selectSeance);

document.addEventListener('DOMContentLoaded', function(){
    let places = '';
    let price = 0;
    selectSeance.salesPlaces.array.forEach(salePlace => {
        if(places){
            places += ',';
        }
        places += `${salePlace.row}/${salePlace.place}`
        price += salePlace.type === 'standart' ? Number(selectSeance.priceStandart) : Number(selectSeance.priceVip);

    });
    document.querySelector('.ticket__title').innerHTML = selectSeance.filmName;
    document.querySelector('.ticket__chairs').innerHTML = places;
    document.querySelector('.ticket__hall').innerHTML = selectSeance.hallName;
    document.querySelector('.ticket__start').innerHTML = selectSeance.seanceTime;

    let date = new Date(Number(selectSeance.seanceTime * 1000));
    let dateStr = date.toLocaleDateString('ru-Ru', {day: '2-digit', month: '2-digit', year: 'numeric'});
    let textQR = `
    Фильм: ${selectSeance.filmName}
    Зал: ${selectSeance.hallName}
    Ряд/Место: ${places}
    Дата: ${dateStr}
    Начало сеанса: ${selectSeance.seanceTime}
    Билет действителен строго на свой сеанс
    `
    let qrcode = QRCreator(textQR, {image: "SVG"});
    qrcode.download();
    document.querySelector('.ticket__info-qr').append(qrcode.result);
})