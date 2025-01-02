"""
URL configuration for mysite project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from megan import views
from megan.views import *


urlpatterns = [
    path('admin/', admin.site.urls),
    path('register',register_view, name='register'),
    path('login', login_view, name='login'),   
    path('courses', list_courses, name='list_courses'),
    path('add_course', add_course_to_learner, name='add_course_to_learner'),
     path('delete_course',delete_course_from_learner, name='delete_course_from_learner'),
    path('courses/search/title/', search_courses_by_title, name='search_courses_by_title'),
    path('courses/search/difficulty/', search_courses_by_difficulty, name='search_courses_by_difficulty'),
    path('learner/update-preferences/', update_preferences, name='update_preferences'),
    path('list-courses-by-user-id/<int:user_id>/', list_courses_by_user_id, name='list_courses_by_user_id'),
    path('api/course/<int:course_id>/', get_course_by_id, name='get_course_by_id'),
]
