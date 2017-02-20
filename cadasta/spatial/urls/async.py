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
        r'^records/location/(?P<location>[-\w]+)/edit/$',
        async.LocationEdit.as_view(),
        name='edit'),
    url(
        r'^records/location/(?P<location>[-\w]+)/delete/$',
        async.LocationDelete.as_view(),
        name='delete'),
    url(
        r'^records/location/(?P<location>[-\w]+)/$',
        async.LocationDetail.as_view(),
        name='detail'),

    url(
        r'^records/location/(?P<location>[-\w]+)/resources/add/$',
        async.LocationResourceAdd.as_view(),
        name='resource_add'),
    url(
        r'^records/location/(?P<location>[-\w]+)/resources/new/$',
        async.LocationResourceNew.as_view(),
        name='resource_new'),

    url(
        r'^records/location/(?P<location>[-\w]+)/relationships/new/$',
        async.TenureRelationshipAdd.as_view(),
        name='relationship_add'),

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
