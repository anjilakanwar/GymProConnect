from pyexpat import model
from rest_framework import serializers
from .models import Equipment, EquipmentPictures, OrderHistory, Supplier, PurchaseLog, Discount, TransactionLog, OfflineSalesLog


class EquipmentPictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = EquipmentPictures
        fields = ['equipment_img']

class EquipmentSerializer(serializers.ModelSerializer):
    pictures = serializers.SerializerMethodField()
    
    class Meta:
        model = Equipment
        fields = '__all__'
        
    def get_pictures(self, obj):
        request = self.context.get('request')
        pictures = EquipmentPictures.objects.filter(equipment=obj)
        return [request.build_absolute_uri(picture.equipment_img.url) for picture in pictures if picture.equipment_img]


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


class OfflineSalesLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = OfflineSalesLog
        fields = '__all__'
        
        
class OrderHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderHistory
        fields = '__all__'