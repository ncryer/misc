app.controller('classController', function($scope, uiCalendarConfig, $mdDialog, ClassService){
  var self = $scope;

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
          // Retrieve event from list
          var myEvent = ClassService.events.$getRecord(calendarEvent.$id);

          var title = "";
          myEvent.classes = [];
          for(key in vm.selectedClasses){
            var classObject = vm.selectedClasses[key];
            // Add class to event
            myEvent.classes.push(classObject);
            var stringRepr = classObject.title + " | " + classObject.location + "\n";
            title += stringRepr;
          }
          // Increment the event's numClasses
          myEvent.numClasses = vm.numClasses;
          // Save title for rendering
          myEvent.title = title;
          // Event can now be synced
          ClassService.events.$save(myEvent).then(function(){
            // re-render and hide
            uiCalendarConfig.calendars['myCalendar'].fullCalendar('rerenderEvents');
            $mdDialog.hide();
          });
        };

        vm.delete = function(){
          var myEvent = ClassService.events.$getRecord(calendarEvent.$id);
          ClassService.events.$remove(myEvent).then(function(){
            // Rerender
            uiCalendarConfig.calendars['myCalendar'].fullCalendar('rerenderEvents');
            $mdDialog.hide();
          });
        };
      }
    });
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
    event.start = event.start.toString();
    event.end = event.end.toString();
    ClassService.events.$add(event);
  };


  // set the calendar's events
  self.eventSources = [events];
});
