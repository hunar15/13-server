window.onload = function() {

	// this approach is interesting if you need to dynamically create data in Javascript 
	var metadata = [];
	metadata.push({ name: "barcode", label: "Barcode", datatype: "string", editable: false});
	metadata.push({ name: "name", label:"Name", datatype: "string", editable: false});
	metadata.push({ name: "s_name", label:"Name", datatype: "string", editable: false});	
	metadata.push({ name: "category", label: "Category", datatype: "string", editable: true});
	metadata.push({ name: "manufacturer", label: "Manufacturer", datatype: "string", editable: true});
	metadata.push({ name: "stock", label: "Stock", datatype: "integer", editable: true});
	metadata.push({ name: "minstock", label: "Min. stock", datatype: "integer", editable: true});
	metadata.push({ name: "sprice", label: "Selling Price", datatype: "double(2)", editable: true});
	metadata.push({ name: "cprice", label: "Cost Price", datatype: "double(2)", editable: true});

	var data = [];
	data.push({id: 3, values: {"barcode":"12345678","name":"Johnson's Baby Cream","category":"Perfume","manufacturer":"F&N","stock":54,"minstock":54,"sprice":82.50,"cprice":82.50}});
	data.push({id: 4, values: {"barcode":"12345678","name":"Coby","category":"Perfume","manufacturer":"F&N","stock":54,"minstock":54,"sprice":82.50,"cprice":82.50}});
	data.push({id: 5, values: {"barcode":"12345678","name":"Rana","category":"Perfume","manufacturer":"F&N","stock":54,"minstock":54,"sprice":82.50,"cprice":82.50}});
	data.push({id: 6, values: {"barcode":"12345678","name":"Jasmine","category":"Perfume","manufacturer":"F&N","stock":54,"minstock":54,"sprice":82.50,"cprice":82.50}});
	data.push({id: 7, values: {"barcode":"12345678","name":"André","category":"Perfume","manufacturer":"F&N","stock":54,"minstock":54,"sprice":82.50,"cprice":82.50}});
	data.push({id: 8, values: {"barcode":"12345678","name":"Martin","category":"Perfume","manufacturer":"F&N","stock":54,"minstock":54,"sprice":82.50,"cprice":82.50}});
	data.push({id: 9, values: {"barcode":"12345678","name":"Amédé","category":"Perfume","manufacturer":"F&N","stock":54,"minstock":54,"sprice":82.50,"cprice":82.50}});
	data.push({id: 10,values: {"barcode":"12345678","name":"Wanthus","category":"Perfume","manufacturer":"F&N","stock":54,"minstock":54,"sprice":82.50,"cprice":82.50}});
	 
	editableGrid = new EditableGrid("DemoGridJsData");
	editableGrid.load({"metadata": metadata, "data": data});
	editableGrid.renderGrid("producttablecontent", "testgrid");
} 