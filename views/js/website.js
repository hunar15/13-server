var numItems=0; //number of items in the shopping cart
var cList;
var global;
var fbid="aaa";
var totalPrice=0;
var editableGrid;
var disabledItems = []; //keeps track of which products are already added into shopping cart

$().ready(function(){

	renderCatalog();
	initCheckout();
	initToolbar();
	initAlert();
})

function initAlert(){
	$('.alert').alert();
	$('.alert').hide();
	$('#close-alert').click(function(){
		$('.alert').hide();
	});
}

function initToolbar(){
	$('.display').hide();
	$('#catalog-display').show();

	$('#catalog-link').click(function(){
		$('.tb-link').removeClass('active');
		$('#catalog-link').addClass('active');
		$('.display').hide();
		$('#catalog-display').show();
	});
	
	$('#order-link').click(function(){
		$('.tb-link').removeClass('active');
		$('#order-link').addClass('active');
		renderOrderHistory();
		$('.display').hide();
		$('#order-display').show();
	});	
	$('#store-link').click(function(){
		$('.tb-link').removeClass('active');
		$('#store-link').addClass('active');
		$('.display').hide();
		$('#store-display').show();
	});
	$('#account-link').click(function(){
		$('.tb-link').removeClass('active');
		$('#account-link').addClass('active');
		renderAccount();
		$('.display').hide();
		$('#account-display').show();
	});
}

function disableSelectedItems(){
	$.each(disabledItems, function(k,v){
		$('#btn-'+v).attr('disabled','disabled');
	});
}

function renderAccount(){
	$.ajax({
		url: "/website/getAccountDetails",
		type: 'POST',
		// data: {
				// "fbid": fbid
		// },
		success: function (response) {
			var data = response[0];
			$('#account-display').empty();
			$('#account-display').append('<h3>Account Information</h3><table>'
				+'<tr><td>Name: </td><td><h4> '+data.name+'</h4></td></tr>'
				+'<tr><td>Address: </td><td id="address"><h4> '+data.address+' &nbsp;&nbsp;<a class="change" id="change-address">change</a></h4></td></tr>'
				+'<tr><td>Contact: </td><td id="phone"><h4> '+data.phone+' &nbsp;&nbsp;<a class="change" id="change-phone">change</a></h4></td></tr>'
				+'<tr><td>Email: </td><td><h4> '+data.email+'</h4></td></tr>'
				+'</table>');
			initAccountChange();
		}
	});
}

function initAccountChange(){
	$('#change-address').click(function(){
		$('#address').empty();
		$('#address').append('<input type="text" placeholder="Press enter to confirm" id="inputAddress" style="height:10px; font-size:0.8em; width: 450px; margin:0px;"></input> &nbsp;&nbsp;<a onclick="renderAccount();">cancel</a>');
		$('#inputAddress').bind('keypress',function(e){
			var code = (e.keyCode ? e.keyCode : e.which);
			if(code == 13) {
				$.ajax({
					url: "/website/updateAccountAddress",
					type: 'POST',
					data: {
						//"fbid": fbid,
						"address": $('#inputAddress').val()
					},
					success: function (response) {
						renderAccount();
					}
				});
			}		
		});			
	});
	$('#change-phone').click(function(){
		$('#phone').empty();
		$('#phone').append('<input type="text" value="" id="inputPhone" class="small-input-field" style="height:10px; font-size:0.8em; width: 90px; margin:0px;"></input> &nbsp;&nbsp;<a onclick="renderAccount();">cancel</a>');
		$('#inputPhone').bind('keypress',function(e){
			var code = (e.keyCode ? e.keyCode : e.which);
			if(code == 13) {
				$.ajax({
					url: "/website/updateAccountPhone",
					type: 'POST',
					data: {
						//"fbid": fbid,
						"phone": $('#inputPhone').val()
					},
					success: function (response) {
						renderAccount();
					}
				});
			}		
		});	
	});
}

