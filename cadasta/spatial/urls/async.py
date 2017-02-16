from django.conf.urls import include, url

from ..views import async, default


urls = [
    # url(
    #     r'^spatial/$',
    #     async.SpatialUnitList.as_view(),
    #     name='list'),
    url(
        r'^spatial/tiled/(?P<z>[0-9]+)/(?P<x>[0-9]+)/(?P<y>[0-9]+)/$',
        async.SpatialUnitTiles.as_view(),
        name='tiled'),
    url(
        r'^records/location/(?P<location>[-\w]+)/$',
        async.LocationDetail.as_view(),
        name='detail'),
    url(
        r'^locations/new/$',
        async.LocationsAdd.as_view(),
        name='add'),
]


urlpatterns = [
    url(
        r'^organizations/(?P<organization>[-\w]+)/projects/'
        '(?P<project>[-\w]+)/',
        include(urls)),
    # url(urls.tilepath(r'^organizations/(?P<organization>[-\w]+)/projects/'
    #     '(?P<project>[-\w]+)/spatial/'),
    #     async.SpatialUnitList.as_view(),
    #     name='location-tiles'),
]
