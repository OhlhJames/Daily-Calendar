/* Wraps all code that interacts with the DOM in a call to jQuery to ensure that
the code isn't run until the browser has finished rendering all the elements
 in the html. */
$(function () {
    //sets variable for current day and sets that day to be the header of the page
    var today = dayjs();
    $('#currentDay').text(today.format('MMM D, YYYY'));
    //Adds functioanlity to the save button so that events can be added to the calender
    $('.btn').on('click',function() {
        $('.confirmSave').text('Saved to LocalStorage ✅')
        var newEvent = $(this).siblings('.description').val()
        var newEventTime = $(this).parent().attr('id')
        localStorage.setItem(newEventTime, newEvent) 
    })
    //iterates over the calender to check if each time is past present or future and sets an appropriate class so that css can style it accordingly
    for(i=0;i<=8;i++){
        var listedTime = $('.root').children().eq(i).attr('id');
        var currentHour = today.format('H');
        listedTime = parseInt(listedTime)
        currentHour = parseInt(currentHour)
        if(currentHour < listedTime){
            $('.root').children().eq(i).attr('class', 'row time-block future')
            $('.root').children().eq(i).attr('data-time', 'future')
        } 
        if(listedTime === currentHour){
            $('.root').children().eq(i).attr('class', 'row time-block present')
            $('.root').children().eq(i).attr('data-time', 'present')
        }
        if (currentHour > listedTime) {
            $('.root').children().eq(i).attr('class', 'row time-block past')
            $('.root').children().eq(i).attr('data-time', 'past')
        }
    }
    //iterates over each hour to check for saved events and then populates those events
    //also changes events that happened in the past to "This event has passed"
    for(i = 0;i <= 8 ;i++){ 
        var timeJump = (i+9)
        var scheduledEvent = localStorage.getItem(timeJump);
        var element = $('.root').children().eq(i);
        var timeChecker = element.data('time') 
        if( timeChecker === 'past' && scheduledEvent != null ){
            $('.root').children().eq(i).children().eq(1).val('This event has passed')
        }else{
            $('.root').children().eq(i).children().eq(1).val(scheduledEvent)
        }
            
    }
  });

  