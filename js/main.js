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
