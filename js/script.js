// function sleep(milliseconds) {
//   const date = Date.now();
//   let currentDate = null;
//   do {
//     currentDate = Date.now();
//   } while (currentDate - date < milliseconds);
// }

var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
context.strokeStyle = 'grey';
context.lineWidth = 2;
context.strokeRect(50, 50, window.innerWidth-100, window.innerHeight-100);

function preload(arrayOfImages) {
    for(i = 0 ; i < arrayOfImages.length ; i++)
       {
   var img = new Image();
           img.src = arrayOfImages[i];
       }
}
var getElements = function(tagName, attribute, value, callback) {
  var tags = window.document.getElementsByTagName(tagName);
  for (var i=0; i < tags.length; i++) {
    var tag = tags[i];
    if (tag.getAttribute(attribute) == value) {
      callback(tag);
    }
  };
};

preload(['/img/loader.gif']);
// sleep(2200);

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};

getJSON('https://www.cbr-xml-daily.ru/daily_json.js',
function(err, data) {
  if (err !== null) {
    console.log(err)
  } else {
      var json = JSON.parse(data);
    console.log(json.Valute.USD.Value)
  }
});
