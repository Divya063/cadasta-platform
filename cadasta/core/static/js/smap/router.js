// Based on http://joakim.beng.se/blog/posts/a-javascript-router-in-20-lines.html
var SimpleRouter = function(){
  var routes = {};
  var state = {}

  function route(path, templateID, controller) {
    routes[path] = {templateID: templateID, controller: controller};
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
    if (!state.project){
      jqxhr = $.getJSON(dashboard_url, function(response){
        console.log('response: ', response);
        state.project = response;
        console.log('state: ', state);
      });

      jqxhr.complete(function() {
        console.log('state at setting vars: ', state);
        this.contacts = state.project.contacts || null;
        this.urls = state.project.urls || null;
        this.description = state.project.description || null;
        this.num_locations = state.project.spatial_units.features.length || 0;
        this.num_parties = state.project.parties.length || 0;
        this.num_resources = state.project.resources.length || 0;
        displayDetailPannel();
      });
    }
  });

  route('/', 'overview-tab', function() {
    displayDetailPannel();
  });

  route('/location', 'location-tab', function() {
    this.object = 'location';
    displayDetailPannel();
  });


  var el = null;
  function router() {
    el = el || document.getElementById('project-detail');
    var url = location.hash.slice(1) || '/';
    var route = routes[url];
    if (el && route.controller) {
      el.innerHTML = TemplateEngine(route.templateID, new route.controller());
    }
  }

  return {
    router: router,
  };
};

var sr = new SimpleRouter();

window.addEventListener('hashchange', sr.router);
window.addEventListener('load', sr.router);
