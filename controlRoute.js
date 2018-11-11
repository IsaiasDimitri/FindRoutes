function initialize() {
  /*
  Inicialização do mapa, padrão. Também instancio aqui os serviços de Direção e
  Renderização, a fim de reqisitar e mostrar as rotas no mapa.
  */
  var map = document.getElementById('map'); //div onde o mapa ficará
  var btn = document.getElementById('btnSearch'); //botão que dispara o evento de busca

  var initialPoint = document.getElementById('initialPoint'); //input do ponto de partida
  var finalPoint = document.getElementById('finalPoint'); //input do local de chegada

  /* Instanciando as ferramentas de rota*/
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;

  /* Definindo limites padrão de busca, porém isso não limita apenas a essa área.*/
  var defaultBouns = new google.maps.LatLngBounds(new google.maps.LatLng(-3.722533, -38.603432),
                                                  new google.maps.LatLng(-3.814426, -38.508301));
  var options = {
    bounds: defaultBouns
  };

  /* Tornando os inputs 'autocompletes', comos os limites da área estabelecidos.*/
  var inicialInput = new google.maps.places.Autocomplete(initialPoint, options);
  var finalInput = new google.maps.places.Autocomplete(finalPoint, options);

  /* Iniciando o mapa*/
  var mapConfig = {
    center: new google.maps.LatLng(-3.744219, -38.535939),
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(map, mapConfig);
  directionsDisplay.setMap(map);

  /* Invocando a funcção searchAddress, adicionando o gatilho no botão*/
  btn.addEventListener("click", function() {
    searchAddress(directionsService, directionsDisplay);
  });
}

  /*
  Função que manda os pontos de origem e destino e mostra qual o melhor trajeto
  */
function searchAddress (directionsService, directionsDisplay) {
  directionsService.route({
    origin: initialPoint.value,
    destination: finalPoint.value,
    travelMode: 'WALKING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Falha ao encontrar rota. Motivo:' + status);
    }
  });
}
