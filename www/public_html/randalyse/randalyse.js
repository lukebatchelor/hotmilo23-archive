$(function() {
	$('#swag').click(function() {
    		var sql_input = $('#sql-input').val();
    		if(sql_input == ""){
    			sql_input = $('#sql-input').attr('placeholder'); 
    		}
    		
    		var lines = sql_input.split("\n");
		var randalysed_sql = "";
		for(var i = 0; i < lines.length; i++){
			if(lines[i].match(/INSERT\s+INTO .+? \((.+?,)*.+?\)\s+VALUES\s+\((.+?,)*.+?\)\s*;\s*/gi))
			{
				//firstly going to clean the text by removing extra newlines and spaces and adding trailing spaces to commas
				var statement = cleanInsertStatement(lines[i]);
				
				var cols = /INSERT INTO .+? \(((.+?,)*.+?)\) VALUES/g.exec(statement)[1].split(',');
				var values = /INSERT INTO .+? \((.+?,)*.+?\) VALUES \(((.+?,)*.+?)\)/g.exec(statement)[2].split(',');
				var start_of_sql = /(INSERT INTO .+? \()/g.exec(statement)[1]; 
				
				randalysed_sql += start_of_sql;
				
				for(var j=0; j < cols.length; j++){
					if(cols[j].length > values[j].length){
						values[j] += repeatString("&nbsp;", cols[j].length - values[j].length);
					}
					else if(cols[j].length < values[j].length){
						cols[j] += repeatString("&nbsp;", values[j].length - cols[j].length);
					}
				}
		
				for(var j=0; j < cols.length; j++){
					randalysed_sql += cols[j] +",";
				}
				randalysed_sql += cols[cols.length - 1] +")\r\n"+repeatString("&nbsp;", start_of_sql.length-8)+"VALUES (";
				for(var j=0; j < values.length; j++){
					randalysed_sql += values[j] +",";
				}
				randalysed_sql += values[values.length - 1] +");\r\n";
			}
			else
			{
				randalysed_sql += lines[i] + "\n";
			}
		}
		$('#outputBox').html(randalysed_sql);
    		
    		return false;
	});
	
});

function repeatString(string, times){
	var repeated_string = "";
	for(var i=0; i < times; i++){
		repeated_string += string;
	}
	
	return repeated_string;
}

function cleanInsertStatement(statement){
	statement = statement.replace(/\n+/g, " ");		//remove multiple newlines
	statement = statement.replace(/\s+/g, " ");		//remove multiple whitespaces
	statement = statement.replace(/,([^\s])/g,", $1");	//ensure space after every comma
	statement = statement.replace(/\(\s*/g,"\(");	//remove spaces next to brackets
	statement = statement.replace(/\s*\)/g,"\)");	//remove spaces next to brackets
	statement = statement.replace(/\s*,/g,",");	//remove spaces before commas
	statement = statement.replace(/;\s*/g,";");	//remove spaces after semi colons
	
	return statement;
}