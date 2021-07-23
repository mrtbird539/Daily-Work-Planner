
let currentDay = [
    {
        id: "0",
        hour: "09",
        time: "09",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "1",
        hour: "10",
        time: "10",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "2",
        hour: "11",
        time: "11",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "3",
        hour: "12",
        time: "12",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "4",
        hour: "1",
        time: "13",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "5",
        hour: "2",
        time: "14",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "6",
        hour: "3",
        time: "15",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "7",
        hour: "4",
        time: "16",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "8",
        hour: "5",
        time: "17",
        meridiem: "pm",
        reminder: ""
    },
]
function getJumboDate() {
    const currentDate = moment().format('dddd, MMMM Do');
    $("#currentDay").text(currentDate);
}

// saves data to localStorage
function saveReminders() {
    localStorage.setItem("currentDay", JSON.stringify(currentDay));
}

// displays any localStorage
function displayReminders() {
    currentDay.forEach(function (_thisHour) {
        $(`#${_thisHour.id}`).val(_thisHour.reminder);
    })
}

// pulls any existing localStorage
function init() {
    let storedDay = JSON.parse(localStorage.getItem("currentDay"));

    if (storedDay) {
        currentDay = storedDay;
    }

    saveReminders();
    displayReminders();
}


// creates the visuals for the scheduler body
currentDay.forEach(function(thisHour) {
    // creates timeblocks row
    const hourRow = $("<form>").addClass("row");
    $(".container").append(hourRow);
    
    // creates time of day blocks
    var hourBlock = $("<div>")
    .text(`${thisHour.hour}${thisHour.meridiem}`)
    .addClass("col-2 hour");
    
    // creates main body
    const hourInput = $("<div>")
    .addClass("col-9 description p-0");

    const planInput = $("<textarea>");
    hourInput.append(planInput);
    planInput.attr("id", thisHour.id);
    if (thisHour.time < moment().format("HH")) {
        planInput.addClass("past text") ;
    } else if (thisHour.time === moment().format("HH")) {
        planInput.addClass("present text");
    } else if (thisHour.time > moment().format("HH")) {
        planInput.addClass("future text")
    }
    
    // creates save button
    let saveButton = $("<i class='far fa-save fa-md'></i>")
    let savePlan = $("<button>").addClass("col-1 saveBtn")
    savePlan.append(saveButton);
    hourRow.append(hourBlock, hourInput, savePlan);
})

// loads any existing localstorage data after components created
init();

// loads jumbotron date
getJumboDate();


// saves data to be used in localStorage
$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    let saveIndex = $(this).siblings(".description").children(".text").attr("id");
    currentDay[saveIndex].reminder = $(this).siblings(".description").children(".text").val();
    saveReminders();
    displayReminders();
})