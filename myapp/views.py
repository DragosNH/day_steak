from django.shortcuts import render, redirect
from .forms import CustomUserCreationForm
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login
from django.shortcuts import render, redirect

def home(request):
    return render(request, 'myapp/home.html')

# ---------- Log in page ----------
def login_view(request):
    if request.method == "POST":
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('mainPage') 
    else:
        form = AuthenticationForm()

    return render(request, 'myapp/login.html', {'form': form})
# ---------- Sign Up page ---------- 
def signup(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            print("✅ User created")
        else:
            print("❌ Form is not valid")
            print(form.errors)
    else:
        form = CustomUserCreationForm()

    return render(request, 'myapp/signup.html', {'form': form})

def forgot_password(request):
    return render(request, 'myapp/forgotPassword.html')

def main_page(request):
    return render(request, "myapp/mainPage.html")

