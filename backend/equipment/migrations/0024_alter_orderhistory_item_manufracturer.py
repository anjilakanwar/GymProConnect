# Generated by Django 5.0.4 on 2024-05-27 07:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('equipment', '0023_orderhistory_item_manufracturer'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderhistory',
            name='item_manufracturer',
            field=models.CharField(default='Unknown', max_length=50),
        ),
    ]