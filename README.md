Github Pages URL:
https://andrew-sotiriou.github.io/text-manip/html/


Takes a users input and will strip out all non alpha characters  
Display the stripped string and size  
Iterate through the string and count the number of times each letter appears  
Pass those values to ChartJS and display the Chart  
Added initial commit of JQ version which will do the same as the JS version  
Only visual difference is displaying a horizontal bar chart instead of a doughnut  
Both sides are now working.  

Added in code for Speech Recognition.  Now you can click on the microphone and it will update the text box with what you say (desktop only).

Update JS/JQ version to output text with a span element around each letter, each span element will have a color from the colorArray so that each letter will be outputed with a color from the rainbow (it will not append a color for spaces)