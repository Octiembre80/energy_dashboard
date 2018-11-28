'''
Report that fetches data from Elexon using the API key
'''

'''
main() - takes a date and plugs it into url, as well as looping over periods 1-48 to give url to post_elexon()

post_elexon() - uses the url to fetch the particular information from Elexon
'''

#! /usr/bin/env python
'''
imports
'''
import httplib2
import pandas as pd
import numpy as np
from pprint import pformat
from bs4 import BeautifulSoup
from datetime import datetime as dt
from datetime import timedelta


# -------------------------------------------------------------------
data  = []
API = 'your_api'

'''
Produces a list of dates from a start date until present, default to 2 days ago
'''
def dates_list(num_days=None):
    if num_days is None:
        num_days = 2
    start_date = (dt.date(dt.now())-timedelta(days=2))
    dates = [(start_date + timedelta(days=d)).strftime("%Y-%m-%d") for d in range(num_days+1)]
    return (dates)

'''
Creates the url based on report code, date and periods
'''
def main():
    reports = ['B1770','MID']
    for report_code in reports:
        dates =  dates_list()
        periods = [str(x) for x in range(1,49)]
        for date in dates:
            for period in periods:
                if report_code == 'MID':
                    post_elexon(
                        url='https://api.bmreports.com/BMRS/'+report_code+'/v1?APIKey=' + API + '&FromSettlementDate='+ date + '&ToSettlementDate=' + date + '&Period=' + period + '&ServiceType=xml', report_code = report_code
                    )
                if report_code == 'B1770':
                    post_elexon(
                        url='https://api.bmreports.com/BMRS/'+report_code+'/v1?APIKey=' + API + '&SettlementDate='+ date +'&Period=' + period + '&ServiceType=xml', report_code = report_code
                    )
        df = pd.DataFrame(data,
                        columns = list_type(report_code)
                        )
        df.to_csv('./data/' + report_code + '.csv')
        del data[:]
'''
retrieves the report from Elexon using the url from fetch()
'''
def post_elexon(url, report_code):
    http_obj = httplib2.Http()
    resp, content = http_obj.request(
        uri=url,
        method='GET',
        headers={'Content-Type':'application/xml: charset=UTF-8'}
    )
    parser(content, report_code)

'''
cleans the xml object that is retrieved from elexon and singles out data based on a list
'''

def parser(content, report_code ):
    list = list_type(report_code)
    arr = []
    for n in list:
        try:
            var = BeautifulSoup(content, "lxml-xml").find(n)
            var = str(var).split('>')[1].split('<')[0].strip()
            arr.append(var)
        except IndexError:
            pass
    data.append(arr)

'''
determines the information to be parsed based on the report
'''
def list_type(report_code):
    return {
    'B1770': ['settlementDate', 'settlementPeriod', 'imbalancePriceAmountGBP'],
    'MID': ['settlementDate', 'settlementPeriod', 'marketIndexPrice', 'marketIndexVolume']
    }.get(report_code,['settlementDate', 'settlementPeriod'])

if __name__ == "__main__":
    main()
