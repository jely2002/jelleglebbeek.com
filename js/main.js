//SmoothScroll
$(document).ready(function(){
  $("a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      let hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
        window.location.hash = hash;
      });
    }
  });
});

//Force the browser to download an image.
function forceDownload(link){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", link.getAttribute("data-href"), true);
  xhr.responseType = "blob";
  xhr.onload = function(){
    if (window.navigator && window.navigator.msSaveBlob) {
      // Internet Explorer workaround
      window.navigator.msSaveBlob(this.response, "Stars-over-the-frangipani.jpg");
      return;
    }
    var urlCreator = window.URL || window.webkitURL;
    var tag = document.createElement('a');
    tag.href = urlCreator.createObjectURL(this.response);
    tag.download = link.getAttribute("download");
    document.body.appendChild(tag);
    tag.click();
    document.body.removeChild(tag);
  };
  xhr.send();
}

//Add animations to objects on the fly
function animateCSS(element, animationName, callback) {
  const node = document.querySelector(element);
  node.classList.add('animated', animationName);

  function handleAnimationEnd() {
    node.classList.remove('animated', animationName);
    node.removeEventListener('animationend', handleAnimationEnd);

    if (typeof callback === 'function') callback()
  }

  node.addEventListener('animationend', handleAnimationEnd)
}

//Enable page wide popovers
$(function () {
  $('[data-toggle="popover"]').popover()
})

//Close popover when clicked outsite
$('body').on('click', function (e) {
  $('[data-toggle=popover]').each(function () {
    if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
      $(this).popover('hide');
    }
  });
});

//Copy to clipboard methods
$('#discordPopover').on('show.bs.popover', function () {
  copyTextToClipboard("jely2002#3553");
});


function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying to clipboard was ' + msg);
  } catch (err) {
    console.error('Copying to clipboard has failed: ', err);
  }

  document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text);
}

//Hide the codersrank widget when the API is down
$.ajax({
  url: "https://api.codersrank.io/app/candidate/GetScore",
  type: 'GET',
  statusCode: {
    500: function () {
      $('codersrank-widget').css('display', 'none');
    }
  }
});


//Automagically set age
$("#age").html(calcAge(2002,6,9))
function calcAge(year, month, day) {
  const now = new Date();
  let age = now.getFullYear() - year;
  const mdif = now.getMonth() - month + 1;
  if (mdif < 0) {
    --age;
  }
  else if (mdif === 0) {
    let ddif = now.getDate() - day;
    if (ddif < 0) --age;
  }
  return age;
}
