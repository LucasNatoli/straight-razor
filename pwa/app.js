(function() {
  'use strict';

  var app = {
    baseUrl: 'http://localhost:3000',

    loginDialog: document.getElementById('app_login_dialog'),
    drawer: document.getElementById('app_drawer'),
    homeSuscriptionsList: document.getElementById('app_home_suscriptions_list'),
    marketPanel: document.getElementById('app_market_panel'),

    homeButton: document.getElementById('app_home_button'),
    marketsButton: document.getElementById('app_markets_button'),
    exchangesButton: document.getElementById('app_exchanges_button'),
    loginButton: document.getElementById('app_login_button'),

    templates : {
      home: {
        suscriptionListItem: document.getElementById('template_home_suscription_listitem')
      }
    },
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
      },
      login: {
        elements: [
          document.getElementById('app_login_dialog')
        ]
      } 
    },
    
    config: {
      exchanges: [
        {
          name: 'Binance',
          features: ['ticker', 'candles', 'orders']
        },
        {
          name: 'Oanda',
          features: ['ticker', 'candles', 'orders']
        }
      ],
      markets: [
        {
          favorites: [
            {
              name: 'BTC/USDT',
              exchange: 'Binance',
              lastPrice: 6478.09
            },
            {
              name: 'EUR/USD',
              exchange: 'Oanda',
              lastPrice: 1.18
            }
          ],
          oanda: [
            {
              name: 'EUR/USD',
              lastPrice: 1.18
            },
            {
              name: 'BTC/USDT',
              lastPrice: 6478.09

            }            
          ]
        }
      ],
      alarms: [
        {
          name: 'Bollinger bottom pinch',
          coin: 'BTC',
          asset: 'USDT',
          termA: 'close',
          operator: '<=',
          termB: 'BB(20, 2)lower close'
        },
        {
          name: '10 pips arriba',
          coin: 'USD',
          asset: 'EUR',
          termA: 'close',
          operator: '>=',
          termB: 'open+0.01'
        },
        {
          name: '10 pips abajo',
          coin: 'USD',
          asset: 'EUR',
          termA: 'close',
          operator: '<=',
          termB: 'open-0.01'
        }
      ],
      online: false,
      sessionAlive: false,
      lastUpdate: null
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
    //app.showElement(app.preloader)
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            //app.hideElement(app.preloader);
            var res = []; 
            if (request.response) res = JSON.parse(request.response);
            if (onComplete) onComplete(request.status, res)
        }
    } 
    request.open(method, app.baseUrl + endpoint, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(parameters);
  };

  app.callBackLogin = function(status, response) {
    if (status === 200) {
      app.userData = response;
      app.hideElement(app.loginDialog);
      app.showPanelElements(app.panels.home)
    }
    if (status === 401) {
      app.loginErrorMsg.innerText = "La combinacion ingresada es incorrecta!"
      //app.showElement(app.loginError)
    }
    if (status === 500) {
      app.loginErrorMsg.innerText = "Ha ocurrido un error de comunicacion. Por favor intentelo nuevamente en unos instante."
      //app.showElement(app.loginError)
    }    
  }

  app.callBackCheckSession = function(status, response) {
    if (status === 200) {
      app.userData = response;
      app.showPanelElements(app.panels.home);
    }
    if (status === 401) {
      app.hideAllPanels;
      app.showPanelElements(app.panels.login);
    }
    if (status === 500) {
        //TODO: !!!
    }    
  }
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

  app.loginButton.addEventListener('click', function(){
    var parameters = JSON.stringify({
      "email": document.getElementById('login_email').value,
      "password": document.getElementById('login_password').value
    });
    app.sendAjaxRequest("/login", "POST", parameters, app.callBackLogin)
  });

  document.addEventListener("DOMContentLoaded", function(event) { 
    //app.hideAllPanels();

    while(app.homeSuscriptionsList.childElementCount>0){
      app.homeSuscriptionsList.removeChild(app.homeSuscriptionsList.firstChild)
    };

    app.config.alarms.forEach(alarm => {
      var e = document.getElementById('template_home_suscription_listitem').cloneNode(true);
      e.querySelector('.list_item_title').innerText = alarm.name;
      e.querySelector('.list_item_body').innerText = alarm.coin + alarm.asset + ' ' + alarm.termA + ' ' + alarm.operator + ' ' + alarm.termB;
      app.homeSuscriptionsList.appendChild(e);
    });

    //app.sendAjaxRequest("/check-session", 'GET', {}, app.callBackCheckSession)
    //app.showPanelElements(app.panels.home)
  });

})();
