# Generated by Django 5.0.1 on 2024-01-19 15:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0007_employee_first_name_employee_last_name_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='employee',
            name='first_name',
        ),
        migrations.RemoveField(
            model_name='employee',
            name='last_name',
        ),
        migrations.RemoveField(
            model_name='employee',
            name='username',
        ),
    ]
