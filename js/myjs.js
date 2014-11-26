$(document).ready(function(){
	var currEntryNum = 0;
	//current IDs for URL, Start, End
	var idForURL;
	var idForStart;
	var idForEnd;
	var idForRow;

	var listOfURL = [];
	var listOfStart = [];
	var listOfEnd = [];

	// $("#myBtn").click(function(){
	// 	alert("Hi");
	// 	$('#myBtn').append("<img src= \" ajax-loader.gif\"");
	// 	$.post("submit.php", function(data,status){
	// 		alert(data);
	// 		$("#placer").append("<a href=\"" + data + "\" <button>Download</button>" );
	// 	});
	// });
	
	$('#myBtn').click(function(){
		//alert("Button clicked");
		checkInputs();
	});

	$('#Trimmer').click(function(){
		trimVideos();
	});

	function trimVideos(){
		if(!listOfURL.length && !listOfStart.length && !listOfEnd.length){
			alert("Nothing to trim!");
			return;
		}
		var loopCounter;
		$('#' + idForRow).remove();
		$('.tabData').append("<td id = \"tic\"><img src = \" ../html/img/ajax-loader.gif\" id=\"ajaximg\" style=\"margin: 10px; margin-bottom: 25px; height: 30px;\" ></td>");
		for(loopCounter = 0; loopCounter<listOfURL.length; loopCounter++){
			//post to the server. if successful, create a download link
			$.post("submit.php", { URL: listOfURL[loopCounter], Start: listOfStart[loopCounter], End: listOfEnd[loopCounter] }, function( data ){
				var id = '#row'+ (loopCounter-1).toString();	//some bug here. This is hardcoded. Must be reviewed
				//alert(id);
				//alert(data);
				$('#ajaximg').remove();
				$(id).append("<a href=\"" + data + "\" <button>Download</button>");
			});
		}
	}	
	
	//if current inputs are filled, add new row
	function checkInputs(){
		var checkID = currEntryNum - 1; //check prev row

		var URLvalue = document.getElementById(idForURL).value;
		var Startvalue = document.getElementById(idForStart).value;
		var Endvalue = document.getElementById(idForEnd).value;

		//alert(typeof Startvalue)
		alert(URLvalue + " " + Startvalue + " " + Endvalue);

		if(URLvalue && Startvalue && Endvalue && parseInt(Endvalue)>0 && Endvalue>Startvalue){
			//add values to list for trimming later
			listOfURL[listOfURL.length] = URLvalue;
			listOfStart[listOfStart.length] = Startvalue;
			listOfEnd[listOfEnd.length] = Endvalue;

			addRowToTable();
		}

	}

	function addRowToTable(){
		//update IDs
		idForURL = "URL" + currEntryNum.toString();
		idForStart = "Start" + currEntryNum.toString();
		idForEnd = "End" + currEntryNum.toString();
		idForRow = "row" + currEntryNum.toString(); 



		var toAppendURLRow = "<tr class=\"tabData\" id=\"" + idForRow + "\"><td><div class=\"form-group\"><label class=\"sr-only\" for=\"" + idForURL+"\">URL</label><input type=\"text\" class=\"form-control\" id=\"" + idForURL+"\" name=\"testURL\" placeholder=\"Enter URL\">";
		var toAppendStartRow = "<td><div class=\"form-group\"><label class=\"sr-only\" for=\"" + idForStart+"\">Start</label><input type=\"number\" class=\"form-control\" id=\"" + idForStart+"\" name=\"testStart\" placeholder=\"Enter Start Time\">";
		var toAppendEndRow = "<td><div class=\"form-group\"><label class=\"sr-only\" for=\"" + idForEnd+"\">Stop</label><input type=\"number\" class=\"form-control\" id=\"" + idForEnd+"\" name=\"testEnd\" placeholder=\"Enter End Time\"></tr>";

		$('#toConvert').append(toAppendURLRow + toAppendStartRow + toAppendEndRow);
		currEntryNum = currEntryNum + 1; //increase counter to keep track	
	}

	addRowToTable();

});