from django.conf.urls import include, url

from ..views import async


urls = [
    url(
        r'^records/relationship/(?P<relationship>[-\w]+)/$',
        async.PartyRelationshipDetail.as_view(),
        name='relationship_detail'),
]


urlpatterns = [
    url(
        r'^organizations/(?P<organization>[-\w]+)/projects/'
        '(?P<project>[-\w]+)/',
        include(urls)),
]
