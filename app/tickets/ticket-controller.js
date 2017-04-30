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
  $scope.staffModel = {};

  ticketAPIservice.getTicketDetail(id).success(function(response, status) {
    $scope.ticketDetail = response;
    ticketAPIservice.getClientDetail(response.customer).success(function(response, status) {
      $scope.clientDetail = response;
    });
    if (response.staff != null) {
      ticketAPIservice.getStaffDetail(response.staff).success(function(response, status) {
        $scope.staffDetail = response;
      });
    }
    else{
      ticketAPIservice.getStaff().success(function(response, status) {
        $scope.staffList = response;
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
    ticketAPIservice.postCustomerDetail(customer).success(function(response, status) {
      params.customer = response.id;
      ticketAPIservice.postTicketDetail(params).success(function(response, status) {
        console.log('created successfully');
      });
    })
  };

});
