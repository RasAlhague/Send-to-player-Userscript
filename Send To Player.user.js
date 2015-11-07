// ==UserScript==
// @name        Send to player
// @namespace   com.rasalhague
// @version     1
// @grant       none
// @match       <all_urls>
// @run-at      document-idle
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement('script');
  script.setAttribute('src', '//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js');
  script.addEventListener('load', function () {
    var script = document.createElement('script');
    script.textContent = 'window.jQ=jQuery.noConflict(true);(' + callback.toString() + ')();';
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
  var mimeType = "player://";
  var formatsToLookFor = [".mkv", ".avi", ".mp4"];

  var selector = "";
  for(i = 0, len = formatsToLookFor.length; i < len; i++) {
    if(i > 0) {
      selector += ", ";
    }
    selector += "a[href$='" + formatsToLookFor[i] + "']";
  }

  var resetEventInterval = setInterval(resetMouseOverEvent, 500);
  
  function resetMouseOverEvent() {
    
    $(selector).not("[href^='player://']").each(function (index) {
      // Set up pointer observer event
      // This is not nessesary
      $(this).unbind("mouseover").bind("mouseover", function (event) {
        // Payload
        event.target.href = mimeType + event.target.href;
        $(this).unbind("mouseover");
      });
    });
    
  }
}

// load jQuery and execute the main function
addJQuery(main);
 
