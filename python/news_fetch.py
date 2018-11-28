import httplib2
import json
import numpy as np
import pandas as pd


def main ():
    http_obj = httplib2.Http()
    resp, content = http_obj.request(
        uri="http://webhose.io/filterWebContent?token=api_token&format=json&sort=crawled&q=energy",
        method='GET',
        headers={'Content-Type':'application/json: charset=UTF-8'}
    )

    dict = json.loads(content)
    list = dict['posts']
    data = {}
    # creating new dictionary only including values to be used for dashboard
    for i in range(len(list)):
        # exceptions in case of source data dropping values

        try:
            title = dict['posts'][i]["title"]
        except KeyError:
            title = "No title"

        try:
            url = dict['posts'][i]["url"]
        except KeyError:
            url = ""

        data.update({i:[title, url]})

    with open('/User/Path/Energy dashboard/data/newsfeed.json', 'w') as outfile:
        json.dump(data, outfile)


if __name__ == "__main__":
    main()
