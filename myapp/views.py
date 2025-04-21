from django.shortcuts import render, redirect
from .forms import CustomUserCreationForm

def home(request):
    return render(request, 'myapp/home.html')

# ---------- Log in page ----------
def login(request):
    return render(request, 'myapp/login.html')

# ---------- Sign Up page ---------- 
def signup(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            print("✅ User created")
        else:
            print("❌ Form is not valid")
            print(form.errors)  # <-- This shows why it's failing
    else:
        form = CustomUserCreationForm()

    return render(request, 'myapp/signup.html', {'form': form})

def forgot_password(request):
    return render(request, 'myapp/forgotPassword.html')

