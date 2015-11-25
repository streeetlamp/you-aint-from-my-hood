// remap jQuery to $
(function($){

	"use strict";

	/* trigger when page is ready */
	$(document).ready(function (){

    var $main = $('#main'),
        $body = $('body'),
        $whereU = $('.where-u-from'),
        $plug = $('.the-plug'),
        sourceBase = window.location,
        repeat = window.setInterval(hitThePlug, 1000);


    function hitThePlug() {
      $plug[0].play();
    }


    var html5Options = { enableHighAccuracy: true, timeout: 6000, maximumAge: 0 };
    geolocator.locate(onGeoSuccess, onGeoError, true, html5Options);


    function onGeoSuccess(location) {
      var $lurk = $('<img />', {class: 'where-u-from', src: './img/lurkin.gif'});
      var $holdItDown = $('<img />', {class: 'where-u-from', src: './img/puttin_it_down.gif'});
      $whereU.fadeOut(350, function() {
        clearInterval(repeat);
      });

      var $newPlug = $('<audio />', {autoplay: true, class:'the-plug'});

    	if (location.address.city !== 'Richmond') {
        var mp3Src = $('<source />', {'src': sourceBase+'audio/aint-from-my-hood.mp3', 'type': 'audio/mpeg'}),
            oggSrc = $('<source />', {'src': sourceBase+'audio/aint-from-my-hood.ogg', 'type': 'audio/ogg'});

        $body.css('background-image', 'url("./img/no-respect.jpg")');
    	} else {
        var mp3Src = $('<source />', {'src': sourceBase+'audio/4-my-hood.mp3', 'type': 'audio/mpeg'}),
            oggSrc = $('<source />', {'src': sourceBase+'audio/4-my-hood.ogg', 'type': 'audio/ogg'});

        $body.css('background-image', 'url("./img/tank.jpg")').append($holdItDown)
    	}
      $newPlug.html([mp3Src, oggSrc]).appendTo($main);
      location.address.city === 'Richmond' ? $body.css('background-image', 'url("./img/tank.jpg")').append($holdItDown) : $body.css('background-image', 'url("./img/no-respect.jpg")');
    }

    //The callback function executed when the location could not be fetched.
    function onGeoError(error) {
      console.error(error);
    }
	});

})(window.jQuery);