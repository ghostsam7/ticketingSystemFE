var ticketService = angular.module('ticket.services', []);

ticketService.factory('ticketAPIservice', function($http) {

  var ticketAPI = {}
  var ticketUrl = {
    'endpoint': "http://127.0.0.1:9000/api/"
  }

  ticketAPI.getTicket = function() {
    return $http({
      method: 'GET',
      url: ticketUrl.endpoint + "ticket/"
    });
  };

  ticketAPI.getTicketDetail = function(id) {
    return $http({
      method: 'GET',
      url: ticketUrl.endpoint+ "ticket/" + id
    })
  }

  ticketAPI.getClientDetail = function(id) {
    return $http({
      method: 'GET',
      url: ticketUrl.endpoint+ "customer/" + id
    })
  }

  ticketAPI.getStaff = function(){
    return $http({
      method: 'GET',
      url: ticketUrl.endpoint+ "staff/"
    })
  }

  ticketAPI.getStaffDetail = function(id){
    return $http({
      method: 'GET',
      url: ticketUrl.endpoint+ "staff/" + id
    })
  }

  ticketAPI.resolveTicket = function(tid, params){
    return $http({
      method: 'PUT',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      url: ticketUrl.endpoint + "ticket/" + tid + "/",
      transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
      data: params
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
