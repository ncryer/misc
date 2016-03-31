app.factory('Utils', function($cacheFactory){

  var myCache = $cacheFactory('dataCache');
  var Utils = {
    getObject: function(obj) {
      // Convert a firebaseObject to a regular object
      var newObj = {};
      for (var key in obj) {
         if (key.indexOf('$') < 0 && obj.hasOwnProperty(key)) {
            newObj[key] = obj[key];
         };
      }
      return newObj;
    },

    cache: myCache,
  };

  return Utils;
})
