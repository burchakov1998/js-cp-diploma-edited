let Request = 'event=update';
document.addEventListener('DOMContentLoaded', ()=>{
    let dayNumber = document.querySelectorAll('.page-nav__day-number');
    let dayWeek = document.querySelectorAll('.page-nav__day-week');
    let dayWeekList = ['Пн','Вт','Ср','Чт','Пт','Cб','Вс']
    let today = new Date();
    today.setHours(0,0,0);
    for (let i = 0; i<dayNumber.length; i++){
        let day = new Date(today.getTime()+ (i * 24 * 60 * 60 * 1000));
        let timestamp = Math.trunc(day/1000);
        dayNumber[i].innerHTML = `${day.getDate()}`;
        dayWeek[i].innerHTML = `${dayWeekList[day.getDay()]}`;
        let link = dayNumber[i].parentNode
        link.dataset.timestamp = timestamp;
        if((dayWeek[i].innerHTML === 'Вс')|| (dayWeek[i].innerHTML == 'Сб')){
            link.classList.add('page-nav__day_weekend');
        }
        else {
            link.classList.remove('page-nav__day_weekend')
        }
    }
})
getRequest(Request,(Response)=>{
    let object = {};
    object.seances = Response.seances.result;
    object.films = Response.films.result;
    object.halls = Response.halls.result;
    object.halls = object.halls.filter(hall => hall.hall_open == 1);
    let main = document.querySelector('main');
    object.films.array.forEach(film => {
        let seancesHTML = '';
        let filmId = film.film_id;
        
        object.halls.forEach(hall => {
            let seances = object.seances.filter(seance => ((seance.seance_hallid = hall.hall_id)&&(seance.seance_filmid == filmId)));
            if (seances.length > 0){
                seancesHTML += `
                <div class = 'movie-seances__hall'>
                <h3 class='movie-seances__hall-title'>${hall.hall_name}</h3>
                <ul class='movie-seances__list'>`
                seances.forEach(seances => seancesHTML += `<li class='movie-seances__time-block'>
                <a class='movie-seances__time' href='hall.html' 
                data-film-name=${film.film_name}
                data-film-id=${film.film_id} 
                data-hall-id=${hall.hall_id} 
                data-hall-name='${hall.hall_name}'
                data-price-vip = '${hall.hall_price_vip}'
                 data-price-standart ='${hall.hall_price_standart}' 
                 data-seance-id='${seances.seance_id}'
                 date-seance-start = '${seances.seance_start}'

                 `)
            
                }
        })
    });
})
