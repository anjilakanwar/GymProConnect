from rest_framework import viewsets
from rest_framework.response import Response

from .models import Equipment, OrderHistory, Supplier, PurchaseLog, Discount, TransactionLog, Sale, OnlineSale, OfflineSalesLog
from .serializers import (
    EquipmentSerializer, OrderHistorySerializer, SupplierSerializer, PurchaseLogSerializer,
    DiscountSerializer, TransactionLogSerializer, SaleSerializer,
    OnlineSaleSerializer, OfflineSalesLogSerializer
)


class EquipmentViewSet(viewsets.ModelViewSet):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer
    
    def create(self, request, *args, **kwargs):
        request.data['item_name'] = request.data['name']
        
        order_history = OrderHistorySerializer(data=request.data)
        
        if order_history.is_valid():
            order_history.save()
            return super().create(request, *args, **kwargs)
        
        return Response({"error" : "Failed to Set Order"}, status=403)
    

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
    
    
class OrderHistoryViewSet(viewsets.ModelViewSet):
    queryset = OrderHistory.objects.all()
    serializer_class = OrderHistorySerializer