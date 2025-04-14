# Generated by Django 5.1.7 on 2025-04-14 15:31

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Users',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=15, unique=True)),
                ('first_name', models.CharField(max_length=15)),
                ('last_name', models.CharField(max_length=35)),
                ('emails', models.EmailField(max_length=50, unique=True)),
                ('password', models.CharField(max_length=25)),
            ],
        ),
    ]
