from jsonattrs.mixins import JsonAttrsMixin
from core.views import generic
from core.mixins import LoginPermissionRequiredMixin
from organization.views import mixins as organization_mixins
from resources.views import mixins as resource_mixins
from . import mixins
from .. import messages as error_messages


class PartyRelationshipDetail(LoginPermissionRequiredMixin,
                              JsonAttrsMixin,
                              mixins.PartyRelationshipObjectMixin,
                              organization_mixins.ProjectAdminCheckMixin,
                              resource_mixins.HasUnattachedResourcesMixin,
                              resource_mixins.DetachableResourcesListMixin,
                              generic.DetailView):
    template_name = 'party/relationship_detail.html'
    permission_required = 'tenure_rel.view'
    permission_denied_message = error_messages.TENURE_REL_VIEW
    attributes_field = 'attributes'
