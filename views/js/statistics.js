$(function(){

	var options = {
		chart: {
			renderTo: 'statcontent',
			defaultSeriesType: 'column'
		},
		title: {
			text: 'Outlets performance'
		},
		xAxis: {
			categories: []
		},
		yAxis: {
			title: {
				text: 'Units'
			}
		},
		series: []
	};
	
	$.get('data.csv', function(data) {
		var chart = {
			renderTo: 'container',
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false
		};
		
		
		
		// Iterate over the lines and add categories or series
		$.each(lines, function(lineNo, line) {
			var items = line.split(',');
			
			// header line containes categories
			if (lineNo == 0) {
				$.each(items, function(itemNo, item) {
					if (itemNo > 0) options.xAxis.categories.push(item);
				});
			}
			
			// the rest of the lines contain data with their name in the first position
			else {
				var series = {
					data: []
				};
				$.each(items, function(itemNo, item) {
					if (itemNo == 0) {
						series.name = item;
					} else {
						series.data.push(parseFloat(item));
					}
				});
				
				options.series.push(series);
		
			}
			
		});
		
		// Create the chart
		var chart = new Highcharts.Chart(options);
	});
});