# Generated by Django 4.2.1 on 2023-05-28 04:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_venues_delete_react'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Venues',
            new_name='Venue',
        ),
    ]