window.addEventListener('load', function() {
	var button = document.querySelector("button#js-submit");
	button.addEventListener("click", function() {
		var nameValue = document.getElementById("js-word").value;
		var jsoutput =  document.getElementById("js-output");
		if (nameValue.length==0 || nameValue == null){
			jsoutput.innerHTML = "The box above is empty and lonely.";
		}
		else{
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
	printVer = JSON.stringify(objletters).replace(/[\{\}\"']+/g, '').replace(/[\:']+/g, ': ').replace(/[\,']+/g, '<br />'); 
	return printVer;
}

function writeInfo(word,populate){
	var nospaceword = word.replace(/[^A-Za-z]/g, '').toLowerCase();
	var text = "<div class='phrase'>The word or phrase you wrote is: <p class='new-line'>" + word + "</p></div><div class='phrase'>The word or phrase stripped of everything but letters: <p class='new-line'>"+ nospaceword + "</p></div><div class='phrase'>The length of the string is: <p class='new-line'>"+ word.length + "</p></div><div class='phrase'>Is the word or phrase you wrote a palindrome? " + isPalindrome(nospaceword);
	var totalletters = objectToString(sortObjAlpha(letterCount(nospaceword)));
	populate.innerHTML = text + "</div><div class='letter-list'>" + totalletters + "</div";
	
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