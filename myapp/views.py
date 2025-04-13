from django.shortcuts import render

def home(request):
    return render(request, 'myapp/home.html')

def login(request):
    return render(request, 'myapp/login.html')

def signup(request):
    return render(request, 'myapp/signup.html')

def forgot_password(request):
    return render(request, 'myapp/forgotPassword.html')