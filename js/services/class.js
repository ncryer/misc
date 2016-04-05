app.factory('ClassService', function(Utils, $firebaseArray, $firebaseRef){

  var cache = Utils.cache.get('dataCache');
  var gymKey = cache.gym;

  // classes
  var classesRef = $firebaseRef.default.child('gym').child(gymKey).child('classes');
  var classesArray = $firebaseArray(classesRef);

  // Events (timeslots in which classes are situated)
  var eventsRef = $firebaseRef.default.child('gym').child(gymKey).child('events');
  var eventsArray = $firebaseArray(eventsRef);

  var ClassService = {
    events: eventsArray,
    classes: classesArray,


    // Class methods
    addClass: function(myClass){
      return classesArray.$add(myClass);
    },


    // Event methods
    addEvent: function(myEvent){
      console.log(myEvent);
      return eventsArray.$add(myEvent);
    },

    // removeEvent: function(index){
    //
    // },

  };

  return ClassService;
});
