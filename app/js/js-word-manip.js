window.addEventListener('load', function() {
	var button = document.querySelector("button#js-submit");
	button.addEventListener("click", function() {
		var nameValue = document.getElementById("js-word").value;
		var jsoutput =  document.getElementById("js-output");
		if (nameValue.length==0 || nameValue == null){
			jsoutput.innerHTML = "The box above is empty and lonely.";
		}
		else{
   			var elements = document.getElementsByClassName("phrase");
    		while(elements.length > 0){
        		elements[0].parentNode.removeChild(elements[0]);
    		}
			writeInfo(nameValue,jsoutput);
		}
	});
})

//Checks for Palindrome
function isPalindrome(ispally){
	var pallycheck = ispally;
	var pallylength = ispally.length;
	for (var i =0; i < Math.floor(pallylength/2); i++){
		if(pallycheck[i] != pallycheck[pallylength-(i+1)]){return false;}
	}
	return true;
}

//string to object and takes letters and # of occurance to key/name pairs
function letterCount(str){
	var ret = {};
	var len = str.length;
	while (len--){
		ret[str[len]] = ret[str[len]] + 1 || 1;
	}
	//console.log(ret);
	return ret;
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
function objectToString(string){
	var printVer;
	var objletters = string;
	printVer = JSON.stringify(objletters).replace(/[\{\}\"']+/g, '').replace(/[\:']+/g, ': ').replace(/[\,']+/g, ' '); 
	return printVer;
}

function CreateOutputElement(str){
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
	phrase.appendChild(CreateOutputElement("The word or phrase you wrote is: "+word));
	phrase.appendChild(CreateOutputElement("The word or phrase stripped of everything but letters: "+nospaceword));
	phrase.appendChild(CreateOutputElement("The length of the string is: "+ word.length));
	phrase.appendChild(CreateOutputElement("Is the word or phrase you wrote a palindrome? " + isPalindrome(nospaceword)));
	phrase.appendChild(CreateOutputElement("Amount of times each letter is used: "));
	var totalletters = objectToString(sortObjAlpha(letterCount(nospaceword)));
	phrase.appendChild(CreateOutputElement(totalletters));
	var sp2 = document.getElementById("text-placeholder");
	var parentDiv = sp2.parentNode;
	parentDiv.insertBefore(phrase, sp2);

	BuildJSChart(letterCount(nospaceword));
}

function ObjKeyArray(counterObj){
	var keyArray=[];
	var origObj = counterObj;
	for (var key in origObj) {
			keyArray.push(key);
	}
	return keyArray;
}

function ObjValueArray(counterObj){
	var valueArray=[];
	var origObj = counterObj;
	for (var key in origObj) {
			valueArray.push(origObj[key]);
	}
	return valueArray;
}

var myChart;

function BuildJSChart(allArray){
	var keyArray = ObjKeyArray(allArray);
	var valueArray = ObjValueArray(allArray);
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
	    		backgroundColor:['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'pink']
	    	}]
	    },
	    options: {
	    	animation:{
	    		animateScale:true
	    	}
		}
	});
}