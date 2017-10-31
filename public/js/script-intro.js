"use strict";


$(document).ready(function() {
 var userid = data.userid;

   $('#survey_nextWelcome').click(function() {
    postEvent('Clicked "Start Welcome"', null);
		start();
	});
	
	$('#consentbutton').click(function() {
    postEvent('Clicked "Start Consent"', null);
    }); 
	// Make sure client wants leave
  $(window).on('beforeunload', function() {
    if(confirmUnload)
      return 'We would really appreciate it if you could complete this survey for our course project.'
            + ' You can also come back to complete it later on from where you left.';
  });

  $(window).unload(function() {
    postEvent('Closed connection', null);
  });
});

/**
 * Update choice number and reload to start.
 */
function start() {
  $.ajax({
    type: 'POST',
    url: '/api/update/choicenumber',
    data: {
      userid: userid
    },
    dataType: 'json',
    success: function() {
      confirmUnload = false;
      location.reload(true);
    },
    error: function(err) {
      console.log(err.responseText);
    }
  });
}

/**
 * Log any events on the backend.
 */
function postEvent(event, eventdesc) {
  $.ajax({
    type: 'POST',
    url: '/api/update/event',
    data: {
      userid: userid,
      event: event,
      eventdesc: eventdesc
    },
    dataType: 'json',
    error: function(err) {
      console.log(err.responseText);
    }
  });
}
