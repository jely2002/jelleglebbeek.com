// Avoid `console` errors in browsers that lack a console.
(function() {
  var method;
  var noop = function () {};
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
}());

//Typed
var options = {
  strings: ['Photographer', 'Gamer', 'Mountainbiker', 'Developer', 'Ik ben Jelle.'],
  typeSpeed: 50,
  smartBackspace: true,
  backSpeed: 40,
  showCursor: false,
  onComplete: function(self) {
    //Callback for typed <=> animate.css
    $(".lead").css("opacity", "1");
    animateCSS('.lead', 'fadeInUp');
  }
};

//Init tpyed.js on element when ALL resources are loaded
window.addEventListener("load", function(){
  var typed = new Typed('.typed', options);
});

//WOW
new WOW().init();
