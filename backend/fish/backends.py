from django.contrib.auth.backends import ModelBackend
from django.core.exceptions import PermissionDenied


class CustomPermissionBackend(ModelBackend):
    def has_perm(self, user_obj, perm, obj=None):
        if not user_obj.is_active:
            return False

        if user_obj.is_superuser:
            return True

        if user_obj.user_type == "visitor":
            return perm.endswith("view")

        if user_obj.user_type == "registered":
            return perm.endswith("view") or perm.endswith("add")

        if user_obj.user_type == "contributor":
            if perm.endswith("view") or perm.endswith("add"):
                return True
            if perm.endswith("change") or perm.endswith("delete"):
                return obj is None or obj.added_by == user_obj

        if user_obj.user_type == "trusted_contributor":
            return (
                perm.endswith("view") or perm.endswith("add") or perm.endswith("change")
            )

        if user_obj.user_type == "moderator":
            return True

        if user_obj.user_type == "admin":
            return True

        return False

    def has_module_perms(self, user_obj, app_label):
        return user_obj.is_active and (user_obj.is_staff or user_obj.is_superuser)
