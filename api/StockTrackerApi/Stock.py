import requests
from . import Error
from . import Formatter

BASE_PATH = 'https://api.iextrading.com/1.0'

def getStockHistory(symbols, raw=False):
	stockEndpoint = '/stock/market/batch'
	params = {
				'symbols': ','.join(symbols),
				'types': 'chart'
			}
	r = requests.get(url=BASE_PATH+stockEndpoint, params=params)
	if raw:
		return r.json()
	return Formatter.chartToData(r.json())

def getStockQuote(symbols):
	return Error.NOT_YET_IMP