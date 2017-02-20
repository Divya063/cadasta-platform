// Based on http://joakim.beng.se/blog/posts/a-javascript-router-in-20-lines.html
var SimpleRouter = function(){
  var routes = {};
  // var state = {}

  function route(path, controller) {
    routes[path] = {};
    routes[path].controller = controller;
  }

  function hideDetailPannel() {
    if (!$('.content-single').hasClass('detail-hidden')) {
      $('.content-single').addClass('detail-hidden');
      window.setTimeout(function() {
        map.invalidateSize();
      }, 400);
    }
  }

  function displayDetailPannel() {
    if ($('.content-single').hasClass('detail-hidden')) {
      $('.content-single').removeClass('detail-hidden');
      window.setTimeout(function() {
        map.invalidateSize();
      }, 400);
    }
  }


  // function checkHashPath(hash_path) {
  //   if (hash_path === '/map') {
  //     hideDetailPannel();
  //   } else if (hash_path === '/overview' || hash_path === '/') {
  //     displayDetailPannel();
  //     map.fitBounds(options.projectExtent);
  //   } else if (hash_path.includes('location')) {
  //     displayDetailPannel();
  //   }
  // }

  route('/map', function() {
    hideDetailPannel();
  });

  route('/overview', function() {
    displayDetailPannel();
    map.fitBounds(options.projectExtent);
  });

  route('/', function() {
    // Zoom back out to project extent.
    displayDetailPannel();
    map.fitBounds(options.projectExtent);
  });

  route('/records/location', function() {
    // Zoom into project bounds.
    displayDetailPannel();
  });


  route('/locations/new', function() {
    // Zoom into project bounds.
    displayDetailPannel();
    smap.add_map_controls();
  });

  // var dashboard_url = '{% url "async:project:dashboard" project.organization.slug project.slug %}'



  var el = null;
  function router() {
    el = el || document.getElementById('project-detail');

    var hash_path = location.hash.slice(1) || '/';

    var view_url = '/async' + location.pathname;
    if (hash_path !== '/') {
      view_url = view_url + hash_path.substr(1) + '/';
    }
    if (hash_path.includes('records/location')){
      hash_path = '/records/location';
    }

    var route = routes[hash_path];
    route.controller();

    $.get(view_url, function(response){
      el.innerHTML = response;
    });
  }

  function centerOnLocation () {
    map.on("popupopen", function(evt){
      currentPopup = evt.popup;

      $('#spatial-pop-up').click(function(e){
        var bounds;
        if (typeof(currentPopup._source.getBounds) === 'function'){
          bounds = currentPopup._source.getBounds();
        } else {
          // If the spatial unit is a marker
          var latLngs = [ currentPopup._source.getLatLng() ];
          bounds = L.latLngBounds(latLngs);
        }
        if (bounds.isValid()){
          map.fitBounds(bounds);
        }
        map.closePopup();
      });
    });
  }

  centerOnLocation();

  return {
    router: router,
  };
};


var sr = new SimpleRouter();

window.addEventListener('hashchange', sr.router);
window.addEventListener('load', sr.router);
