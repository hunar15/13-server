var editableGrid;
window.onload = function() {
	
	$.getJSON( "get/product", function(data){
		init(data);
		editableGrid.setPageIndex(0);
		editableGrid.filter('');
	});
	initAddProduct();
}

function initAddProduct(){
	$('#confirm-add-product').click(function(){
		var barcode = $('#inputBarcode').val();
		var name = $('#inputName').val();
		var category = $('#inputCategory').val();
		var manufacturer = $('#inputManufacturer').val();
		var cost_price = $('#inputPrice').val();
		console.log('clicked and checking');
		if (validProductDetails(barcode, name, category, manufacturer, cost_price))
			$.ajax({
				url: "/add/product",
				type: 'POST',
				data: {
					"values":{
						"barcode":barcode,
						"name": name,
						"category": category,
						"manufacturer": manufacturer,
						"cost_price": cost_price
					}
				},
				success: function (response) {
				
					if (response.status =="success"){
						console.log('successfully added'+ barcode);
						$('form#new-product-form :input').val("");
						$('#addNewProduct').hide();
					}
					else
						console.log('error');
				}
			});
	});
}

function validProductDetails(barcode, name, category, manufacturer, cost_price){
	var valid = true;
	if (parseInt(barcode) > 99999999 || barcode.length == 0 || !parseInt(barcode)){ //more than 8 digits
		console.log('invalid barcode');
		$('label[for=inputBarcode]').addClass('invalid');
		valid = false;
	}
	else
		$('label[for=inputBarcode]').removeClass('invalid');
		
	if (name.length == 0 || name.length > 150){ //more than 8 digits
		$('label[for=inputName]').addClass('invalid');
		valid = false;
	}
	else
		$('label[for=inputName]').removeClass('invalid');
		
	if (category.length == 0 || category.length > 100){
		$('label[for=inputCategory]').addClass('invalid');
		valid = false;
	}
	else
		$('label[for=inputCategory]').removeClass('invalid');
		
	if (manufacturer.length == 0 || manufacturer.length > 30){
		$('label[for=inputManufacturer]').addClass('invalid');
		valid = false;
	}
	else
		$('label[for=inputManufacturer]').removeClass('invalid');
	
	if (!parseFloat(cost_price)){
		$('label[for=inputPrice]').addClass('invalid');
		valid = false;
	}
	else
		$('label[for=inputPrice]').removeClass('invalid');

	return valid;
	
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
	editableGrid.renderGrid("producttablecontent", "testgrid");
	
	editableGrid.setCellRenderer("delete", new CellRenderer({render: function(cell, value) {
		// this action will remove the row, so first find the ID of the row containing this cell 
		var rowId = editableGrid.getRowId(cell.rowIndex);
		
		cell.innerHTML = "<a onclick=\"if (confirm('Are you sure you want to delete this product ? ')) { deleteProduct("+cell.rowIndex+");} \" style=\"cursor:pointer\">" +
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
					console.log(parseInt($(this).html()) - 1);
					//editableGrid.setPageIndex(parseInt($(editableGrid).html()) - 1); 
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

function deleteProduct(rowIndex) {
	var barcode = editableGrid.getRowId(rowIndex);
	$.ajax({
		url: "/delete/product",
		type: 'POST',
		data: {
			"values":{
				"barcode": barcode
			}
		},
		success: function (response) {
			if (response.status =="success")
			{
				console.log('successfully deleted'+ barcode);
				editableGrid.remove(rowIndex);	
			}
			else
				console.log('error');
		}
	});
}