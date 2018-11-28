'''
converts a csv file into a JSON file for all report, giving latest gen output
'''

import json
import pandas as pd
import numpy as np
from datetime import datetime as dt

'''
B1620 - latest generation output by fuel type
'''
def B1620json ():
    data = pd.read_csv('./data/B1620.csv')
    df = data.tail(11)
    # takes last 11 data points, 1 for each fuel type to show 'current' output
    df.reset_index()
    columns = [0,1,2]
    df.drop(df.columns[columns], axis =1, inplace = True)
    # convert to dictionary, to_dict() sets column names as dictionary keys, 'list' puts each value in its own index, the 'T' addition transposes the data so the grouping is correct
    data = df.set_index('powerSystemResourceType').T.to_dict('list')

    with open('./data/1620data.json', 'w') as outfile:
        json.dump(data, outfile)

'''
MID and B1770 - latest imbalance and spot market prices
'''
def spot_market_data ():
    MID = pd.read_csv('./data/MID.csv')
    imbPrice = pd.read_csv('./data/B1770.csv')
    complete = pd.merge(MID, imbPrice)
    # check for rows that where the settlement period 'exists' so the merging is trimmed down to complete data
    complete = complete[np.isfinite(complete['settlementPeriod'])]
    # adding date and period together as a string
    complete['settlementPeriod'] = (complete['settlementPeriod'].astype(int)).astype(str)
    complete['date_period'] = complete['settlementDate'] + '-' + (complete['settlementPeriod'])
    # convert to dictionary, to_dict() sets column names as dictionary keys, 'list' puts each value in its own index, the 'T' addition transposes the data so the grouping is correct
    data = complete.set_index(complete.columns[0]).T.to_dict('list')

    with open('./data/priceData.json', 'w') as outfile:
        json.dump(data, outfile)

'''
System frequency data
'''
def frequency_data():
    frequency = pd.read_csv('./data/frequency.csv')
    # only taken latest 200 values and modified the date to only push the time to json file as 15 second intervals
    frequency = frequency.tail(200)
    frequency.columns=['date', 'frequency (Hz)']
    # remove last row as it is never needed
    frequency.drop(frequency.index[len(frequency)-1], inplace=True)
    # converts the string into a datetime date object
    def to_date(number):
        mydate = dt(year=int(str(number)[0:4]), month=int(str(number)[4:6]), day=int(str(number)[6:8]), hour=int(str(number)[8:10]), minute=int(str(number)[10:12]), second=int(str(number)[12:14]))
        return mydate
    # apply to_date() and extract the time in HH:MM:SS
    frequency['date'] = frequency['date'].apply(lambda x: to_date(x))
    frequency['time'] = frequency['date'].apply(lambda x: dt.time(x))
    frequency.drop(frequency.columns[0], axis=1, inplace=True)
    frequency['index'] = range(len(frequency))
    data = frequency.set_index(frequency['index']).T.to_dict('list')

    with open('./data/frequency.json', 'w') as outfile:
        json.dump(data, outfile, indent=2, default=str)

'''
Interconnector data for France, Ireland and Netherlands
'''
def interconnector_data():
    data = pd.read_csv('./data/interconnector.csv')
    # first column and last row are not useful
    data.drop(data.columns[0], axis=1, inplace=True)
    data.drop(data.index[len(data)-1], inplace=True)

    data = data.T.to_dict('list')

    with open('./data/interconnector.json', 'w') as outfile:
        json.dump(data, outfile, indent=2, default=str)

'''
FOU2T52W - forecast generation for 2-52 weeks ahead by fuel type
'''
def forecast_gen_data():
    data = pd.read_csv('./data/FOU2T52W.csv')
    # first column and last row are not useful
    data.drop(data.columns[0], axis=1, inplace=True)
    data.drop(data.index[len(data)-1], inplace=True)
    data.columns=['Fuel', 'Date', 'Zone', 'Week', 'Year', 'MW']
    data = data.T.to_dict('list')

    with open('./data/forecast_gen.json', 'w') as outfile:
        json.dump(data, outfile, indent=2, default=str)

'''
DEMMF2T52W - forecast demand for 2-52 weeks ahead at national level
'''
def forecast_dem_data():
    data = pd.read_csv('./data/DEMMF2T52W.csv')
    data.drop(data.index[len(data)-1], inplace=True)
    data = data.T.to_dict('list')

    with open('./data/forecast_dem.json', 'w') as outfile:
        json.dump(data, outfile, indent=2, default=str)


if __name__ == "__main__":
    B1620json()
    spot_market_data()
    frequency_data()
    interconnector_data()
    forecast_gen_data()
    forecast_dem_data()
