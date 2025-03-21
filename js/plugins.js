let games = null;

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

//Init Typed.js after loading the languages
initLanguage().then((data) => {
    const options = {
      strings: ['Developer', data[1], 'Pc-enthusiast', data[0]],
      typeSpeed: 40,
      smartBackspace: true,
      backSpeed: 30,
      showCursor: false,
      onComplete: function (self) {
        $(".lead").css("opacity", "1");
        animateCSS('.lead', 'fadeInUp');
      }
    };
    const typed = new Typed('.typed', options);
})

//WOW
new WOW().init();

//Form & captcha
function onFormSubmit() {
  grecaptcha.execute();
}

function onCaptchaSubmit(token) {
  $.post("captcha.php", { name: $("#nameInput").val(), email: $("#emailInput").val(), message: $("#messageInput").val(), token: token })
      .done(function( data ) {
        console.log(data);
        if(data === "success") {
          $('.invalid-feedback').css('display', 'none');
          $('#contact-form').trigger("reset");
          $('#form-sent-toast').toast('show')
          $('#form-sent-toast').css('visibility','visible')
          gtag('event', 'send', {
            'category': 'contact',
            'result': 'success'
          });
        } else {
          $('.invalid-feedback').css('display', 'initial');
          $('#form-captcha-fail').toast('show')
          $('#form-captcha-fail').css('visibility','visible')
          gtag('event', 'send', {
            'category': 'contact',
            'result': 'failure'
          });
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
  gtag('event', 'cookies', {
    'result': 'accept'
  });
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
async function initLanguage() {
  return await new Promise((resolve) => {
    $.i18n({
      locale: (getPreferedLanguage() === null) ? 'en' : getPreferedLanguage().slice(0,2)
    });
    $.i18n().load({
      en: './translations/en.json',
      nl: './translations/nl.json'
    }).then(async () => {
      $('html').i18n();
      ($.i18n().locale === 'en') ? $('.en').css('text-decoration','underline') : $('.nl').css('text-decoration','underline')
      await getGameAmount()
      resolve([$.i18n("masthead.header.final"),$.i18n("masthead.header.photographer")]);
    });
  })
}

function changeLanguage(lang) {
  $.i18n().locale = lang;
  $('html').i18n();
  $('.typed').html($.i18n("masthead.header.final"))
  if(lang === 'en') {
    $('.en').css('text-decoration','underline')
    $('.nl').css('text-decoration','none')
  } else {
    $('.nl').css('text-decoration','underline')
    $('.en').css('text-decoration','none')
  }
  getGameAmount()
  gtag('event', 'change_language', {
    'language': lang
  });
}

function getPreferedLanguage() {
  let nav = window.navigator,
      browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
      i,
      language;

  if (Array.isArray(nav.languages)) {
    for (i = 0; i < nav.languages.length; i++) {
      language = nav.languages[i];
      if (language && language.length) {
        return language;
      }
    }
  }

  for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
    language = nav[browserLanguagePropertyKeys[i]];
    if (language && language.length) {
      return language;
    }
  }
  return null;
}

//Get amount of games
async function getGameAmount() {
  await new Promise((resolve => {
    if(games == null) {
      $.get("steamgames.php", function(data) {
        if(data === "") {
          games = "850+"
        } else {
          games = data
        }
        let replaced = $('.aboutDesc').html().replace("850+", games)
        $('.aboutDesc').html(replaced)
        resolve()
      }).fail(function () {
        resolve()
      });
    } else {
      let replaced = $('.aboutDesc').html().replace("850+", games);
      $('.aboutDesc').html(replaced)
      resolve()
    }
  }));
}

//gtag events
$(".nav-item").on('click', function(event) {
  if(!($(event.target).hasClass("en") || $(event.target).hasClass("nl"))) {
    gtag('event', 'nav_click', {
      'item': $(event.target).html()
    });
  }
});

$(".form-inline > a").on('click', function(event) {
  if($(event.target).parent().attr('destination') != null) {
    gtag('event', 'socials_click', {
      'item': $(event.target).parent().attr('destination')
    });
  }
});

$('#pictureInfoBtn').on('click', function(event) {
  gtag('event', 'picture_info');
});

$('a').on('click', function(event) {
  if($(event.target).attr('href') != null && $(event.target).attr('href').slice(0,1) !== "#") {
    gtag('event', 'external_link', {
      'link': $(event.target).attr('href')
    });
  }
});
