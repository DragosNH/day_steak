from django.shortcuts import render

def home(request):
    return render(request, 'myapp/home.html')

def login(request):
    return render(request, 'myapp/login.html')