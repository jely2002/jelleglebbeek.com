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

//Init tpyed.js on element when ALL resources are loaded
window.addEventListener("load", function(){
  initLanguage((header, photographer) => {
    var options = {
      strings: ['Developer', photographer, 'Pc-enthusiast', header],
      typeSpeed: 40,
      smartBackspace: true,
      backSpeed: 30,
      showCursor: false,
      onComplete: function (self) {
        //Callback for typed <=> animate.css
        $(".lead").css("opacity", "1");
        animateCSS('.lead', 'fadeInUp');
      }
    };
    var typed = new Typed('.typed', options);
  })
});

//WOW
new WOW().init();

//Form & captcha
function onFormSubmit() {
  grecaptcha.execute();
}

function onCaptchaSubmit(token) {
  $.post("http://backend.jelleglebbeek.com/jelleglebbeek/captcha.php", { name: $("#nameInput").val(), email: $("#emailInput").val(), message: $("#messageInput").val(), token: token })
    .done(function( data ) {
      console.log(data);
      if(data === "success") {
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

//Toasts
$(document).on('click','.close',function (e) {
  $(this).closest('.toast').css('visibility','hidden');
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

//Cookies
$(document).on('click','.closeCookies',function (e) {
  $(this).closest('.toast').css('visibility','hidden');
  $.cookie("cookiesAgreed", "true", { expires: 365 });
});

$('#cookies').on('hidden.bs.toast', function () {
  $('#form-sent-toast').css('visibility','hidden')
})

$(document).ready(function() {
  if($.cookie("cookiesAgreed") == null) {
    $('#cookies').toast('show').css('visibility','visible')
  }
});

$('#cookies').toast({
  autohide: false,
  animation: true
})

//i18n
function initLanguage(cb) {
  $.i18n({
    locale: (getPreferedLanguage() === null) ? 'en' : getPreferedLanguage().slice(0,2)
  });
  $.i18n().load({
    en: './translations/en.json',
    nl: './translations/nl.json'
  }).then(() => {
    $('html').i18n();
    cb($.i18n("masthead.header.final"),$.i18n("masthead.header.photographer"));
  });
}

function changeLanguage(lang) {
  $.i18n().locale = lang;
  $('html').i18n();
  $('.typed').html($.i18n("masthead.header.final"))
}

function getPreferedLanguage() {
  let nav = window.navigator,
      browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
      i,
      language;

  // support for HTML 5.1 "navigator.languages"
  if (Array.isArray(nav.languages)) {
    for (i = 0; i < nav.languages.length; i++) {
      language = nav.languages[i];
      if (language && language.length) {
        return language;
      }
    }
  }

  // support for other well known properties in browsers
  for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
    language = nav[browserLanguagePropertyKeys[i]];
    if (language && language.length) {
      return language;
    }
  }
  return null;
}
