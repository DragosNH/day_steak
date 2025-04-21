from django import forms  
from django.contrib.auth.models import User  
from django.contrib.auth.forms import UserCreationForm  
from django.core.exceptions import ValidationError  
from django.forms.fields import EmailField  
from django.forms.forms import Form  
from django.contrib.auth.forms import AuthenticationForm
from django import forms

class CustomUserCreationForm(UserCreationForm):
    username = forms.CharField(
        label='username',
        min_length=5,
        max_length=150,
        widget=forms.TextInput(attrs={
            'placeholder': 'Username',
            'class': '', 
        })
    )
    email = forms.EmailField(
        label='email',
        widget=forms.EmailInput(attrs={
            'placeholder': 'E-mail address',
            'class': '',
        })
    )
    password1 = forms.CharField(
        label='password',
        widget=forms.PasswordInput(attrs={
            'placeholder': 'Password',
            'class': '',
        })
    )
    password2 = forms.CharField(
        label='Confirm password',
        widget=forms.PasswordInput(attrs={
            'placeholder': 'Confirm password',
            'class': '',
        })
    )
    
    def save(self, commit=True):
        print("✅ Saving user:", self.cleaned_data['username'])
        user = User.objects.create_user(
            self.cleaned_data['username'],
            self.cleaned_data['email'],
            self.cleaned_data['password1']
        )
        if commit:
            user.save()
        return user

class CustomLoginForm(AuthenticationForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['username'].widget.attrs.update({
            'placeholder': 'Username'
        })
        self.fields['password'].widget.attrs.update({
            'placeholder': 'Password'
        })