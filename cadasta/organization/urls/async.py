from django.conf.urls import include, url

from ..views import default


urls = [
    url(
        r'^overview/$',
        default.ProjectDashboard.as_view(),
        name='dashboard'),
    url(
        r'^$',
        default.ProjectDashboard.as_view(),
        name='still_dashboard'),
]


urlpatterns = [
    url(
        r'^organizations/(?P<organization>[-\w]+)/projects/'
        '(?P<project>[-\w]+)/',
        include(urls)),
]
