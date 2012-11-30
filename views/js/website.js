var numItems=0;
var global;
var fbid="aaa";
var totalPrice=0;

$().ready(function(){

	renderCatalog();
	renderOrderHistory();
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
}

function renderCatalog(){
	$('#catalog-display').empty();
	$('#catalog-display').append('<ul id="catalog-list" class="thumbnails">');

	$.getJSON('/website/viewProducts', function(data){
		$.each(data,function(k,v){
			$('#catalog-display').append('<li class="span3" style="padding-bottom: 20px;"><div class="thumbnail">'
			+'<a href="#">'
				+'<img src="'+v.image+'" alt="">'
			+'</a>'
			+'<div class="caption"><h3>'+v.name+'</h3>'
			+'<p>Price: $'+v.selling_price+'<br/>Category: '+v.category+'<br/>Stock Availability: '+v.stock+'</p>'
			+'Qty: <input type="text" value="1" id="qty-'+v.barcode+'" style="height:10px; font-size:0.8em; width: 40px; margin:0px;"></input>'
			+'&nbsp;<button id="btn-'+v.barcode+'" onclick="addToShoppingCart(\''+v.barcode+'\',\''+v.name+'\','+v.selling_price+','+v.stock+')" class="btn btn-mini"><i class="icon-shopping-cart"></i></button></div>'
			+'</div></li>');
		});

	});
	$('#catalog-display').append('</ul>');	
}

function renderOrderHistory(){
	$('#order-display').empty();
	//append items to order history here
}

function initCheckout(){
	$('#checkout').click(function(){
		$('#addNewOrder').modal('show');
		$('#confirm-cart').empty();
		$('#confirm-cart').append($('#shopping-cart').children().clone());
		$('#total-confirm-price').text(totalPrice);
		$('#confirm-cart tbody td.removeItem').remove();
	});
	
	$('#confirm-add-order').click(function(){
		var address = $('#inputAddress').val();
		if (address == ''){
			alert('Please fill in delivery address!');
			return;
		}
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
					"fbid": fbid,
					"address": address,
					"list": list
			},
			success: function (response) {
				console.log(response.responseText);
				renderCatalog();
				clearAll();
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
		appendShoppingList(barcode,name,price,qty);
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
	numItems--;
	if (numItems == 0){
		$('#empty-msg').show();
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