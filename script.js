daysTag = document.querySelector(".days");
currentDate = document.querySelector(".current-date"),
currentDay = document.querySelector(".current-day"),
prevNextIcon = document.querySelectorAll(".icons span");
eventE = document.querySelector(".event");
Nevent = document.querySelector(".new-event");
eventName = document.querySelector(".t-event");


// getting new date, current year and month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

var events = {
    "1/11/2024":"event 1"
};

//full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

//make the clicked dated the selected date
var clickE = function(event) {
    var clickedElement = event.target;
    sel = document.querySelector('.select');
    if(sel !== null){
        sel.classList.remove('select');
    }

    if(!clickedElement.classList.contains('inactive')){
        var day = clickedElement.innerText;
        currentDay.innerText = `${currMonth+1}/${day}/${currYear}`;
        var sd = currMonth+1 +"/" + day+"/"+currYear;
        if (Object.keys(events).includes(sd)) {
            eventE.innerHTML = `<p>${events[sd]}</p>`;
        } else {
            eventE.innerHTML = '<p class="no-event">no any events yet.</p>';
        }   
    }
    
    clickedElement.classList.add('select');
};

var Newevent = function(event) {
    var clickedElement = event.target;
    console.log(currentDay.innerText);
    events[currentDay.innerText] = eventName.value;
    eventE.innerHTML = `<p>${eventName.value}</p>`;
    
};

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";
    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }
    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday = "";
        if(i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear()){
            isToday = "today";
        }
        
        liTag += `<li class="${isToday}">${i}</li>`;
    }
    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;
    days =daysTag.querySelectorAll('li');
    for (var i = 0; i < days.length; i++) {// click event to every day
        days[i].addEventListener('click', clickE , false);
    };
}
renderCalendar();

prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
        if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
    });
});
Nevent.addEventListener('click', Newevent , false);



