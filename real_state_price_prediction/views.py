from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from .utils import *


def home(request):
    return render(request, 'app.html')


def location_names(request):
    return JsonResponse(
        {'locations': get_location_names()}
    )


@csrf_exempt
def predict_price(request):
     total_sqft = request.POST.get('total_sqft')
     location = request.POST.get('location')
     bhk = request.POST.get('bhk')
     bath = request.POST.get('bath')
     return JsonResponse({'estimated_price':  get_estimated_price(location, total_sqft,  bhk,bath)})
