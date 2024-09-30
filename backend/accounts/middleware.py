from django.shortcuts import redirect


class ProfileCompletionMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.user.is_authenticated and not request.user.profile_completed:
            # Prevent users from accessing any page except the profile completion page
            if request.path != "/accounts/complete-profile/":
                return redirect("complete_profile")

        response = self.get_response(request)
        return response
