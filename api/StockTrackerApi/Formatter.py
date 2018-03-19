def chartToData(chart):
	symbols = []
	maxLenChart = -1
	maxLenSymbol = ''
	# Get all symbols and find the number of entries.
	for i in chart.keys():
		symbols.append(i)
		if len(chart[i].get('chart')) > maxLenChart:
			maxLenSymbol = i
			maxLenChart = len(chart[i].get('chart'))
	labels = []
	datasets = []
	# TODO This could be more efficient
	for i in chart[maxLenSymbol].get('chart'):
		labels.append(i.get('date'))
	for i in symbols:
		dataset = {
			'label': i,
			'fill': False,
			'lineTension': 0.05,
			'backgroundColor': 'rgba(75,192,192,0.4)',
			'borderColor': 'rgba(75,192,192,1)',
			'borderCapStyle': 'butt',
			'borderDash': [],
			'borderDashOffset': 0.0,
			'borderJoinStyle': 'miter',
			'pointBorderColor': 'rgba(75,192,192,1)',
			'pointBackgroundColor': '#fff',
			'pointBorderWidth': 1,
			'pointHoverRadius': 5,
			'pointHoverBackgroundColor': 'rgba(75,192,192,1)',
			'pointHoverBorderColor': 'rgba(220,220,220,1)',
			'pointHoverBorderWidth': 2,
			'pointRadius': 1,
			'pointHitRadius': 10
		}
		dataPoints = []
		for j in chart[i].get('chart'):
			dataPoints.append(j.get('close'))
		dataset['data'] = dataPoints
		datasets.append(dataset)
	data = {'labels': labels, 'datasets': datasets}
	return data