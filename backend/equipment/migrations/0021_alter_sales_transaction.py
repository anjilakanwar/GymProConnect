# Generated by Django 5.0.4 on 2024-05-20 07:42

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('equipment', '0020_sales'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sales',
            name='transaction',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='equipment.transactionlog'),
        ),
    ]