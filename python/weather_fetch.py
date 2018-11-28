'''
Report that fetches data from openweathermap using the API key
'''

#! /usr/bin/env python
'''
imports
'''
import httplib2
import pandas as pd
import numpy as np
import json


# -------------------------------------------------------------------
data  = []
API = 'your_api'

'''
Creates the url based on report code, date and periods
'''
def main():

    http_obj = httplib2.Http()
    resp, content = http_obj.request(
        uri='http://api.openweathermap.org/data/2.5/forecast?q=London,GB&units=metric&appid=' + API,
        method='GET',
        headers={'Content-Type':'application/json: charset=UTF-8'}
    )

    dict = json.loads(content)
    list = dict['list']
    data = {}
    # creating new dictionary only including values to be used for dashboard
    for i in range(len(list)):
        # exceptions are due to the source data dropping keys if there is no value, breaks the formula - allocate a zero instead
        try:
            clouds = dict['list'][i]['clouds']['all']
        except KeyError:
            clouds = 0
        try:
            rain = dict['list'][i]['rain']['3h']
        except KeyError:
            rain = 0
        try:
            time = dict['list'][i]['dt_txt']
        except KeyError:
            time = 0
        try:
            temp = dict['list'][i]['main']['temp']
        except KeyError:
            temp = 0
        try:
            icon = dict['list'][i]['weather'][0]['icon']
        except KeyError:
            icon = 0
        try:
            wind = dict['list'][i]['wind']['speed']
        except KeyError:
            wind = 0

        data.update({i:[clouds,rain,time,temp,icon,wind]})


    with open('./data/weather.json', 'w') as outfile:
        json.dump(data, outfile)

if __name__ == "__main__":
    main()
