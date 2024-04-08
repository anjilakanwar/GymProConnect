from rest_framework import serializers
from .models import Equipment, Supplier, PurchaseLog, Discount, TransactionLog, Sale, OnlineSale, OfflineSalesLog


class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = '__all__'


class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = '__all__'


class PurchaseLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseLog
        fields = '__all__'


class DiscountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discount
        fields = '__all__'


class TransactionLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransactionLog
        fields = '__all__'


class SaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = '__all__'


class OnlineSaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = OnlineSale
        fields = '__all__'


class OfflineSalesLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = OfflineSalesLog
        fields = '__all__'