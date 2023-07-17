let Request = 'event=update';
document.addEventListener('DOMContentLoaded', () => {
    let dayNumber = document.querySelectorAll('.page-nav__day-number');
    let dayWeek = document.querySelectorAll('.page-nav__day-week');
    let dayWeekList = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Cб',]
    let today = new Date();
    today.setHours(0, 0, 0);
    for (let i = 0; i < dayNumber.length; i++) {
        let day = new Date(today.getTime() + (i * 24 * 60 * 60 * 1000));
        let timestamp = Math.trunc(day / 1000);
        dayNumber[i].innerHTML = `${day.getDate()}`;
        dayWeek[i].innerHTML = `${dayWeekList[day.getDay()]}`;
        let link = dayNumber[i].parentNode
        link.dataset.timestamp = timestamp;
        if ((dayWeek[i].innerHTML == 'Сб') || (dayWeek[i].innerHTML == 'Вс')) {
            link.classList.add('page-nav__day_weekend');
        }
        else {
            link.classList.remove('page-nav__day_weekend')
        }
    }

    getRequest(Request , (response) => {
            let object = {};
            object.seances = response.seances.result;
            object.films = response.films.result;
            object.halls = response.halls.result;
            object.halls = object.halls.filter(hall => hall.hall_open == 1);
            let main = document.querySelector('main');
            object.films.forEach((film) => {
                let seancesHTML = '';
                let filmId = film.film_id;

                object.halls.forEach((hall) => {
                    let seances = object.seances.filter(seance => 
                        ((seance.seance_hallid == hall.hall_id) &&
                        (seance.seance_filmid == filmId)));
                    if (seances.length > 0) {
                        seancesHTML += `
                <div class = 'movie-seances__hall'>
                <h3 class='movie-seances__hall-title'>${hall.hall_name}</h3>
                <ul class='movie-seances__list'>`
                        seances.forEach(seances => seancesHTML +=
                            `<li class='movie-seances__time-block'>
                <a class='movie-seances__time' href='hall.html' 
                data-film-name=${film.film_name}
                data-film-id=${film.film_id} 
                data-hall-id=${hall.hall_id} 
                data-hall-name='${hall.hall_name}'
                data-price-vip = '${hall.hall_price_vip}'
                 data-price-standart ='${hall.hall_price_standart}' 
                 data-seance-id='${seances.seance_id}'
                  date-seance-start = '${seances.seance_start}'
                data-seance-time='${seances.seance_time}'>${seances.seance_time}<a/></li>`)
                        seancesHTML += `
</ul>
</div>`
                    }
                })

                if (seancesHTML) {
                    main.innerHTML += `
    <section class='movie'>
        <div class= 'movie__info'>
        <div class='movie__poster'>
            <img class ='movie__poster-image' alt = '${film.film_name} постер' 
            src='${film.film_poster}'>
            </div>
            <div class='movie__description'>
            <h2 class='movie__title'>${film.film_name}</h2>
            <p class='movie__synopsis'>${film.film_description}</p>
            <p class= 'movie__data'>
            <span class = 'movie__data-duraction'>${film.film_duration} мин.</span>
            <span class = 'movie__data-origin'>${film.film_origin}</span>
            </p>
            </div>
                </div>
                ${seancesHTML}
                </section>`
                }
            });
            let dayLinks = Array.from(document.querySelectorAll('.page-nav__day'));
            let movieSeances = Array.from(document.querySelectorAll
                ('.movie-seances__time'))
            dayLinks.forEach(dayLink => dayLink.addEventListener('click', (event) => 
            {
                event.preventDefault();

                document.querySelector('.page-nav__day_chosen')
                .classList.remove('page-nav__day_chosen');
                dayLink.classList.add('page-nav__day_chosen');
                let timeStampDay = Number(event.target.dataset.timeStamp)
                if (isNaN(timeStampDay)) {
                    timeStampDay = Number(event.target.closest('.page-nav__day')
                    .dataset.timeStamp);
                }
                movieSeances.forEach(movieSeance => {
                    let timeStampseanceDay = Number(movieSeance.dataset.seanceStart) * 60;
                    let timeStampSeance = timeStampDay + timeStampseanceDay;
                    let timestampNow = Math.trunc(+new Date() / 1000);
                    movieSeance.dataset.seanceTimeStamp = timeStampSeance;
                    // if ((timeStampSeance - timestampNow) > 0) {
                    //     movieSeance.classList.remove('acceptin-button-disabled');
                    // } else {
                    //     movieSeance.classList.add('acceptin-button-disabled');
                    // }
                })
            }))
            dayLinks[0].click();
            movieSeances.forEach(movieSeances => 
                movieSeances.addEventListener('click', (event) => 
                {
                let selectSeance = event.target.dataset;
                selectSeance.hallConfig = object.halls.find(hall => hall.hall_id == selectSeance.hallId).hall_сonfig;
                localStorage.setItem('selectSeance', JSON.stringify(selectSeance))
            }))
        })
})
