// Based on http://joakim.beng.se/blog/posts/a-javascript-router-in-20-lines.html
var SimpleRouter = function(){
  var routes = {};
  var current_location = null
  // var state = {}

  function route(path, controller) {
    routes[path] = {};
    routes[path].controller = controller;
  }

  route('/map', function() {
    hideDetailPannel();
  });

  route('/overview', function() {
    resetLocationStyle();
    displayDetailPannel();
    map.fitBounds(options.projectExtent);
  });

  route('/', function() {
    // Zoom back out to project extent.
    resetLocationStyle();
    displayDetailPannel();
    map.fitBounds(options.projectExtent);
  });

  route('/locations/new', function() {
    // Zoom into project bounds.
    displayDetailPannel();
    smap.add_map_controls();
  });

  route('/records/location', function() {
    // Zoom into project bounds.
    if (current_location) {
      centerOnLocation(current_location);
    }
    hideModal();
    displayDetailPannel();
  });

  route('/records/location/delete', function() {
    // Zoom into project bounds.
    displayModal('additionals_modals');
    displayDetailPannel();
    return document.getElementById("additional_modals")
  });

  route('/records/location/resources/add', function() {
    displayModal('additionals_modals');
    displayDetailPannel();
    return document.getElementById("additional_modals")
  });

  route('/records/location/resources/new', function() {
    displayModal('additionals_modals');
    displayDetailPannel();
    return document.getElementById("additional_modals")
  });

  route('/records/location/relationships/new', function() {
    displayModal('additionals_modals');
    displayDetailPannel();
    return document.getElementById("additional_modals")
  });

  route('/records/relationship', function() {
    // displayModal('additionals_modals');
    displayDetailPannel();
    // return document.getElementById("additional_modals")
  });

  var el = null;
  function router() {
    var hash_path = location.hash.slice(1) || '/';
    var view_url = '/async' + location.pathname;

    if (hash_path !== '/') {
      view_url = view_url + hash_path.substr(1) + '/';
    }

    if (hash_path.includes('records/location')){
      if (hash_path.includes('delete')) {
        hash_path = '/records/location/delete';
      } else if (hash_path.includes('resources')) {
        if (hash_path.includes('add'))
          hash_path = '/records/location/resources/add';
        else if (hash_path.includes('new')) {
          hash_path = '/records/location/resources/new';
        }
      } else if (hash_path.includes('relationships/new')) {
        hash_path = '/records/location/relationships/new';
      } else {
        hash_path = '/records/location';
      }

    } else if (hash_path.includes('records/relationship')){
      if (hash_path.includes('delete')) {
        hash_path = '/records/relationship/delete';
      } else if (hash_path.includes('resources')) {
        if (hash_path.includes('add'))
          hash_path = '/records/relationship/resources/add';
        else if (hash_path.includes('new')) {
          hash_path = '/records/relationship/resources/new';
        }
      } else if (hash_path.includes('relationships/new')) {
        hash_path = '/records/relationship/relationships/new';
      } else {
        hash_path = '/records/relationship';
      }
    }
    console.log(hash_path);

    var route = routes[hash_path];
    el = route.controller() || document.getElementById('project-detail');

    $.get(view_url, function(response){
      el.innerHTML = response;
    });
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

  function displayModal(modal_id) {
    if (!$("#additional_modals").is(':visible')) {
      $("#additional_modals").modal('show');
    }
  }

  function hideModal() {
    if ($("#additional_modals").is(':visible')) {
      $("#additional_modals").modal('hide');
    }
  }

  function centerOnLocation(location) {
    var bounds;
    if (typeof(location.getBounds) === 'function'){
      bounds = location.getBounds();
    } else {
      // If the spatial unit is a marker
      var latLngs = [location.getLatLng()];
      bounds = L.latLngBounds(latLngs);
    }
    if (bounds.isValid()){
      map.fitBounds(bounds);
    }

    if (location.setStyle) {
      location.setStyle({color: '#edaa00', fillColor: '#edaa00', weight: 3})
    }
  }

  function setCurrentLocation () {
    map.on("popupopen", function(evt){
      currentPopup = evt.popup;

      $('#spatial-pop-up').click(function(e){
        resetLocationStyle();
        current_location = currentPopup._source
        map.closePopup();
      });
    });
  }

  setCurrentLocation();

  function resetLocationStyle() {
    if (current_location && current_location.setStyle) {
      current_location.setStyle({color: '#3388ff', fillColor: '#3388ff', weight: 2})  
    }
  }

  return {
    router: router,
  };
};


var sr = new SimpleRouter();

window.addEventListener('hashchange', sr.router);
window.addEventListener('load', sr.router);
