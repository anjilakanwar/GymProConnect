from rest_framework import viewsets
from .models import Equipment, Supplier, PurchaseLog, Discount, TransactionLog, Sale, OnlineSale, OfflineSalesLog
from .serializers import (
    EquipmentSerializer, SupplierSerializer, PurchaseLogSerializer,
    DiscountSerializer, TransactionLogSerializer, SaleSerializer,
    OnlineSaleSerializer, OfflineSalesLogSerializer
)


class EquipmentViewSet(viewsets.ModelViewSet):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer


class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer


class PurchaseLogViewSet(viewsets.ModelViewSet):
    queryset = PurchaseLog.objects.all()
    serializer_class = PurchaseLogSerializer


class DiscountViewSet(viewsets.ModelViewSet):
    queryset = Discount.objects.all()
    serializer_class = DiscountSerializer


class TransactionLogViewSet(viewsets.ModelViewSet):
    queryset = TransactionLog.objects.all()
    serializer_class = TransactionLogSerializer


class SaleViewSet(viewsets.ModelViewSet):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer


class OnlineSaleViewSet(viewsets.ModelViewSet):
    queryset = OnlineSale.objects.all()
    serializer_class = OnlineSaleSerializer


class OfflineSalesLogViewSet(viewsets.ModelViewSet):
    queryset = OfflineSalesLog.objects.all()
    serializer_class = OfflineSalesLogSerializer