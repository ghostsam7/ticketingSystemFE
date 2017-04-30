var ticketService = angular.module('ticket.services', []);

ticketService.factory('ticketAPIservice', function($http) {

  var ticketAPI = {}
  var ticketUrl = {
    'endpoint': "http://127.0.0.1:9000/api/ticket/"
  }

  ticketAPI.getTicket = function() {
    return $http({
      method: 'GET',
      url: ticketUrl.endpoint
    });
  };

  ticketAPI.getTicketDetail = function(id) {
    return $http({
      method: 'GET',
      url: ticketUrl.endpoint + id
    })
  }

  ticketAPI.postTicketDetail = function(params) {
    return $http({
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      url: ticketUrl.endpoint
    })
  }

  return ticketAPI;
});
