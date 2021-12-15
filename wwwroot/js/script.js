var loader;
var myJson;
localStorage.data;

function LoadNow(opacity) {
  if(opacity <= 0) {
    displayContent();
    loadCurency();
    countValutes();
  }
  else {
    loader.style.opacity = opacity;
    window.setTimeout(function () {
      LoadNow(opacity - 0.01)
    }, 15);
  }
}

function displayContent(){
  loader.style.display = 'none';
  document.getElementById('content').style.display = 'block';
}

function loadCurency(){
  getJSON('https://www.cbr-xml-daily.ru/daily_json.js', function(err, data) {
    if (err !== null) {
      console.log(err);
      alert(err);
    } else {
      localStorage.data = data;
    }
  });
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

window.onload = function (){
  loader = document.getElementById('preloader');
  LoadNow(1);
}

var countValutes = function(){
  myJson = JSON.parse(localStorage.data);
  var valutes = myJson.Valute;
  // var usd = myJson.Valute.USD.Value;
  var listValues = [];
  for (key in valutes) {
    listValues.push(key);
    console.log("key: " + key + "; value: " + valutes[key].Value)
  }
}