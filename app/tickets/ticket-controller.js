var ticketController = angular.module('ticket.controllers', []);

ticketController.controller('ticketCtrl', function($state, $scope, ticketAPIservice) {

  ticketAPIservice.getTicket().then(function(response) {
    $scope.ticketList = response.data;
  });

  $scope.gotoTicketDetail = function(id, title) {
    $state.go('detail',{id: id, title: title});
  };

});

ticketController.controller('ticketDetailCtrl', function($state, $scope, ticketAPIservice, $stateParams) {

  var id = $stateParams.id;
  $scope.staffModel = {};

  ticketAPIservice.getTicketDetail(id).then(function(response) {
    $scope.ticketDetail = response.data;
    ticketAPIservice.getClientDetail(response.data.customer).then(function(response) {
      $scope.clientDetail = response.data;
    });
    if (response.data.staff != null) {
      ticketAPIservice.getStaffDetail(response.data.staff).then(function(response) {
        $scope.staffDetail = response.data;
      });
    }
    else{
      ticketAPIservice.getStaff().then(function(response) {
        $scope.staffList = response.data;
        console.log($scope.staffList);
      });
    }
    var params = $scope.ticketDetail;

    $scope.assignTo = function(obj){
      params.staff = obj.id;
      params.status = "a";
      console.log(params);
      ticketAPIservice.resolveTicket(id, params);
    };
    $scope.solved = function(){
      params.resolved = true;
      params.status = 'c';
      ticketAPIservice.resolveTicket(id, params);
    };
  });
});

ticketController.controller('ticketCreateCtrl', function($state, $scope, ticketAPIservice){

  $scope.ticketModel = {};
  $scope.customerModel = {};
  var customer = $scope.customerModel;
  var params = $scope.ticketModel;

  $scope.createNewTicket = function(){
    customer.contact = "+91" + $scope.customerModel.contact;
    ticketAPIservice.postCustomerDetail(customer).then(function(response) {
      params.customer = response.data.id;
      ticketAPIservice.postTicketDetail(params).then(function(response) {
        $state.go('ticket');
        console.log('created thenfully');
      });
    })
  };

});
