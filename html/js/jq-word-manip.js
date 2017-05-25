"use strict";
var origWord,
	stripeWord,
	reversed,
	myChartJQ,
	keyArrayJQ=[],
	valueArrayJQ=[],
	$displayOut = $("<div/>").attr("class","phrase");

function displayInfo(){
	origWord = $('#jq-word').val().toLowerCase();
	stripeWord = origWord.replace(/[^a-zA-Z]+/g, '');
	reversed = stripeWord.split("").reverse().join("");
	$displayOut.append( pElements("The word or phrase you wrote is: ",origWord) );
	$displayOut.append( pElements("The word or phrase stripped of everything but letters: ",stripeWord) );
	$displayOut.append( pElements("The length of the string is: ",stripeWord.length) );
	$displayOut.append( pElements("Is the word or phrase you wrote a palindrome? ", isPala() ) );
	$displayOut.append( pElements("Amount of times each letter is used: ", "" ) );
	$displayOut.append( pElements("", "letters broken out" ) );
	$("#jq-output").append($displayOut);
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

$(document).ready(function(){
	$('#jq-submit').click(function(){
		if ( ($('#jq-word').val() != 0) && ($('#jq-word').val().length != 0) ){
			$("#jq-output .phrase").empty();
			displayInfo();
		}
		else{
			$$("#jq-output .phrase").empty();
			$("#jq-output").append("The box above is empty and lonely.");
		}
	});
});