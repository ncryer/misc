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
    addEvent: function(event){
      event.start = event.start.toString();
      event.end = event.end.toString();
      return ClassService.events.$add(event);
    },

    deleteEvent: function(event){
      console.log(event);
      return ClassService.events.$remove(event.$id).then(function(){
        console.log("removed");
      });
    },

  };

  return ClassService;
});
