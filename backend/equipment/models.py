from django.db import models
from django.contrib.auth import get_user_model

class Equipment(models.Model):
    equipment_id = models.AutoField(primary_key=True)
    name = models.CharField(blank=False, max_length=50)
    weight_class = models.FloatField(blank=False, default=0)
    manufracturer = models.CharField(max_length=50, default="-")
    category = models.CharField(max_length=50, default="Unknown")
    count = models.IntegerField(default=0)
    thumbnail = models.FileField(upload_to="images/equipments/", default="images/equipments/fallback.png", )
    price_per = models.FloatField()

class EquipmentPictures(models.Model):
    equipment = models.ForeignKey(Equipment, on_delete=models.CASCADE)
    equipment_img = models.ImageField(upload_to="images/equipments/", default="images/equipments/fallback.png", )
    
    
class Supplier(models.Model):
    supplier_id = models.AutoField(primary_key=True)
    supplier_code = models.CharField(max_length=5, unique=True, blank=False, null=False)
    name = models.CharField(max_length=100)
    contact_info = models.CharField(max_length=200, unique=True)
    email = models.EmailField()
    address = models.CharField(max_length=200)
    
    
class Discount(models.Model):
    equipment = models.ForeignKey(Equipment, on_delete=models.CASCADE)
    discount_percentage = models.DecimalField(max_digits=5, decimal_places=2)
    start_date = models.DateField()
    end_date = models.DateField()
    

class TransactionLog(models.Model):
    transaction_id = models.AutoField(primary_key=True)
    transaction_date = models.DateTimeField(auto_now=True)
    transaction_ref = models.CharField(max_length=50)
    discount = models.IntegerField()
    total = models.BigIntegerField(blank=False)
    payment_method = models.CharField(max_length=100)
    
    
class OrderHistory(models.Model):
    order_id = models.AutoField(primary_key=True)
    order_date = models.DateField(auto_now=True)
    item_name = models.CharField(max_length=30)
    supplier_name = models.CharField(max_length=30, null=False, blank=False)
    count = models.IntegerField()
    
    
class PurchaseLog(models.Model):
    transcation = models.ForeignKey(TransactionLog, on_delete=models.DO_NOTHING)
    equipment = models.ForeignKey(Equipment, on_delete=models.DO_NOTHING)
    supplier = models.ForeignKey(Supplier, on_delete=models.DO_NOTHING)
    purchase_date = models.DateField()
    purchase_price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField()
    remarks = models.TextField(blank=True, null=True)


class OfflineSalesLog(models.Model):
    equipment = models.ForeignKey(Equipment, on_delete=models.CASCADE)
    transaction = models.ForeignKey(TransactionLog, on_delete=models.CASCADE)
    sales_made_by = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)