
from django.urls import include, path

from rest_framework import routers
from .views import (
    EquipmentViewSet, SupplierViewSet, PurchaseLogViewSet,
    DiscountViewSet, TransactionLogViewSet, SaleViewSet,
    OnlineSaleViewSet, OfflineSalesLogViewSet
)

router = routers.DefaultRouter()

router.register(r'equipment', EquipmentViewSet, basename='equipment')
router.register(r'supplier', SupplierViewSet, basename='supplier')
router.register(r'purchaselog', PurchaseLogViewSet, basename='purchaselog')
router.register(r'discount', DiscountViewSet, basename='discount')
router.register(r'transactionlog', TransactionLogViewSet, basename='transactionlog')
router.register(r'sale', SaleViewSet, basename='sale')
router.register(r'onlinesale', OnlineSaleViewSet, basename='onlinesale')
router.register(r'offlinesaleslog', OfflineSalesLogViewSet, basename='offlinesaleslog')

urlpatterns = router.urls
