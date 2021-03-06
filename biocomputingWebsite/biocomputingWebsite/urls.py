"""biocomputingWebsite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
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
from usersApp import views as usersApp_views
from simulationApp import views as simulation_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path("register/", usersApp_views.register, name='register'),
    path("simulation/", simulation_views.simulation, name='sim'),
    path("", simulation_views.home, name='home'),
    path("about/", simulation_views.about, name='about'),
    path("rendersbgn/", simulation_views.renderSBGN, name='renderSBGN'),
    path("renderoutput/", simulation_views.renderOutput, name='render-button'),

    path("simulation/save_file", simulation_views.save_file, name='save_file'),
]