function renderCatalog(){
	$('#search-catalog').remove();
	$('#catalog-display').append('<input class="span7" type="text" id="search-catalog" placeholder="Search by product name or category"/>'
		+'<ul id="catalog-list" class="thumbnails">');
	$('#search-catalog').bind('keypress',function(e){
		var code = (e.keyCode ? e.keyCode : e.which);
		if(code == 13) {
			$.ajax({
				url: "/website/searchInventory",
				type: 'POST',
				data: {
						"para": $('#search-catalog').val()
				},
				success: function (response) {
					catalogGenerator(response,0);
					disableSelectedItems();
					$('#search-catalog').val('');
				}
			});
		}		
	});			
	$.getJSON('/website/viewProducts', function(data){catalogGenerator(data,0)});
}

function catalogGenerator(data,startIndex){
	console.log('cat');
	cList = data;
	var maxIndex = data.length;
	$('#catalog-display li').remove();
	$('#catalog-paginator').remove();
	$.each(data,function(k,v){
		if (k>= startIndex && k < startIndex + 9)
		$('#catalog-display').append('<li class="span3" style="padding-bottom: 20px;"><div class="thumbnail" style="height:330px;">'
		+'<div class="image-holder"><a href="#">'
			+'<img class="product-image" src="'+v.image+'" alt="">'
		+'</a></div>'
		+'<div class="caption"><h3 style="height:81px;">'+v.name+'</h3><hr style="margin:0px;">'
		+'<p style="height:44px;">Price: $'+v.selling_price+'<br/>Category: '+v.category+'<br/>Stock Availability: '+v.stock+'</p>'
		+'Qty: <input type="text" value="1" id="qty-'+v.barcode+'" style="height:10px; font-size:0.8em; width: 40px; margin:0px;"></input>'
		+'&nbsp;<button id="btn-'+v.barcode+'" onclick="addToShoppingCart(\''+v.barcode+'\',\''+v.name+'\','+v.selling_price+','+v.stock+')" class="btn btn-mini"><i class="icon-shopping-cart"></i></button></div>'
		+'</div></li>');
					
	});
	$('#catalog-display').append('</ul><div id="catalog-paginator">'
		+'<button id="prev" class="btn" onclick="catalogGenerator(cList,'+(startIndex-9)+');disableSelectedItems();">&lt; Prev</button>&nbsp;'
		+'<button id="next" class="btn" onclick="catalogGenerator(cList,'+(startIndex+9)+');disableSelectedItems();">Next &gt;</button></div>');
	if (startIndex-9 <0)
		$('#prev').attr('disabled','disabled');
	if (startIndex+9 >maxIndex)
		$('#next').attr('disabled','disabled');
}

function renderOrderHistory(){
	$('#order-display').empty();
	$('#order-display').append('<div id="ordertablecontent"></div><div id="paginator"></div>');
	$.ajax({
		url: "/website/viewTransactions",
		type: 'POST',
		// data: {
				// "fbid": fbid
		// },
		success: function (response) {
			initOrderTable(response);
			editableGrid.setPageIndex(0);
			editableGrid.filter('');
		}
	});
}

