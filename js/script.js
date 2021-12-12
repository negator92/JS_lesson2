var loader;

function LoadNow(opacity) {
  if(opacity <= 0) {
    displayContent();
  }
  else {
    loader.style.opacity = opacity;
    window.setTimeout(function () {
      LoadNow(opacity - 0.05)
    }, 50);
  }
}

function displayContent(){
  loader.style.display = 'none';
  document.getElementById('content').style.display = 'block';
}

window.onload = function (){
  var date = Date.now();
  var curDate = null;
  do {
      curDate = Date.now();
  } while (curDate-date < 2200);
  loader = document.getElementById('preloader');
  LoadNow(1);
}

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
