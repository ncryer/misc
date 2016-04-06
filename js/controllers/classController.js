app.controller('classController', function($scope, uiCalendarConfig, $mdDialog, ClassService){
  var self = $scope;

  // Store intermediate events here before adding classes and saving to fb
  var tempEvents = [];
  var events = ClassService.events;

  self.configureClassModal = function(){
    $mdDialog.show({
      templateUrl: '../../views/partials/modals/configureClasses.html',
      clickOutsideToClose: true,
      controllerAs: 'modal',
      controller: function($mdDialog, ClassService){
        var vm = this;

        vm.classes = ClassService.classes;

        vm.addClass = function(myClass){
          ClassService.addClass(myClass);
          vm.myClass = {
            title: "",
            location: ""
          };
        };
      }
      // Controller ends
    })
  };

  self.timeslotDetailsModal = function(calendarEvent, jsEvent, view){
    $mdDialog.show({
      templateUrl: '../../views/partials/modals/timeslotDetails.html',
      clickOutsideToClose: true,
      controllerAs: 'modal',
      controller: function($mdDialog, ClassService){
        var vm = this;

        vm.classes = ClassService.classes;

        vm.range = function(n){
          // Emulating a list range
          return new Array(n);
        };

        // Fetch event details

        vm.numClasses = calendarEvent.numClasses;
        vm.selectedClasses = calendarEvent.classes || {};

        vm.incrementNumClasses = function(){
          return vm.numClasses += 1;
        };

        vm.save = function(){
          var title = "";
          calendarEvent.classes = [];
          for(key in vm.selectedClasses){
            var classObject = vm.selectedClasses[key];
            // Add class to event
            calendarEvent.classes.push(classObject);
            var stringRepr = classObject.title + " | " + classObject.location + "\n";
            title += stringRepr;
          }
          // Increment the event's numClasses
          calendarEvent.numClasses = vm.numClasses;
          // Save title for rendering
          calendarEvent.title = title;
          // re-render and hide
          console.log(calendarEvent);
          uiCalendarConfig.calendars['myCalendar'].fullCalendar('rerenderEvents');
          $mdDialog.hide();
        };

        vm.delete = function(){
          self.removeEvent(calendarEvent.index);
          $mdDialog.hide();
        };
      }
    });
  };


  self.removeEvent = function(index){
    events.splice(index,1);
  };

  self.calendarOptions = {

    editable: true,
    selectable: true,
    selectHelper: true,
    slotEventOverlap: true,

    defaultView: 'agendaWeek',

    minTime: '07:00:00',
    maxTime: '24:00:00',

    header: {
      left: '',
      right: ''
    },

    columnFormat: 'dddd',
    // This seems to not work
    timeFormat: 'h(:mm)',


    //
    select: function(start, end){
      title = "";
      var eventData = {
        start: start,
        end: end,
        title: title,
        classes: [],
        numClasses: 1
      }
      self.addEvent(eventData);
    },

    eventClick: self.timeslotDetailsModal

  };

  self.addEvent = function(event){
    // Set an index for removal purposes
    if(events.length === 0){
      var idx = 0
    } else {
      var idx = events.length - 1;
    }
    event.index = idx;
    tempEvents.push(event);
  };
  self.eventSources = [tempEvents];

});
