$(function(){
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
	
	$.get('../allOutletsRevenue', function(data) {
		
		var series = {
			type: 'pie',
			name: 'Outlet revenue share',
			data: []
		};
		$.each(data, function(idx, item) {
			series.data.push([item["name"],parseFloat(item["percent"])]);
		});
		
		options.series.push(series);
		
		// Create the chart
		var chart = new Highcharts.Chart(options);
	});
	
	$.getJSON( "get/outlet", function(response){
		$.each(response.data, function(idx, item){
			$('#show-outlet').append('<option id="outlet-'+item.id+'">'+item.values.s_name+'</option>');
		});
	});
});

function changeOutlet(){
	console.log($('#show-outlet'));
}