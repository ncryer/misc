app.controller('clientController', function($scope, Auth, $mdDialog, $mdToast, ClientService){

  var self = $scope;

  self.members = ClientService.members;


  // Member modal functionality
  self.addMemberModal = function(){
    $mdDialog.show({
      controller: 'clientController',
      templateUrl: '../../views/partials/modals/addMember.html',
      clickOutsideToClose:true
    })
    // .then(function(data){
    //   console.log("Member added");
    //   $mdDialog.hide();
    // }, function(){
    //   console.log("Dialog cancelled");
    // });
  };

  self.modalResponse = function(){
    // Depending on whether adding members was a success,
    // this function is responsible for closing the modal with a correct
    // response.
    // Bound to: ng-click @ partials/modals/addMember.html
    $mdDialog.hide();
  };


  // Functions
  self.addMember = function(member){
    $mdToast.show(
      $mdToast.simple()
      .textContent('Success!')
      .theme('success-toast')
      .position('top left right'));
    return ClientService.addMember(member);
  };
});
