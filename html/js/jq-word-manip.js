"use strict";
var origWord,
	stripeWord,
	reversed,
	myChartJQ,
	keyArrayJQ=[],
	valueArrayJQ=[],
	$displayOut = $("<div/>").attr("class","jq-phrase");

function displayInfo(){
	origWord = $('#jq-word').val().toLowerCase();
	stripeWord = origWord.replace(/[^a-zA-Z]+/g, '');
	reversed = stripeWord.split("").reverse().join("");
	$displayOut.append( pElements("The word or phrase you wrote is: ",origWord) );
	$displayOut.append( pElements("The word or phrase stripped of everything but letters: ",stripeWord) );
	$displayOut.append( pElements("The length of the string is: ",stripeWord.length) );
	$displayOut.append( pElements("Is the word or phrase you wrote a palindrome? ", isPala() ) );
	$displayOut.append( pElements("Amount of times each letter is used: ", "" ) );
	$displayOut.append( pElements(letCount(), "" ) );
	$("#jq-output").append($displayOut);
	buildJQChart();
	keyArrayJQ=[];
	valueArrayJQ=[];
}

function pElements(str1, str2){
	var newpar = $("<p/>").attr("class","jqoutput-text").html(str1 + str2);
	return newpar;
}

function isPala(){
	if(stripeWord === reversed){
		return "Yes it is."
	}
	else{
		return "No it isn't."
	}
}

function letCount(){
	var strcount = {};
	var sortcount = {};
	var printverjq = "";
	for (var i = 0; i<stripeWord.length; i++){
		var l = stripeWord.charAt(i);
		strcount[l] = ( isNaN(strcount[l]) ? 1 : strcount[l] + 1 );
	}
	Object.keys(strcount).sort().forEach(function(key){
		sortcount[key] = strcount[key];
		keyArrayJQ.push(key);
		valueArrayJQ.push(sortcount[key]);
		printverjq += key + ": " + sortcount[key] + " ";
	});
	return printverjq;
}

function buildJQChart(){
	var ctx = document.getElementById("JQChart").getContext('2d');
	if (myChartJQ) {
		myChartJQ.destroy();
	}
	myChartJQ = new Chart(ctx, {
		type: 'horizontalBar',
	    data: {
	    	labels: keyArrayJQ,
	    	datasets:[{
	    		label: 'Horizontal Bar Chart of Letters',
	    		data: valueArrayJQ,
	    		backgroundColor:['rgb(0, 0, 180)', 'rgb(175, 13, 102)', 'rgb(146,248,70)', 'rgb(255, 200, 47)', 'rgb(255,118,0)', 
	    			'rgb(185,185,185)', 'rgb(235,235,222)', 'rgb(100,100,100)', 'rgb(255,255,0)', 'rgb(55,19,112)', 'rgb(255,255,150)', 
	    			'rgb(202,62,94)', 'rgb(205,145,63)', 'rgb(12,75,100)', 'rgb(255,0,0)', 'rgb(175,155,50)', 'rgb(0,0,0)', 'rgb(37,70,25)', 
	    			'rgb121,33,135)', 'rgb(83,140,208)', 'rgb(0,154,37)', 'rgb(178,220,205)', 'rgb(255,152,213)', 'rgb(0,0,74)', 'rgb(175,200,74)', 
					'rgb(63,25,12)']
	    	}]
	    },
	    options: {
			scales: {
				xAxes: [{
				    stacked: true,
				    scaleLabel:{
				    	display: true,
				    	labelString: 'Value'
				    }
				}],
				yAxes: [{
				    stacked: true,				    
				    scaleLabel:{
				    	display: true,
				    	labelString: 'Letters'
				    }
				}]
			},
	    	animation:{
	    		animateScale:true
	    	}
		}
	});
}

$(document).ready(function(){
	$('#jq-submit').click(function(){
		if ( ($('#jq-word').val() != 0) && ($('#jq-word').val().length != 0) ){
			$("#jq-output .jq-phrase").empty();
			displayInfo();
		}
		else{
			$$("#jq-output .jq-phrase").empty();
			$("#jq-output").append("The box above is empty and lonely.");
		}
	});
});