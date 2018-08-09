(function() {
  'use strict';

  var app = {

    loginDialog: document.getElementById('app_login_dialog'),
    drawer: document.getElementById('app_drawer'),

    marketPanel: document.getElementById('app_market_panel'),

    homeButton: document.getElementById('app_home_button'),
    marketsButton: document.getElementById('app_markets_button'),
    exchangesButton: document.getElementById('app_exchanges_button'),
    
    panels: {
      home: {
        elements: [
          document.getElementById('app_home_suscriptions'),
          document.getElementById('app_home_ticker'),
          document.getElementById('app_home_updates')
        ]
      },
      markets: {
        elements:[
          document.getElementById('app_markets_panel')
        ]
      },
      exchanges: {
        elements:[
          document.getElementById('app_enchanges_panel')
        ]
      } 
    },
    
    isLoading: true,
    visibleCards: {},
    selectedCities: [],
/* 
    spinner: document.querySelector('.loader'),
    cardTemplate: document.querySelector('.cardTemplate'),
    container: document.querySelector('.main'),
    addDialog: document.querySelector('.dialog-container'),
    daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] */
  };

  
  /*****************************************************************************
  *
  * Comunicacion con el servidor
  *
  ****************************************************************************/
  app.sendAjaxRequest = function (endpoint, method, parameters, onComplete) {
    var request = new XMLHttpRequest();
    app.showElement(app.preloader)
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            app.hideElement(app.preloader);
            var res = []; 
            if (request.response) res = JSON.parse(request.response);
            if (onComplete) onComplete(request.status, res)
        }
    } 
    request.open(method, app.baseUrl + endpoint, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(parameters);
  };

  /*****************************************************************************
  *
  * Manejo de elementos de la UI
  *
  ****************************************************************************/  
  app.showElement = function(element){
    element.classList.remove("hide");
  };

  app.hideElement = function(element){
      element.classList.add("hide");
  };

  app.hideAllPanels = function() {
    for (var panel in app.panels) {
      app.panels[panel].elements.forEach(element =>
        app.hideElement(element));  
    }
  }
  app.showPanelElements = function(panel) {
    panel.elements.forEach(element => {
      app.showElement(element);
    })
  }

  /*****************************************************************************
  *
  * Event listeners de la UI
  *
  ****************************************************************************/
 app.homeButton.addEventListener('click', function() {
  app.hideAllPanels()
  app.showPanelElements(app.panels.home);
 });

 app.marketsButton.addEventListener('click', function() {
  app.hideAllPanels();
  app.showPanelElements(app.panels.markets);
 });
 app.exchangesButton.addEventListener('click', function(){
  app.hideAllPanels();
  app.showPanelElements(app.panels.exchanges);
 });

  /* document.getElementById('app_login_btn').addEventListener('click', function() {
    app.hideElement(app.homeSuscripciones)
  }); */

  

})();
