  function preload(arrayOfImages) {
    for(i = 0 ; i < arrayOfImages.length ; i++)
       {
   var img = new Image();
           img.src = arrayOfImages[i];
       }
  }

preload(['/img/loader.gif']);


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
