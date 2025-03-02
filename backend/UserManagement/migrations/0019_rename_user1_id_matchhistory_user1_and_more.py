# Generated by Django 5.1 on 2024-10-06 14:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('UserManagement', '0018_remove_matchhistory_component_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='matchhistory',
            old_name='user1_id',
            new_name='user1',
        ),
        migrations.RenameField(
            model_name='matchhistory',
            old_name='user2_id',
            new_name='user2',
        ),
        migrations.RenameField(
            model_name='matchhistory',
            old_name='winner_id',
            new_name='winner',
        ),
        migrations.AlterField(
            model_name='relationship',
            name='status',
            field=models.CharField(choices=[('send', 'send'), ('accepted', 'accepted')], max_length=50),
        ),
    ]
