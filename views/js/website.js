$().ready(function(){
$('#catalog-display').append('<ul id="catalog-list" class="thumbnails">');

for (var i = 0; i < 6; i++){
$('#catalog-display').append('<li class="span3" style="padding-bottom: 20px;"><div class="thumbnail">'
		+'<a href="#">'
			+'<img src="http://placehold.it/300x200" alt="">'
		+'</a>'
		+'<div class="caption"><h3>Thumbnail label</h3>'
		+'<p>Thumbnail caption...</p></div>'
		+'</div></li>');
}
$('#catalog-display').append('</ul>');	
})