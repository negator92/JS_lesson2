var loader;
var cnt;
var myJson;
localStorage.data;
localStorage.loaded = false;
localStorage.interval;

window.onload = function () {
  loader = document.getElementById('preloader');
  reload();
}

function decreaseOpacity(opacity) {
  if (opacity > 0) {
    loader.style.opacity = opacity;
    window.setTimeout(function () {
      decreaseOpacity(opacity - 0.01)
    }, 10);
  }
  else {
    displayContent();
  }
}

function checkFlag() {
  if (localStorage.loaded == false) {
    window.setTimeout(checkFlag, 100);
  }
}

function displayLoader() {
  loader.style.display = 'block';
  cnt = document.getElementById('content');
  cnt.style.display = 'none';
}

function displayContent() {
  loader.style.display = 'none';
  cnt = document.getElementById('content');
  cnt.style.display = 'block';
}

function loadCurency() {
  ;
  getJSON('https://www.cbr-xml-daily.ru/daily_json.js', function (err, data) {
    if (err !== null) {
      console.log(err);
      alert(err);
      loadCurency();
    } else {
      localStorage.loaded = true;
      localStorage.data = JSON.stringify(data);
      return data;
    }
  });
}

function getJSON(url, callback) {
  localStorage.loaded = false;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function () {
    var status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};

function reload() {
  if (localStorage.interval != null) {
    window.clearInterval(localStorage.interval);
  }
  loadData();
  localStorage.interval = setInterval(loadData, 7200000); //7200000
}

function loadData() {
  displayLoader();
  loadCurency();
  checkFlag();
  if (isJSON(localStorage.data)) {
    tableCreate();
    decreaseOpacity(1);
  }
}

function isJSON(str) {
  try {
    return (JSON.parse(str) && !!str);
  } catch (e) {
    return false;
  }
}

function tableCreate() {
  var cnt = document.getElementById('content');
  if (cnt.hasChildNodes()) {
    cnt.textContent = '';
  }
  cnt.innerHTML = '<input type="button" onclick="reload()" value="Обновить">';

  var date = document.createTextNode("Обновлено в " + new Date().toLocaleString("ru", {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timezone: 'UTC',
    weekday: 'long'
  }));
  cnt.appendChild(date);

  var table = document.createElement('table');
  table.className = "table";
  cnt.appendChild(table);
  var tblbody = "<thead><tr><th class='row-name'>Название</th><th class='row-valute'>Валюта</th><th class='row-value'>Цена</th><th class='row-previous'>Вчерашняя</th></tr></thead>";


  if (typeof JSON.parse(localStorage.data) == 'string') {
    var a = JSON.parse(localStorage.data);
    myJson = JSON.parse(a);
  }
  else {
    myJson = JSON.parse(localStorage.data);
  }
  var valutes = myJson.Valute;
  for (key in valutes) {
    tblbody +=
      "<tr><td>" + valutes[key].Name
      + "</td><td>" + key
      + "</td><td>" + valutes[key].Value
      + "</td><td>" + valutes[key].Previous + "</td></tr>";
  }
  table.innerHTML = tblbody;
}