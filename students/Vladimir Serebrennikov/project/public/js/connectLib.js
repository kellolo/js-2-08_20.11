function makeGETRequest(URI) {
  return new Promise ((resolve, reject) => {
      let xhr;
      if (window.XMLHttpRequest) {
          xhr = new XMLHttpRequest();
      } else if (window.ActiveXObject) {
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }
      xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
              if (xhr.status == 200 ) {
                  resolve(xhr.responseText);
              } else {
                  reject("xhr: error server");
              }
          }
      }
      xhr.open('GET', URI, true);
      xhr.send();
  });
}

export {makeGETRequest}