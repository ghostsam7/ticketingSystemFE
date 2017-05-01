var ticketApp = angular.module('ticket', ['ui.router', 'ticket.controllers', 'ticket.services']);

ticketApp.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('ticket',{
      url: '/tickets',
      templateUrl: 'tickets/templates/ticket-list.html',
      controller: 'ticketCtrl'
    })

    .state('create',{
      url: '/create',
      templateUrl: 'tickets/templates/ticket-create.html',
      controller: 'ticketCreateCtrl'
    })

    .state('detail',{
      url: '/detail',
      templateUrl: 'tickets/templates/ticket-detail.html',
      controller: 'ticketDetailCtrl',
      params : {id: null, title: null}
    });
});
