var editableGrid;
var geocoder;
var map;
var global;
window.onload = function() {
	initTable();
	initAddOutlet();
}

function loadMapScript()
{
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyBLMdDYv64FO14c7wMQBeqNfH5mSduQcEQ&sensor=false&callback=initializeMap"; 
	document.body.appendChild(script);
}

function initializeMap(){
	createMap(new google.maps.LatLng(1.367,103.75));
	$('#inputAddress').bind('keypress',function(e){
		var code = (e.keyCode ? e.keyCode : e.which);
		if(code == 13) {
			codeAddress();
		}		
	});

}

function createMap(latLng)
{	
	var mapObj = [];
	geocoder = new google.maps.Geocoder();
	
	map = new google.maps.Map(document.getElementById('googleMap'), {  
		zoom: 17,
		center: latLng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});
	var marker = new google.maps.Marker({
		position: latLng, 
		map: map,
		draggable: true
	});	
	google.maps.event.addListener(marker, 'dragend', function() {
		geocodePosition(marker.getPosition());
	});		
}

function codeAddress() {
	var address = $("#inputAddress").val();
	geocoder.geocode( { 'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			createMap(results[0].geometry.location);
			$('#inputLatitude').val(results[0].geometry.location.$a);
			$('#inputLongitude').val(results[0].geometry.location.ab);
		} else {
			alert("Geocode was not successful for the following reason: " + status);
		}
	});
}
function geocodePosition(pos) {
  geocoder.geocode({
    latLng: pos
  }, function(responses) {
    if (responses && responses.length > 0) {
      $('#inputAddress').val(responses[0].formatted_address);
			$('#inputLatitude').val(responses[0].geometry.location.$a);
			$('#inputLongitude').val(responses[0].geometry.location.ab);
    } else {
      alert('Cannot determine address at this location.');
    }
  });
}


function initTable(){
	$.getJSON( "get/outlet", function(data){
		init(data);
		editableGrid.setPageIndex(0);
		editableGrid.filter('');
	});
}

function initAddOutlet(){
	$('#confirm-add-outlet').click(function(){

		var name = $('#inputOutletName').val();
		var address = $('#inputAddress').val();
		var longitude = $('#inputLongitude').val();
		var latitude = $('#inputLatitude').val();

		if (validOutletDetails(name,address))
			$.ajax({
				url: "/add/outlet",
				type: 'POST',
				data: {
						"s_name": name,
						"address": address,
						"longitude": longitude,
						"latitude": latitude
				},
				success: function (response) {
					console.log('outlet added!');
					initTable();
					$('#addNewOutlet').modal('hide');
				}
			});
	});
}

function validOutletDetails(name,address){
	var errormsg = '';
	var valid = true;
	if (name == '' || name.length > 20)
	{
		errormsg = errormsg + 'Outlet name cannot be empty or more than 20 characters! ';
		$('label[for=inputOutletName]').addClass('invalid');
		valid = false;
	}
	else
		$('label[for=inputOutletName]').removeClass('invalid');
	if (address == '' || address.length > 30)
	{
		errormsg = errormsg + 'Outlet address cannot be empty or more than 30 characters! ';
		$('label[for=inputAddress]').addClass('invalid');
		valid = false;
	}
	else
		$('label[for=inputAddress]').removeClass('invalid');

	if (!valid){
		alert(errormsg);
		return false;
	}
	else
		return true;

}

