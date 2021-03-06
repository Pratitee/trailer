"use strict";
var nrOfMovies = $('.movieslist li').length;
var learnRate = "0,7";
var discardRate = "0,5";
var maxChoices = 10;
var diversification = '0,7';
var userid = data.userid;
var choiceNumber = data.choiceNumber;
var movies = JSON.parse(data.movies);
var player, useTrailers = data.useTrailers, currentTrailer = null;
var timer, delay = 1000;

$(document).ready(function() {
  // Update the remaining number of choices to make
  refreshChoicesCount();

  // Check if existing session info exists
  if (choiceNumber === 0) {
    // Load random set of movies
    loadRandomMovies();
  } else {
    // Load movies from last session
    for(var i in movies) {
      var mID = movies[i];
      loadMovieInfo(i, mID, 'id');
    }
  }

  // Randomly select if to play trailers or not
  if(useTrailers) {
    // Load the Youtube IFrame API
    $.getScript('https://www.youtube.com/iframe_api');
  } else {
    $('.trailer-container').parent().hide();
    $('.movie-info')
      .removeClass('col-sm-6')
      .css({
        "margin":"0 auto",
        "width":"75%"
      });
  }

  // Look for trailer when hovering over movie
  $('.movieslist li .cover').hover(function() {
    // on mouse in, start a timeout
    var that = this;
    timer = setTimeout(function() {
      // Find which movie was hovered
      var moviePos = $(that).parent().index();
      loadSelectedMovie(moviePos);
    }, delay);
  }, function() {
    // on mouse out, cancel the timer
    clearTimeout(timer);
  });

  // Look for trailer when hovering over movie
  $('.movieslist li .cover').click(function() {
    // on mouse click, clear timeout
    clearTimeout(timer);
    // Find which movie was clicked
    var moviePos = $(this).parent().index();
    loadSelectedMovie(moviePos);
  });

  $('.movieslist li .select').click(function() {
    // Find which movie was clicked
    var moviePos = $(this).parent().index();
    // Update choice number && Get new recommendations
    if(choiceNumber+1 < maxChoices)
      getChoiceSet(moviePos);
    else if(choiceNumber < maxChoices) {
      // Change appearance of the infobox
      getFinalRecommendationSet(moviePos);
      $('#infobox h4').css({
        "background": "#F3337A",
        "box-shadow": "0 0 0 4px #F3337A, 2px 1px 6px 4px rgba(10, 10, 0, 0.5)"
      });
      $('#infobox h4').html('Final recommendation set');
    }
    else {
      var promises = [];
      promises.push(postChoices(movies[moviePos]._id));
      promises.push(postEvent('Final movie selected', movies[moviePos]._id));

      // When the final movie selected has been saved and the event logged,
      $.when.apply($, promises).done(function() {
        // Reload the page to the survey
        confirmUnload = false;
        location.reload(true);
      });
    }
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
 * Callback for when youtube IFrame script loads.
 * Load the youtube player.
 */
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    videoId: '',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

/**
 * Callback for when youtube player is loaded.
 */
function onPlayerReady() {
  $('#player').addClass('video');
}

/**
 * Callback for when youtube player state changes.
 */
function onPlayerStateChange(e) {
  if(e.data == YT.PlayerState.PLAYING) {
    if(currentTrailer !== null) {
      updateWatchedTrailers(currentTrailer);
      currentTrailer = null;
    }
  }
}

/**
 * Load the movie info, trailer and send events when
 * movie has been hovered/selected.
 */
function loadSelectedMovie(pos) {
  loadMovieDescription(pos);
  if(useTrailers) loadTrailer(pos);
  postEvent('Selected movie', movies[pos]._id);
  updateHoveredMovies(movies[pos]._id);
}

/**
 * Get the total number of movies in our database
 */
function getMoviesCount(cb) {
  return $.ajax({
    type: 'GET',
    url: '/api/count',
    dataType: 'json',
    success: function(data) {
      cb(data.result);
    },
    error: function(err) {
      console.log(err.responseText);
    }
  });
}

/**
 * Load random movies
 */
function loadRandomMovies() {
  getMoviesCount(function(count) {
    for (var i = 0; i < nrOfMovies; i++) {
      var mID = 1 + Math.floor(Math.random() * count);
	  //match randomly selected movie to movieID 
      loadMovieInfo(i, mID, 'id');
    }
  });
}

/**
 * Load the movie info on screen
 */
function loadMovieInfo(itemNr, mID, mType) {
	
	
  return getMovieInfo(mID, mType, function(movieInfo) {
    movies[itemNr] = movieInfo;
    itemNr++;

    // Load the correct poster URL
    var pictureURL;
    //if (movieInfo.rtPictureURL.length > 0) 
     // pictureURL = movieInfo.rtPictureURL;
     if(movieInfo.poster.length > 0)
      pictureURL = movieInfo.poster;
    else
      pictureURL = 'http://marvelmoviemarathon.com/posters/placeholder.png';

    $('.movieslist li:nth-child(' + itemNr + ') .cover').css('background-image', 'url(' + pictureURL + ')');
    $('.movieslist li:nth-child(' + itemNr + ') .movietitle').text(movieInfo.title);
    $('.movieslist li:nth-child(' + itemNr + ') .movieyear').text(movieInfo.year);
  });
}

/**
 * Retrieve movie info from database
 */
function getMovieInfo(mID, mType, cb) {
  // Choose the correct key type
  switch (mType) {
    case 'imdb': 
      mType = 'imdbID';
      break;
    case 'movieid': 
      mType = 'movieID';
      break;
    default:
      mType = 'id_number';
  }

  return $.ajax({
    type: 'GET',
    url: '/api/movies',
    data: {
      id: mID,
      type: mType
    },
    dataType: 'json',
    success: function(data) {
      cb(data.result[0]);
    },
    error: function(err) {
      console.log(err.responseText);
    }
  });
}

/**
 * Get trailer for a movie and load on screen
 */
function loadTrailer(pos) {
  if(movies[pos]) {
    if (movies[pos].trailer) {
      embedTrailer(movies[pos].trailer);
      currentTrailer = movies[pos]._id;
    } else {
      getTrailer(movies[pos]._id, function(trailerKey) {
        movies[pos].trailer = trailerKey;
        embedTrailer(trailerKey);
        currentTrailer = movies[pos]._id;
      });
    }
  }
}

/**
 * Embed the trailer on screen
 */
function embedTrailer(key) {
  // Create and place the embed code on the page
  player.loadVideoById({'videoId': key});
  // var embed = '<iframe id="player" src="https://www.youtube.com/embed/' + key +
  //   '" frameborder="0" allowfullscreen class="video"></iframe>';
  // $('.trailer').html(embed);
}

/**
 * Retreive trailer video data
 */
function getTrailer(mID, cb) {
  return $.ajax({
    type: 'GET',
    url: '/api/trailer',
    data: {
      id: mID
    },
    dataType: 'json',
    success: function(data) {
      cb(data.result);
    },
    error: function(err) {
      cb(null);
      currentTrailer = null;
      console.log(err.responseText);
    }
  });
}

/**
 * Load movie description like plot summary, cast, 
 * genre and director on-screen.
 */
function loadMovieDescription(pos) {
  $('#moviesummary').text(movies[pos].summary);
  $('#moviegenres').text(movies[pos].Genres);
  $('#moviedirector').text(movies[pos].director);
  $('#moviecast').text(movies[pos].cast);
}

/**
 * POST id of movie whose trailer was watched.
 */
function updateWatchedTrailers(mID) {
  return $.ajax({
    type: 'POST',
    url: '/api/update/watchedtrailers',
    data: {
      userid: userid,
      movie: mID
    },
    dataType: 'json',
    error: function(err) {
      console.log(err.responseText);
    }
  });
}

/**
 * GET (POST) new recommendation set
 */
function getChoiceSet(pos, cb) {
  return $.ajax({
    type: 'POST',
    url: 'http://131.155.121.165:8080/json/asynconeway/Choice',
    data: {
      userid: "" + userid,
      movieid: "" + movies[pos].movieID,
      learn_rate: learnRate,
      choice_number: "" + choiceNumber,
      discard_rate: discardRate,
      number_of_candidates: "" + nrOfMovies
    },
    dataType: 'json',
    success: function(data) {
      // Load the new choice set
      setTimeout(function() {
        loadChoiceSet('Loaded choice set', movies[pos]._id, data);
      }, delay);
    },
    error: function(err) {
      console.log(err.responseText);
    }
  });
}

/**
 * POST update choice number.
 */
function postChoiceNumber(cb) {
  return $.ajax({
    type: 'POST',
    url: '/api/update/choiceNumber',
    data: {
      userid: userid
    },
    dataType: 'json',
    success: function(data) {
      choiceNumber = data.result;
      refreshChoicesCount();

      // Execute callback if any
      if (typeof cb != 'undefined') cb();
    },
    error: function(err) {
      console.log(err.responseText);
    }
  });
}

/**
 * Update the remaining number of choices to
 * be made on-screen.
 */
function refreshChoicesCount() {
  $('#remNrOfChoices strong').text(maxChoices-choiceNumber);
}

/**
 * GET (POST) final recommendation set
 */
function getFinalRecommendationSet(pos, cb) {
  return $.ajax({
    type: 'GET',
    url: 'http://131.155.121.165:8080/recommendation/'+userid+'/'
        +nrOfMovies+'/'+diversification+'/alternative',
    data: {
      format: 'json'
    },
    dataType: 'json',
    success: function(data) {
      // Load the new choice set
      setTimeout(function() {
        loadChoiceSet('Loaded final recommendation set', movies[pos]._id, data);
      }, delay);
    },
    error: function(err) {
      console.log(err.responseText);
    }
  });
}

/**
 * Load the new choice set on-screen
 */
function loadChoiceSet(event, mID, data) {
  // First, reset movies list on-screen
  resetMovies();

  // Filter the new recommendation set
  data = data.map(function(movie) {
    return movie.itemid;
  });
  data.shift();

  // Load the new recommendation set
  var promises = [];
  for(var i in data) {
    var mID = data[i];
    promises.push(loadMovieInfo(i, mID, 'movieid'));
  }

  // Save the movie selected
  postChoices(mID);

  // Update choice number
  postChoiceNumber(function() {
    // Log choice set load event
    postEvent(event, choiceNumber+1);
  });

  // When movie info is loaded for all movies
  $.when.apply($, promises).done(function() {
    // Update the movies list on the backend for the user
    postMovies();
  });
}

/**
 * Reset movies info in movies list.
 */
function resetMovies() {
  movies = [];
  for(var i=1; i<=nrOfMovies; i++) {
    var pictureURL = 'http://marvelmoviemarathon.com/posters/placeholder.png';
    $('.movieslist li:nth-child(' + i + ') .cover').css('background-image', 'url(' + pictureURL + ')');
    $('.movieslist li:nth-child(' + i + ') .movietitle').text('{title}');
    $('.movieslist li:nth-child(' + i + ') .movieyear').text('{year}');
  }
}

/**
 * POST update the selected movie choice.
 */
function postChoices(mID) {
  return $.ajax({
    type: 'POST',
    url: '/api/update/choices',
    data: {
      userid: userid,
      movie: mID
    },
    dataType: 'json',
    error: function(err) {
      console.log(err.responseText);
    }
  });
}

/**
 * Update the movies that are on-screen to the backend
 * to reload the same movies next time.
 */
function postMovies() {
  var movieIds = movies.map(function(movie) {
    return movie._id;
  });
  return $.ajax({
    type: 'POST',
    url: '/api/update/movies',
    data: {
      userid: userid,
      movies: JSON.stringify(movieIds)
    },
    dataType: 'json',
    error: function(err) {
      console.log(err.responseText);
    }
  });
}

/**
 * POST id of movie that was hovered/clicked on.
 */
function updateHoveredMovies(mID) {
  return $.ajax({
    type: 'POST',
    url: '/api/update/hoveredmovies',
    data: {
      userid: userid,
      movie: mID
    },
    dataType: 'json',
    error: function(err) {
      console.log(err.responseText);
    }
  });
}

/**
 * Log any events on the backend.
 */
function postEvent(event, eventdesc) {
  return $.ajax({
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
