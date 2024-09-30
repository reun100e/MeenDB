from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required


def home(request):
    return render(request, "home.html")


@login_required  # Ensure only logged-in users can access this view
def complete_profile(request):
    if request.method == "POST":
        # Get data from the form
        age = request.POST.get("age")
        college = request.POST.get("college")
        degree = request.POST.get("degree")

        # Update the user's profile
        request.user.age = age
        request.user.college = college
        request.user.degree = degree
        request.user.profile_completed = True  # Mark profile as complete
        request.user.save()

        # Redirect the user to a home page or wherever you want after completion
        return redirect("home")

    # If GET request, just show the form
    return render(request, "accounts/complete_profile.html")