function init(data){
	editableGrid = new EditableGrid("DemoGridJSON", {
		enableSort: true, // true is the default, set it to false if you don't want sorting to be enabled
		editmode: "absolute", // change this to "fixed" to test out editorzone, and to "static" to get the old-school mode
		editorzoneid: "edition", // will be used only if editmode is set to "fixed"
		pageSize: 10,
		maxBars: 10
	});

	$('#filter').bind('keypress',function(e){
		var code = (e.keyCode ? e.keyCode : e.which);
		if(code == 13) {
			editableGrid.filter($('#filter').val());
		}		
	});
	
	editableGrid.load({"metadata": data.metadata,"data": data.data});
	editableGrid.renderGrid("outlettablecontent", "testgrid");


	editableGrid.modelChanged = function(rowIndex, columnIndex, oldValue, newValue) {
		console.log(editableGrid.getRowValues(rowIndex).id);
		console.log(editableGrid.getRowValues(rowIndex).s_name);
		console.log(editableGrid.getRowValues(rowIndex).address);
		$.ajax({
			url: "/update/outlet",
			type: 'POST',
			data: {
				"id": editableGrid.getRowValues(rowIndex).id,
				"s_name": editableGrid.getRowValues(rowIndex).s_name,
				"address": editableGrid.getRowValues(rowIndex).address
			},

			success: function (response) {
				console.log(response);
				initTable();
				//if (response != "ok") editableGrid.setValueAt(rowIndex, columnIndex, oldValue);
			},

			error: function(XMLHttpRequest, textStatus, exception) {
				alert(XMLHttpRequest.responseText);
			}
		});
	};	

	editableGrid.setCellRenderer("delete", new CellRenderer({render: function(cell, value) {
		// this action will remove the row, so first find the ID of the row containing this cell 
		var rowId = editableGrid.getRowId(cell.rowIndex);
		
		cell.innerHTML = "<a onclick=\"if (confirm('Are you sure you want to delete this outlet? All products in inventory will be discontinued. ')) { deleteOutlet("+cell.rowIndex+");} \" style=\"cursor:pointer\">" +
						 "<img src=\"images/delete.png\" border=\"0\" alt=\"delete\" title=\"Delete row\"/></a>";
	}})); 
	
	editableGrid.updatePaginator = function () {
		var paginator = $("#paginator").empty();
		var nbPages = editableGrid.getPageCount();
		console.log(nbPages);

		// get interval
		var interval = editableGrid.getSlidingPageInterval(10);
		if (interval == null) return;

		// get pages in interval (with links except for the current page)
		var pages = editableGrid.getPagesInInterval(interval, function(pageIndex, isCurrent) {
			if (isCurrent) return "" + (pageIndex + 1);
			return $("<a>").css("cursor", "pointer")
				.html(pageIndex + 1)
				.click(function(event) {
					editableGrid.setPageIndex(parseInt($(this).html()) - 1); 
				});
		});

		// "first" link
		var link = $("<a>").html("<img src='images/gofirst.png'/>&nbsp;");
		if (!editableGrid.canGoBack())
			link.css({ opacity : 0.4, filter: "alpha(opacity=40)" });
		else 
			link.css("cursor", "pointer").click(function(event) {
				editableGrid.firstPage(); 
				//updatePaginator();
				});
		paginator.append(link);

		// "prev" link
		link = $("<a>").html("<img src='images/prev.png'/>&nbsp;");
		if (!editableGrid.canGoBack())
			link.css({ opacity : 0.4, filter: "alpha(opacity=40)" });
		else
			link.css("cursor", "pointer").click(function(event) { 
				editableGrid.prevPage(); 
				//updatePaginator()
			});
		paginator.append(link);
		
		// pages
		for (p = 0; p < pages.length; p++) paginator.append(pages[p]).append(" | ");

		// "next" link
		link = $("<a>").html("<img src='images/next.png'/>&nbsp;");
		if (!editableGrid.canGoForward())
			link.css({ opacity : 0.4, filter: "alpha(opacity=40)" });
		else
			link.css("cursor", "pointer").click(function(event) {
				editableGrid.nextPage(); 
				//updatePaginator();
				});
		paginator.append(link);

		// "last" link
		link = $("<a>").html("<img src='images/golast.png'/>&nbsp;");
		if (!editableGrid.canGoForward())
			link.css({ opacity : 0.4, filter: "alpha(opacity=40)" });
		else
			link.css("cursor", "pointer").click(function(event) { 
				editableGrid.lastPage(); 
				//updatePaginator();
			});
		paginator.append(link);

	};

	editableGrid.tableRendered = function() { this.updatePaginator(); };
}

function deleteOutlet(rowId){
	console.log('going to delete: '+rowId);
	$.ajax({
		url: "/delete/outlet",
		type: 'POST',
		data: {
				"id": rowId
		},
		success: function (response) {

			console.log('successfully deleted outlet'+ rowId);
			console.log(response);
			initTable();
		}
	});
}