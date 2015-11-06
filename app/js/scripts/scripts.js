// remap jQuery to $
(function($){

	"use strict";

	/* trigger when page is ready */
	$(document).ready(function (){
    var html5Options = { enableHighAccuracy: true, timeout: 6000, maximumAge: 0 };
    geolocator.locate(onGeoSuccess, onGeoError, true, html5Options);

    var $main = $('#main'),
        $loading = $('.loading');

    function onGeoSuccess(location) {
      $loading.remove();
    	if (location.address.city === 'Richmond') {
    		$main.append('<iframe src="https://www.youtube.com/embed/cvymMDGRvJ8?autoplay=1" frameborder="0" allowfullscreen></iframe>');
    	} else {
    		$main.append('<iframe width="420" height="315" src="https://www.youtube.com/embed/QMrIMvxvbPE?autoplay=1" frameborder="0" allowfullscreen></iframe>');
    	}
      $main.fitVids();
    }
    //The callback function executed when the location could not be fetched.
    function onGeoError(error) {
      console.error(error);
    }
	});

})(window.jQuery);