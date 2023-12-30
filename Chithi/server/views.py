# Import necessary modules and classes
from django.db.models import Count
from drf_spectacular.utils import extend_schema
from rest_framework import viewsets
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

# Import the Server model and its serializer
from .models import Category, Server
from .schema import server_list_docs
from .serializer import CategorySerializer, ServerSerializer


class CategoryListViewSet(viewsets.ViewSet):
    queryset = Category.objects.all()

    @extend_schema(responses=CategorySerializer)
    def list(self, request):
        serailzer = CategorySerializer(self.queryset, many=True)
        return Response(serailzer.data)

# Define a class for handling server list views
class ServerListView(viewsets.ViewSet):
    # Set the initial queryset to include all Server objects
    queryset = Server.objects.all()
    # permission_classes = [IsAuthenticated]

    # Define the 'list' method to handle GET requests
    @server_list_docs
    def list(self, request):
        """
        Handles the retrieval and filtering of server objects based on query parameters.

        Args:
            request (HttpRequest): The HTTP request object containing query parameters.

        Returns:
            Response: An HTTP response containing a serialized list of server objects.

        Raises:
            AuthenticationFailed: If the request attempts to filter by user or server ID
                without proper authentication.
            ValidationError: If there are validation errors related to query parameters.

        This view class retrieves query parameters from the provided HTTP request and uses
        them to filter and annotate a queryset of server objects. The filtering can be based
        on category, user, the presence of a 'num_members' annotation, and limiting the
        resulting queryset to a specified quantity.

        - 'category': If provided, filters servers by their category name.
        - 'quantity': If provided, limits the queryset to a specified number of items.
        - 'by_user': If 'true', filters servers by the currently authenticated user.
        - 'by_serverid': Filters servers by their unique server ID.
        - 'with_num_members': If 'true', annotates the queryset with the number of members
        in each server.

        Authentication is enforced to prevent unauthorized access to user-specific data.
        Validation checks are performed to ensure the correctness of query parameters.

        Additionally, this view class serializes the resulting queryset using the ServerSerializer
        and returns the serialized data as an HTTP response.
        """

        # Retrieve query parameters from the request
        category = request.query_params.get("category")
        quantity = request.query_params.get("quantity")
        by_user = request.query_params.get("by_user") == "true"
        by_serverid = request.query_params.get("by_serverid")
        with_num_members = request.query_params.get("with_num_members") == "true"

        # Apply filters based on query parameters
        if category:
            self.queryset = self.queryset.filter(category__name=category)

        if by_user:
            if by_user and request.user.is_authenticated:
                user_id = request.user.id
                self.queryset = self.queryset.filter(members=user_id)
            else:
                raise AuthenticationFailed()

        if with_num_members:
            # Annotate the queryset with the number of members in each server
            self.queryset = self.queryset.annotate(num_members=Count("members"))

        if quantity:
            # Limit the queryset to a specified number of items
            self.queryset = self.queryset[: int(quantity)]

        if by_serverid:
            if not request.user.is_authenticated:
                raise AuthenticationFailed()

            try:
                # Filter the queryset by server ID and handle validation errors
                self.queryset = self.queryset.filter(id=by_serverid)
                if not self.queryset.exists():
                    raise ValidationError(detail=f"{by_serverid} Server not found")
            except ValueError:
                raise ValidationError(detail="Enter a proper server name")

        # Serialize the queryset using the ServerSerializer
        serializer = ServerSerializer(self.queryset, many=True, context={"num_members": with_num_members})

        # Return the serialized data as a response
        return Response(serializer.data)
