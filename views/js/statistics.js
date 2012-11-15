$(function(){
	console.log('magic must happen');
	var options = {
		chart: {
			renderTo: 'statcontent',
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false
		},
		title: {
			text: 'Outlets performance'
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage}%</b>',
			percentageDecimals: 1
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: false
				},
				showInLegend: true
			}
		},
		series: []
	};
	
	$.get('js/allOutletsRevenue.json', function(data) {
		
		var series = {
			type: 'pie',
			name: 'Outlet revenue share',
			data: []
		};
		console.log(series);
		$.each(data, function(idx, item) {
			series.data.push([item.name,item.percent]);
		});
		
		options.series.push(series);
		
		// Create the chart
		var chart = new Highcharts.Chart(options);
	});
});