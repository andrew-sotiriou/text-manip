var myChart;
var keyArray=[];
var valueArray=[];

document.addEventListener('DOMContentLoaded', function(event) {
	var button = document.querySelector("button#js-submit");
	button.addEventListener("click", function() {
		var nameValue = document.getElementById("js-word").value;
		var jsoutput =  document.getElementById("js-output");
		if (nameValue.length==0 || nameValue == null){
			jsoutput.innerHTML = "The box above is empty and lonely.";
			if (myChart) {
				myChart.destroy();
			}
		}
		else{
   			var elements = document.getElementsByClassName("phrase");
    		while(elements.length > 0){
        		elements[0].parentNode.removeChild(elements[0]);
    		}
			writeInfo(nameValue,jsoutput);
		}
	});
});

document.addEventListener('DOMContentLoaded', function(event) {
	var button = document.querySelector("span.mic");
	button.addEventListener("click", function() {
		window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
		let finalTranscript = '';
		let recognition = new window.SpeechRecognition();
		recognition.interimResults = true;
		recognition.maxAlternatives = 10;
		recognition.continuous = false;
		recognition.onresult = (event) => {
			let interimTranscript = '';
			for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
				let transcript = event.results[i][0].transcript;
				if (event.results[i].isFinal) {
					finalTranscript += transcript;
				} else {
					interimTranscript += transcript;
				}
			}
			document.getElementById("js-word").value = finalTranscript;
		}
		recognition.start();
	});
});

//Checks for Palindrome
function isPalindrome(string){
	var reverse = string.split("").reverse().join("");
	for (var i =0; i < Math.floor(string.length/2); i++){
		if(string[i] != reverse[i]){return false;}
	}
	return true;
}

//string to object and takes letters and # of occurance to key/name pairs
function letterCount(str){
	var amount = {};
	var len = str.length;
	//clear the key and value arrays
	keyArray=[];
	valueArray=[];
	while (len--){
		amount[str[len]] = amount[str[len]] + 1 || 1;
	}
	amount = sortObjAlpha(amount);
	for (var key in amount) {
		keyArray.push(key);
		valueArray.push(amount[key]);
	}
	return amount;
}

//Sorts Obj by Key 
function sortObjAlpha(unsorted){
	var sorted = {};
	Object.keys(unsorted).sort().forEach(function(key){
		sorted[key] = unsorted[key];
	});
	return sorted;
}

//turns into a printable string
function objectToString(obj){
	var printVer = "";
	var objletters = obj;
	Object.keys(objletters).forEach(key => {
		printVer += key + ": " + objletters[key] + " ";
	});
	return printVer;
}

function createOutputElement(str){
	var	newpar = document.createElement("p");
	newpar.setAttribute("class", "jsoutput-text");
	var t = document.createTextNode(str);
    newpar.appendChild(t);
    return newpar;
}

function writeInfo(word,populate){
	var nospaceword = word.replace(/[^A-Za-z]/g, '').toLowerCase();
	var phrase = document.createElement("div");
	phrase.setAttribute("class", "phrase");
	phrase.appendChild(createOutputElement("The word or phrase you wrote is: "+word));
	phrase.appendChild(createOutputElement("The word or phrase stripped of everything but letters: "+nospaceword));
	phrase.appendChild(createOutputElement("The length of the string is: "+ word.length));
	phrase.appendChild(createOutputElement("Is the word or phrase you wrote a palindrome? " + isPalindrome(nospaceword)));
	phrase.appendChild(createOutputElement("Amount of times each letter is used: "));
	var totalletters = objectToString(letterCount(nospaceword));
	phrase.appendChild(createOutputElement(totalletters));
	var sp2 = document.getElementById("text-placeholder");
	var parentDiv = sp2.parentNode;
	parentDiv.insertBefore(phrase, sp2);
	buildJSChart();
}

function buildJSChart(){
	var ctx = document.getElementById("JSChart").getContext('2d');
	if (myChart) {
		myChart.destroy();
	}
	myChart = new Chart(ctx, {
		type: 'doughnut',
	    data: {
	    	labels: keyArray,
	    	datasets:[{
	    		label: 'letter value',
	    		data: valueArray,
	    		backgroundColor:['rgb(0, 0, 180)', 'rgb(175, 13, 102)', 'rgb(146,248,70)', 'rgb(255, 200, 47)', 'rgb(255,118,0)', 
	    			'rgb(185,185,185)', 'rgb(235,235,222)', 'rgb(100,100,100)', 'rgb(255,255,0)', 'rgb(55,19,112)', 'rgb(255,255,150)', 
	    			'rgb(202,62,94)', 'rgb(205,145,63)', 'rgb(12,75,100)', 'rgb(255,0,0)', 'rgb(175,155,50)', 'rgb(0,0,0)', 'rgb(37,70,25)', 
	    			'rgb121,33,135)', 'rgb(83,140,208)', 'rgb(0,154,37)', 'rgb(178,220,205)', 'rgb(255,152,213)', 'rgb(0,0,74)', 'rgb(175,200,74)', 
					'rgb(63,25,12)']
	    	}]
	    },
	    options: {
	    	animation:{
	    		animateScale:true
	    	}
		}
	});
}