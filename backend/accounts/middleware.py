from django.shortcuts import render
import logging

logger = logging.getLogger(__name__)


class CustomExceptionHandler:
    def __init__(self, get_response):  # Accept 'get_response' as an argument
        self.get_response = (
            get_response  # Store it for later use in process_request/process_view/etc.
        )

    def __call__(self, request):
        response = self.process_request(request)
        if response is None:
            response = self.get_response(request)
        return response

    def process_request(self, request):
        # You can add custom logic here to handle requests before the view is called
        pass

    def process_view(self, request, view_func, view_args, view_kwargs):
        # Handle exceptions that occur in views if needed
        pass

    def process_exception(self, request, exception):
        logger.error(f"An error occurred: {str(exception)}")
        return render(request, "errors/error.html", {"error": str(exception)})
