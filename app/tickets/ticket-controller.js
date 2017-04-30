var ticketController = angular.module('ticket.controllers', []);

ticketController.controller('ticketCtrl', function($state, $scope, ticketAPIservice) {

  ticketAPIservice.getTicket().success(function(response, status) {
    $scope.ticketList = response;
    console.log(response);
  });

  $scope.gotoTicketDetail = function(id, title) {
    $state.go('detail',{id: id, title: title});
    console.log("it's ticket detail");
  };

});

ticketController.controller('ticketDetailCtrl', function($state, $scope, ticketAPIservice, $stateParams) {

  var id = $stateParams.id;
  ticketAPIservice.getTicketDetail(id).success(function(response, status) {
    $scope.ticketDetail = response;
  });
});

ticketController.controller('ticketCreateCtrl', function($state, $scope, ticketAPIservice){

  $scope.ticketModel = {};
  var params = $scope.ticketModel;

  $scope.createNewTicket = function(){
    ticketAPIservice.postTicketDetail(params).success(function(response, status) {
      console.log('created successfully');
    });
  };

});
