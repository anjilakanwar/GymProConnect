# Generated by Django 5.0.4 on 2024-05-19 05:38

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('equipment', '0016_alter_equipment_image_alter_equipment_manufracturer'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='equipment',
            name='image',
        ),
        migrations.AddField(
            model_name='equipment',
            name='thumbnail',
            field=models.FileField(default='images/equipments/fallback.png', upload_to='images/equipments/'),
        ),
        migrations.CreateModel(
            name='EquipmentPictures',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('equipment_img', models.ImageField(default='', upload_to='images/equipments/')),
                ('equipment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='equipment.equipment')),
            ],
        ),
    ]