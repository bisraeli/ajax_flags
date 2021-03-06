var pointer = 0;
var template = null;

function populateCountries() {
  var numberToFetch = $("#step-input").val();
  $.ajax({
    type: 'GET',
    url: '/countries',
    data: {start: pointer, limit: numberToFetch}
  }).success(renderCountries);
}

function renderCountries(countries) {
  pointer = countries.length + pointer;
  var contentDiv = $('#content');
  for(var i = 0; i< countries.length; i++){
    var html = template(countries[i].data);
    contentDiv.append(html);
  }
}

function populateAll() {
}

// Create the event bindings
$(document).ready(function() {
  var source   = $("#country-template").html();
  template = Handlebars.compile(source);
  // Demonstrates using a function name as the event handler instead of including the function inside (like we're used to seeing)
  // This is useful when re-binding events (certain events are unbound when clicking on the various buttons)
  $('#populate-button').click(populateCountries);
  $('#all-button').click(allButtonClick);
  $('#reset-button').click(function() {
    // this function resets the button and scroll bindings, and sets pointer to 0
    pointer = 0;
    $('#content').html('');
    $(window).unbind('scroll').scroll(scrollFunction);
    $('#populate-button').unbind('click').click(populateCountries);
    $('#all-button').unbind('click').click(allButtonClick);
  });

  $(window).scroll(scrollFunction);

  function scrollFunction() {
    var win = $(window);
    // Infinite scroll math!
    if(win.height() + win.scrollTop() >= $(document).height()) {
      populateCountries();
    }
  }

  // Disables other buttons and scroll event so we don't get duplicate data
  // This serves as a demonstration; we could also just set pointer = false
  function allButtonClick() {
    $(window).unbind('scroll');
    $('#populate-button').unbind('click');
    $('#all-button').unbind('click');
    populateAll();
  }

});
