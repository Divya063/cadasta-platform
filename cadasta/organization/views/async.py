from tutelary.mixins import APIPermissionRequiredMixin
from rest_framework import generics

from . import mixins
from .. import serializers


class ProjectDashboard(APIPermissionRequiredMixin,
                       mixins.ProjectMixin,
                       mixins.ProjectQuerySetMixin,
                       generics.RetrieveAPIView):
    def get_actions(self, request):
        if self.get_object().archived:
            return 'project.view_archived'
        if self.get_object().public():
            return 'project.view'
        else:
            return 'project.view_private'

    serializer_class = serializers.ProjectStateSerializer
    filter_fields = ('archived',)
    lookup_url_kwarg = 'project'
    lookup_field = 'slug'
    permission_required = {
        'GET': get_actions,
        # 'PATCH': patch_actions,
        # 'PUT': patch_actions,
    }

    def get_perms_objects(self):
        return [self.get_object()]

    # def get_queryset(self):
    #     return self.get_organization(
    #         lookup_kwarg='organization').projects.all()
