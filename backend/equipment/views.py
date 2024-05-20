import json
from django.conf import settings
from django.http import HttpRequest

from django.shortcuts import redirect
import requests
from rest_framework import viewsets, status, views
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import authentication_classes

import equipment
from equipment.utils import generate_code, generate_random_string

from .models import (
    Equipment,
    EquipmentPictures,
    OrderHistory,
    Supplier,
    PurchaseLog,
    Discount,
    TransactionLog,
    OfflineSalesLog,
)
from .serializers import (
    EquipmentSerializer,
    OrderHistorySerializer,
    SupplierSerializer,
    PurchaseLogSerializer,
    DiscountSerializer,
    TransactionLogSerializer,
    OfflineSalesLogSerializer,
)


def verify_payment(request):
    if request.method == "GET":
        data = request.GET

        if data["status"] == "Completed":
            transcation = TransactionLog(
                discount=0,
                total=data["total_amount"],
                transaction_ref=data["transaction_id"],
                payment_method="Khalti",
            )
            transcation.save()

        return redirect("http://localhost:3030/")


class PaymentAPIView(views.APIView):
    def post(self, request):
        if request.method == "POST":
            url = "https://a.khalti.com/api/v2/epayment/initiate/"

            data = json.loads(request.body)
            orderNameID = generate_random_string()

            product_details = []

            for item in data[:-1]:
                formatted_item = {
                    "identity": item["id"],
                    "name": item["name"],
                    "total_price": item["qty"] * item["price_per"],
                    "quantity": item["qty"],
                    "unit_price": item["price_per"],
                }
                product_details.append(formatted_item)

            payload = json.dumps(
                {
                    "return_url": f"{settings.HOSTNAME}verify-payment//",
                    "website_url": settings.HOSTNAME,
                    "amount": data[-1],
                    "purchase_order_id": orderNameID,
                    "purchase_order_name": orderNameID,
                    "customer_info": {
                        "name": request.user.get_full_name(),
                        "email": request.user.email,
                        "phone": request.user.phone_number,
                    },
                    "product_details": product_details,
                }
            )

            headers = {
                "Authorization": "Key " + settings.KHALTI_SECRET_KEY,
                "Content-Type": "application/json",
            }

            response = requests.request("POST", url, headers=headers, data=payload)

            if response.status_code == 200:
                return Response(response.json(), 200)
            else:
                print(response.text)
                return Response(response.text, 403)

        return Response(200)


class EquipmentViewSet(viewsets.ModelViewSet):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer

    def create(self, request: HttpRequest, *args, **kwargs):
        image_files = request.FILES.getlist("image[]")

        request.data._mutable = True
        request.data.update({"thumbnail": image_files[0]})

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        for image_file in image_files:
            image = EquipmentPictures(
                equipment_img=image_file,
                equipment=Equipment.objects.get(pk=serializer.data["equipment_id"]),
            )
            image.save()

        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )


class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer
    permission_classes = [IsAdminUser]

    def create(self, request, *args, **kwargs):
        request.data["supplier_code"] = generate_code(request.data["name"])

        serializer = SupplierSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(status=200)
        else:
            return Response(status=400)


class PurchaseLogViewSet(viewsets.ModelViewSet):
    queryset = PurchaseLog.objects.all()
    serializer_class = PurchaseLogSerializer


class DiscountViewSet(viewsets.ModelViewSet):
    queryset = Discount.objects.all()
    serializer_class = DiscountSerializer


class TransactionLogViewSet(viewsets.ModelViewSet):
    queryset = TransactionLog.objects.all()
    serializer_class = TransactionLogSerializer


class OfflineSalesLogViewSet(viewsets.ModelViewSet):
    queryset = OfflineSalesLog.objects.all()
    serializer_class = OfflineSalesLogSerializer


class OrderHistoryViewSet(viewsets.ModelViewSet):
    queryset = OrderHistory.objects.all()
    serializer_class = OrderHistorySerializer
    permission_classes = [IsAdminUser]
