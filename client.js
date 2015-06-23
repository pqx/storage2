var Storage = require('./lib/storage');
var Cookie = require('./lib/cookie');

var _storage_support = true;

try {
  window.localStorage.setItem('test', '42');
  window.sessionStorage.setItem('test', '42');
} catch(e) {
  _storage_support = false;
}

if(_storage_support) {
  window.localStorage.clear();
  window.sessionStorage.clear();

  module.exports = {
    localStorage: window.localStorage,
    sessionStorage: window.sessionStorage
  };
} else {
  var lsCookie = cookie.read('localStorage');

  var localStorage = new Storage(
    lsCookie ? JSON.parse(lsCookie) : {}, // init
    function(data) { // set
      createCookie('localStorage', JSON.stringify(data), 365);
    },
    function() { // clear
      cookie.create('localStorage', '', 365);
    }
  );

  var sessionStorage = new Storage();

  module.exports = {
    localStorage: localStorage,
    sessionStorage: sessionStorage
  };
}
