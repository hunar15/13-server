var global;

$().ready(function(){
$('#catalog-display').append('<ul id="catalog-list" class="thumbnails">');

$.getJSON('/website/viewProducts', function(data){
	$.each(data,function(k,v){
		$('#catalog-display').append('<li class="span3" style="padding-bottom: 20px;"><div class="thumbnail">'
		+'<a href="#">'
			+'<img src="http://placehold.it/300x200" alt="">'
		+'</a>'
		+'<div class="caption"><h3>'+v.name+'</h3>'
		+'<p>Category: '+v.category+'<br/>Manufacturer: '+v.manufacturer+'<br />Stock Availability: '+v.stock+'<br/>Price: $'+v.selling_price+'</p></div>'
		+'</div></li>');
	});
});
$('#catalog-display').append('</ul>');	
})