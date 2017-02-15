// Based on http://joakim.beng.se/blog/posts/a-javascript-router-in-20-lines.html
var SimpleRouter = function(){
  var routes = {};
  // var state = {}

  function route(path, templateID, controller) {
    routes[path] = {templateID: templateID,
                    controller: controller};
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

  route('/map', 'map-tab', function() {
    hideDetailPannel();
  });

  route('/overview', 'overview-tab', function() {
    displayDetailPannel();
  });

  route('/', 'overview-tab', function() {
    // Zoom back out to project extent.
    displayDetailPannel();
  });

  route('/records/location', 'location-tab', function() {
    // Zoom into project bounds.
    displayDetailPannel();
  });


  // var dashboard_url = '{% url "async:project:dashboard" project.organization.slug project.slug %}'



  var el = null;
  function router() {
    el = el || document.getElementById('project-detail');
    var url = location.hash.slice(1) || '/';

    var view_url = '/async' + location.pathname;
    if (url !== '/') {
      view_url = view_url + url.substr(1) + '/';
    }

    if (url.includes('records')) {
      if (url.includes('location')) {
        url = '/records/location';
      }
    }

    var route = routes[url];

    if (el && route.controller) {
      $.get(view_url, function(response){
        el.innerHTML = response;
      });
      route.controller();
    }
  }

  return {
    router: router,
  };
};

var sr = new SimpleRouter();

window.addEventListener('hashchange', sr.router);
window.addEventListener('load', sr.router);
