// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
    //sets variable for current day and sets that day to be the header of the page
    var today = dayjs();
    var currentHour = today.format('H');
    $('#currentDay').text(today.format('MMM D, YYYY'));
    $('.btn').on('click',function() {
        var newEvent = $(this).siblings('.description').val()
        var newEventTime = $(this).parent().attr('id')
        localStorage.setItem(newEventTime, newEvent) 
    })
    for(i=0;i<=23;i++){
        var listedTime = $('.root').children().eq(i).attr('id');
        if(currentHour > listedTime){
            $('.root').children().eq(i).attr('class', 'row time-block past')
            $('.root').children().eq(i).attr('time', 'past')
        }else if(listedTime === currentHour){
            $('.root').children().eq(i).attr('class', 'row time-block present')
            $('.root').children().eq(i).attr('time', 'present')
        }else if(currentHour < listedTime){
            $('.root').children().eq(i).attr('class', 'row time-block future')
            $('.root').children().eq(i).attr('time', 'future')
        }
    }
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    for(i = 9;i <= 17 ;i++){ 
        var scheduledEvent = localStorage.getItem(i);
        if($('.root').children().eq(i).prop('past')){
            $('.root').children().eq((i-9)).children().eq(1).val('Event has passed')
        }else{
            $('.root').children().eq((i-9)).children().eq(1).val(scheduledEvent)
        }
            
    }
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
  });

  