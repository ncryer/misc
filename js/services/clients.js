app.factory('ClientService', function($q){
  var ClientService = {
    members: [
        {
          fullname: "Dingle Berry"
        },
        {
          fullname: "Tronald Dump"
        }
      ],

      addMember: function(member){
        var fullname = member.firstName + " " + member.lastName;
        member.fullname = fullname;
        this.members.push(member);
      },

      addMemberAsync: function(member){
        var deferred = $q.defer();
        var fullname = member.firstName + " " + member.lastName;
        member.fullname = fullname;
        try{
          this.members.push(member);
          deferred.resolve(true);
          return deferred.promise;
        }
        catch(err) {
          deferred.reject(false);
          return deferred.promise;
        }
      }
  };

  return ClientService
});
