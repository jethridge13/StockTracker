# https://iextrading.com/developer/docs/

from flask import Flask
from flask_restful import Resource, Api, reqparse
from StockTrackerApi import Stock, Error

app = Flask(__name__)
api = Api(app)

class HelloWorld(Resource):
	def get(self):
		return {'hello': 'world'}

class Stocks(Resource):

	def get(self):
		parser = reqparse.RequestParser()
		parser.add_argument('symbols', type=str, 
			help='List of stock symbols to lookup')
		args = parser.parse_args(strict=True)
		if not args.get('symbols'):
			return Error.REQ_ARG_MISSING
		symbols = args.get('symbols').split(',')
		return Stock.getStockHistory(symbols)


api.add_resource(HelloWorld, '/')
api.add_resource(Stocks, '/stocks')

if __name__ == '__main__':
	# TODO Get actual SSL certificate
	app.run(debug=True)
