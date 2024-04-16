from django.db import models
from django.contrib.auth import get_user_model

class Equipment(models.Model):
    CARDIO = 'Cardio'
    STRENGTH_TRAINING = 'Strength Training'
    FUNCTIONAL_TRAINING = 'Functional Training'
    FLEXIBILITY_MOBILITY = 'Flexibility & Mobility'
    FREE_WEIGHTS = 'Free Weights'
    MACHINES = 'Machines'
    ACCESSORIES = 'Accessories'
    UNCLASSIFIED = 'Unclassified'

    EQUIPMENT_CHOICES = [
        (CARDIO, 'Cardio'),
        (STRENGTH_TRAINING, 'Strength Training'),
        (FUNCTIONAL_TRAINING, 'Functional Training'),
        (FLEXIBILITY_MOBILITY, 'Flexibility & Mobility'),
        (FREE_WEIGHTS, 'Free Weights'),
        (MACHINES, 'Machines'),
        (ACCESSORIES, 'Accessories'),
        (UNCLASSIFIED, 'Unclassified'),
    ]
    
    equipment_id = models.AutoField(primary_key=True)
    name = models.CharField(blank=False, max_length=50)
    equipment_type = models.CharField(max_length=50, choices=EQUIPMENT_CHOICES, default=UNCLASSIFIED)
    manufracturer = models.CharField(max_length=50, default=None)
    count = models.IntegerField(default=0)
    
    
class Supplier(models.Model):
    supplier_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    contact_info = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    
    
class Discount(models.Model):
    equipment = models.ForeignKey(Equipment, on_delete=models.CASCADE)
    discount_percentage = models.DecimalField(max_digits=5, decimal_places=2)
    start_date = models.DateField()
    end_date = models.DateField()
    

class TransactionLog(models.Model):
    transaction_id = models.AutoField(primary_key=True)
    transaction_date = models.DateTimeField(auto_now=True)
    discount = models.ForeignKey(Discount, on_delete=models.CASCADE)
    total = models.BigIntegerField(blank=False)
    
    
class PurchaseLog(models.Model):
    transcation = models.ForeignKey(TransactionLog, on_delete=models.DO_NOTHING)
    equipment = models.ForeignKey(Equipment, on_delete=models.DO_NOTHING)
    supplier = models.ForeignKey(Supplier, on_delete=models.DO_NOTHING)
    purchase_date = models.DateField()
    purchase_price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField()
    remarks = models.TextField(blank=True, null=True)

    
class Sale(models.Model):
    equipment = models.ForeignKey(Equipment, on_delete=models.CASCADE)
    sales_made_by = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    transaction = models.ForeignKey(TransactionLog, on_delete=models.CASCADE)
    

class OnlineSale(models.Model):
    sale = models.OneToOneField(Sale, on_delete=models.CASCADE, primary_key=True)
    payment_method = models.CharField(max_length=100)
    transaction = models.ForeignKey(TransactionLog, on_delete=models.CASCADE)
    delivery_status = models.CharField(max_length=100)


class OfflineSalesLog(models.Model):
    equipment = models.ForeignKey(Equipment, on_delete=models.CASCADE)
    transaction = models.ForeignKey(TransactionLog, on_delete=models.CASCADE)
    sales_made_by = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)