function initOrderTable(data){
	
	editableGrid = new EditableGrid("DemoGridJSON", {
		enableSort: false, // true is the default, set it to false if you don't want sorting to be enabled
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
	editableGrid.renderGrid("ordertablecontent", "testgrid");
	
	editableGrid.setCellRenderer("detail", new CellRenderer({render: function(cell, value) {
		var rowId = editableGrid.getRowId(cell.rowIndex);
		
		cell.innerHTML = "<a data-toggle=\"modal\" onclick=\"generateDetails("+rowId+"); \" style=\"cursor:pointer\">" +
						 "<img src=\"images/view.png\" border=\"0\" alt=\"delete\" title=\"View details\"/></a>";
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

function initCheckout(){
	$('#checkout').click(function(){
		$('#addNewOrder').modal('show');
		$('#confirm-cart').empty();
		$('#confirm-cart').append($('#shopping-cart').children().clone());
		$('#total-confirm-price').text(totalPrice);
		$('#confirm-cart tbody td.removeItem').remove();
		$.ajax({
			url: "/website/getAccountDetails",
			type: 'POST',
/* 			data: {
					"fbid": fbid
			}, */
			success: function (response) {
				$('#inputDeliveryAddress').val(response[0].address);
			}
		});
	});
	
	$('#confirm-add-order').click(function(){
		$('#confirm-add-order').attr('disabled','disabled');
		var address = $('#inputDeliveryAddress').val();
		if (address == ''){
			alert('Please fill in delivery address!');
			return;
		}
		$.ajax({
			url: "/website/updateAccountAddress",
			type: 'POST',
			data: {
				//"fbid": fbid,
				"address": $('#inputDeliveryAddress').val()
			}
		});
		var list = [];
		$.each($('#confirm-cart tbody').children(),function(k,v){
			var id = $(v).attr('id');
			var price = $('#price-'+id).text().substring(2); //remove 'S$'
			var qty = $('#finalqty-'+id).text();
			list.push({
				"barcode":id,
				"quantity":qty,
				"price":price
			});
		});
		recalculateTotalPrice(list);
		$.ajax({
			url: "/website/processTransaction",
			type: 'POST',
			data: {
					//"fbid": fbid,
					"address": address,
					"list": list
			},
			success: function (response) {
				console.log(response.responseText);
				renderCatalog();
				clearAll();
				$('#confirm-add-order').removeAttr('disabled');
				$('.alert').show();
				$('#addNewOrder').modal('hide');
			}
		});
	});
	$('#clear-all').click(clearAll);
}

function clearAll(){
	$.each($('#shopping-cart tbody').children(),function(k,v){
		var id = $(v).attr('id');
		removeFromShoppingList(id);
	});
	disabledItems = [];
}

function addToShoppingCart(barcode,name,price,stock){
	var qty = parseInt($('#qty-'+barcode).val());
	if (!qty)
	{
		alert("Invalid quantity input");
		return;
	}
	else if (stock < qty)
	{
		alert("Insufficient stock available");
		return;
	}
	else
	{
		disabledItems.push(barcode);
		appendShoppingList(barcode,name,price,qty);
	}
}

function appendShoppingList(barcode,name,price,qty){
	if (numItems == 0){
		$('#empty-msg').hide();
		$('#shopping-cart-container').show();
	}
	$('#shopping-cart').append('<tr id="'+barcode+'"><td><b>'+name+'</b></td><td id="price-'+barcode+'">S$'+price+'</td><td id="finalqty-'+barcode+'">'+qty+'</td>'
	+'<td class="removeItem"><a onclick="removeFromShoppingList('+barcode+')"><i class="icon-remove-sign hover-only"></i></a></td></tr>');
	numItems++;
	changePrice(parseInt(price)*parseInt(qty));	
	$('.sc-opt').removeAttr('disabled');
	$('#btn-'+barcode).attr('disabled','disabled');
}

function removeFromShoppingList(barcode){
	var price=parseInt($('#price-'+barcode).text().substring(2));
	var qty=parseInt($('#finalqty-'+barcode).text());
	changePrice(-1*price*qty);
	$('#'+barcode).remove();
	$('#btn-'+barcode).removeAttr('disabled');
	var index = disabledItems.indexOf(''+barcode);
	disabledItems.splice(index,1);
	numItems--;
	if (numItems == 0){
		$('#empty-msg').show();
		$('.sc-opt').attr('disabled','disabled');
		$('#shopping-cart-container').hide();
	}
}
function changePrice(amount){
	totalPrice += amount;
	$('#total-price').text(totalPrice);
}

function recalculateTotalPrice(list){
	var subtotal=0;
	if (list.length == 0){
		totalPrice = 0;
		$('#total-price').text(totalPrice);
		return;
	}
	$.each(list, function(k,v){
		subtotal += v.qty * v.price;
	});
	totalPrice = subtotal;
	$('#total-price').text(totalPrice);
}

function generateDetails(transactionId){
	$.ajax({
		url: "/website/viewTransactionDetails",
		type: 'POST',
		data: {
				"id": transactionId
		},
		success: function (response) {
			initDetail(response);
			$('#transaction-detail-modal').modal('show');
		}
	});
}

function initDetail(data){

	detailedEditableGrid = new EditableGrid("RequestDetail", {
		enableSort: true, // true is the default, set it to false if you don't want sorting to be enabled
		editmode: "absolute", // change this to "fixed" to test out editorzone, and to "static" to get the old-school mode
		editorzoneid: "edition", // will be used only if editmode is set to "fixed"
		pageSize: 10,
		maxBars: 10
	});

	$('#detailfilter').bind('keypress',function(e){
		var code = (e.keyCode ? e.keyCode : e.which);
		if(code == 13) {
			detailedEditableGrid.filter($('#filter2').val());
		}		
	});
	
	detailedEditableGrid.load({"metadata": data.metadata,"data": data.data});
	detailedEditableGrid.renderGrid("tdtablecontent", "detailgrid");
	
	// detailedEditableGrid.setCellRenderer("received", new CellRenderer({render: function(cell, value) {
		// var rowId = detailedEditableGrid.getRowId(cell.rowIndex);
		// if (value==0)
			// cell.innerHTML = "<input class='received-check' id='check-"+rowId+"' type='checkbox'/>";
		// else
			// cell.innerHTML = "<input type='checkbox' checked='true' disabled='true'/>";
	// }})); 
	
	detailedEditableGrid.updatePaginator = function () {
		var paginator = $("#paginator2").empty();
		var nbPages = detailedEditableGrid.getPageCount();
		console.log(nbPages);

		// get interval
		var interval = detailedEditableGrid.getSlidingPageInterval(10);
		if (interval == null) return;

		// get pages in interval (with links except for the current page)
		var pages = detailedEditableGrid.getPagesInInterval(interval, function(pageIndex, isCurrent) {
			if (isCurrent) return "" + (pageIndex + 1);
			return $("<a>").css("cursor", "pointer")
				.html(pageIndex + 1)
				.click(function(event) {
					editableGrid.setPageIndex(parseInt($(this).html()) - 1); 
				});
		});

		// "first" link
		var link = $("<a>").html("<img src='images/gofirst.png'/>&nbsp;");
		if (!detailedEditableGrid.canGoBack())
			link.css({ opacity : 0.4, filter: "alpha(opacity=40)" });
		else 
			link.css("cursor", "pointer").click(function(event) {
				detailedEditableGrid.firstPage(); 
				//updatePaginator();
				});
		paginator.append(link);

		// "prev" link
		link = $("<a>").html("<img src='images/prev.png'/>&nbsp;");
		if (!detailedEditableGrid.canGoBack())
			link.css({ opacity : 0.4, filter: "alpha(opacity=40)" });
		else
			link.css("cursor", "pointer").click(function(event) { 
				detailedEditableGrid.prevPage(); 
				//updatePaginator()
			});
		paginator.append(link);
		
		// pages
		for (p = 0; p < pages.length; p++) paginator.append(pages[p]).append(" | ");

		// "next" link
		link = $("<a>").html("<img src='images/next.png'/>&nbsp;");
		if (!detailedEditableGrid.canGoForward())
			link.css({ opacity : 0.4, filter: "alpha(opacity=40)" });
		else
			link.css("cursor", "pointer").click(function(event) {
				detailedEditableGrid.nextPage(); 
				//updatePaginator();
				});
		paginator.append(link);

		// "last" link
		link = $("<a>").html("<img src='images/golast.png'/>&nbsp;");
		if (!detailedEditableGrid.canGoForward())
			link.css({ opacity : 0.4, filter: "alpha(opacity=40)" });
		else
			link.css("cursor", "pointer").click(function(event) { 
				detailedEditableGrid.lastPage(); 
				//updatePaginator();
			});
		paginator.append(link);

	};

	detailedEditableGrid.tableRendered = function() { this.updatePaginator(); };	
}

function login(){
	window.open('/auth/facebook');
}