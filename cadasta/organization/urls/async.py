from django.conf.urls import include, url

from ..views import async


urls = [
    url(
        r'^$',
        async.ProjectDashboard.as_view(),
        name='dashboard'),
]


urlpatterns = [
    url(
        r'^organizations/(?P<organization>[-\w]+)/projects/'
        '(?P<project>[-\w]+)/',
        include(urls)),
]
