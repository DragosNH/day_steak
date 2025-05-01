from django.urls import path
from . import views
from . import views_api
from .views_api import task_detail_update

urlpatterns = [
    path('', views.home, name='home'),
    path('login/', views.login_view, name='login'),
    path('signup/', views.signup, name='signup'),
    path('forgotPassword/', views.forgot_password, name="forgotPassword"),
    path('mainPage/', views.main_page, name="mainPage"),

    path('api/categories/', views_api.category_list_create, name='api-categories'),
    path('api/tasks/', views_api.task_list_create, name='api-tasks'),
    path('api/tasks/<int:pk>/', task_detail_update),
]
