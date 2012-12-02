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
			$('#show-outlet').append('<option id="outlet-'+item.id+'" value="'+item.id+'">'+item.values.s_name+'</option>');
		});
	});
	
	changeOutlet(false);
		
});


function changeOutlet(scroll){
	var arr = {};
	var outlet_id = $('#show-outlet option:selected').val();
	$('#outletcontent').empty();
	$.post('../getLastWeeksPerformance', { outlet_id : outlet_id }, function (data) {
	var option_line = {
		chart: {
                renderTo: 'outletcontent',
                type: 'column'
        },
        title: {
                text: 'Last Week\'s Performance'
		},
		xAxis: {
                categories: []
        },
        yAxis: {
                min: 0,
                title: {
                    text: 'Revenue from Best Selling Product'
                }
        },
        tooltip: {
                formatter: function() {
                    return arr[this.x]+' : $'+this.y;
                }
            },
        series :[]
	};


		// body...
		var series = {
			type: 'column',
			name: 'Top Products of ' + $('#show-outlet option:selected').html(),
			data: []
		};
		var categories = [];
		$.each(data, function(idx, item) {
			series.data.push(Math.round(parseFloat(item["revenue"])*100)/100);
			arr[item['date']] = item['name'];
			categories.push(item['date']);
		});
		option_line.series.push(series);
		option_line.xAxis.categories = categories;
		//alert(JSON.stringify(categories));
		
		// Create the chart
		var chart2 = new Highcharts.Chart(option_line);
		if (scroll)
			scrollBottom();
	});

}

function scrollBottom(){
	$('html, body').animate({
		scrollTop: $(document).height()
	},0);			
}