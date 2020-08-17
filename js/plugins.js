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
  strings: ['Developer', 'Photographer', 'Pc-enthusiast', 'I am Jelle.'],
  typeSpeed: 40,
  smartBackspace: true,
  backSpeed: 30,
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


function onFormSubmit() {
  console.log("yeeee")
  grecaptcha.execute();
}

function onCaptchaSubmit(token) {
  console.log("boyyy")
  console.log(token)
  $.post( "http://backend.jelleglebbeek.com/jelleglebbeek/captcha.php", { name: $("#nameInput").val(), email: $("#emailInput").val(), message: $("#messageInput").val(), token: token, })
    .done(function( data ) {
      console.log(data);
      if(data === "1") {
        $('.invalid-feedback').css('display', 'none');
        $('#contact-form').trigger("reset");
        $('#form-sent-toast').toast('show')
        $('#form-sent-toast').css('visibility','visible')
      } else {
        $('.invalid-feedback').css('display', 'initial');
        $('#form-captcha-fail').toast('show')
        $('#form-captcha-fail').css('visibility','visible')
      }
      grecaptcha.reset()
    });
  document.getElementById("contact-form").submit();
}

$(document).on('click','.close',function (e) {
  $(this).closest('.toast').css('visibility','hidden')
});

$('#form-captcha-fail').on('hidden.bs.toast', function () {
  $('#form-captcha-fail').css('visibility','hidden')
})

$('#form-sent-toast').on('hidden.bs.toast', function () {
  $('#form-sent-toast').css('visibility','hidden')
})

$('#form-sent-toast').toast({
  autohide: true,
  animation: true,
  delay: 5000
})

$('#form-captcha-fail').toast({
  autohide: true,
  animation: true,
  delay: 10000
})
