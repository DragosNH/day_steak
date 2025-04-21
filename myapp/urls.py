from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('login/', views.login_view, name='login'),
    path('signup/', views.signup, name='signup'),
    path('forgotPassword/', views.forgot_password, name="forgotPassword"),
    path('mainPage/', views.main_page, name="mainPage")
]