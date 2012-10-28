var editableGrid;
window.onload = function() {
	$.getJSON( "get/product", function(data){
		init(data);
	});
}

function init(data){
	editableGrid = new EditableGrid("DemoGridJSON", {
		enableSort: true, // true is the default, set it to false if you don't want sorting to be enabled
		editmode: "absolute", // change this to "fixed" to test out editorzone, and to "static" to get the old-school mode
		editorzoneid: "edition", // will be used only if editmode is set to "fixed"
		pageSize: 10,
		maxBars: 10
	});
	editableGrid.load({"metadata": data.metadata,"data": data.data});
	editableGrid.renderGrid("producttablecontent", "testgrid");
	editableGrid.updatePaginator = function()
	{
		var paginator = $("#paginator").empty();
		var nbPages = editableGrid.getPageCount();
		console.log(nbPages);

		// get interval
		var interval = editableGrid.getSlidingPageInterval(20);
		if (interval == null) return;

		// get pages in interval (with links except for the current page)
		var pages = editableGrid.getPagesInInterval(interval, function(pageIndex, isCurrent) {
			if (isCurrent) return "" + (pageIndex + 1);
			return $("<a>").css("cursor", "pointer").html(pageIndex + 1).click(function(event) { editableGrid.setPageIndex(parseInt($(editableGrid).html()) - 1); });
		});

		// "first" link
		var link = $("<a>").html("<img src='" + image("gofirst.png") + "'/>&nbsp;");
		if (!editableGrid.canGoBack()) link.css({ opacity : 0.4, filter: "alpha(opacity=40)" });
		else link.css("cursor", "pointer").click(function(event) { editableGrid.firstPage(); });
		paginator.append(link);

		// "prev" link
		link = $("<a>").html("<img src='" + image("prev.png") + "'/>&nbsp;");
		if (!editableGrid.canGoBack()) link.css({ opacity : 0.4, filter: "alpha(opacity=40)" });
		else link.css("cursor", "pointer").click(function(event) { editableGrid.prevPage(); });
		paginator.append(link);
		// pages
		for (p = 0; p < pages.length; p++) paginator.append(pages[p]).append(" | ");

		// "next" link
		link = $("<a>").html("<img src='" + image("next.png") + "'/>&nbsp;");
		if (!editableGrid.canGoForward()) link.css({ opacity : 0.4, filter: "alpha(opacity=40)" });
		else link.css("cursor", "pointer").click(function(event) { editableGrid.nextPage(); });
		paginator.append(link);

		// "last" link
		link = $("<a>").html("<img src='" + image("golast.png") + "'/>&nbsp;");
		if (!editableGrid.canGoForward()) link.css({ opacity : 0.4, filter: "alpha(opacity=40)" });
		else link.css("cursor", "pointer").click(function(event) { editableGrid.lastPage(); });
		paginator.append(link);
	};
}