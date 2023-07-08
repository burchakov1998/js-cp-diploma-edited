let Request = 'event=update';
document.addEventListener('DOMContentLoaded', ()=>{
    let dayNumber = document.querySelectorAll('.page-nav__day-number');
    let dayWeek = document.querySelectorAll('.page-nav__day-week');
    let dayWeekList = ['Пн','Вт','Ср','Чт','Пт','Cб','Вс']
    let today = new Date();
    today.setHours(0,0,0);
    for (let i = 0; i<dayNumber.length; i++){
        let day = new Date(today.getTime()+ (i * 24 * 60 * 60 * 1000));
        let timestamp = math.trunc(day/1000);
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
})