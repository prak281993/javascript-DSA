// checking if a word exist in string
let petString = "James has a pet cat.";
let petRegex = /has/; 
let result = petRegex.test(petString);

// check for multile possibilities
petString = "James has a pet cat.";
petRegex = /dog|cat|bird|fish/;
result = petRegex.test(petString);

// ignore case matching
let myString = "freeCodeCamp";
let fccRegex = /freecodecamp/i;
result = fccRegex.test(myString);

// matching a string
let extractStr = "Extract the word 'coding' from this string.";
let codingRegex = /coding/;
result = extractStr.match(codingRegex);

// match a pattern more than once using /g
let twinkleStar = "Twinkle, twinkle, little star";
let starRegex = /twinkle/gi;
result = twinkleStar.match(starRegex);

// match any character using wildcard "."
let exampleStr = "Let's have fun with regular expressions!";
let unRegex = /.un/; // this will match with fun, sun, run, pun
result = unRegex.test(exampleStr);

//Character classes allow you to define a group of 
//characters you wish to match by placing them inside square ([ and ]) brackets.
let quoteSample = "Beware of bugs in the above code; I have only proved it correct, not tried it.";
let vowelRegex = /[aeiou]/gi; 
result = quoteSample.match(vowelRegex); 

// "-" range
quoteSample = "The quick brown fox jumps over the lazy dog.";
let alphabetRegex = /[a-z]/gi; // Change this line
result = quoteSample.match(alphabetRegex); // Change this line


// negation "^"
quoteSample = "3 blind mice.";
let myRegex = /[^0-9aeiou]/ig; // Change this line
result = quoteSample.match(myRegex); // Change this line

// Match Characters that Occur One or More Times using "+"
let difficultSpelling = "Mississippi";
myRegex = /s+/gi; // Change this line
result = difficultSpelling.match(myRegex);

// Match Characters that Occur Zero or More Times
let chewieQuote = 'Aaaaaaaaaaaaaaaarrrgh!';
let chewieRegex = /Aa*/;

result = chewieQuote.match(chewieRegex);

// laxy match using "?"
let text = "<h1>Winter is coming</h1>";
myRegex = /<.*?>/; 
result = text.match(myRegex); // output <h1>

// search at end of a string using "$"
let caboose = "The last car on a train is the caboose";
let lastRegex = /caboose$/; // Change this line
result = lastRegex.test(caboose);

// use "\w" to match all alphanumeric characters in a string, it also matches '_(underscore)'
quoteSample = "The five boxing wizards jump quickly.";
let alphabetRegexV2 = /\w/g; // Change this line
result = quoteSample.match(alphabetRegexV2).length;

// use "\W" to match all non alphanumeric characters
quoteSample = "The five boxing wizards jump quickly.";
let nonAlphabetRegex = /\W/g; // Change this line
result = quoteSample.match(nonAlphabetRegex).length;

// match only digits using "\d"
movieName = "2001: A Space Odyssey";
let numRegex = /\d/g; // Change this line
result = movieName.match(numRegex).length;

// match all non numbers using "\D"
movieName = "2001: A Space Odyssey";
let noNumRegex = /\D/g; // Change this line
result = movieName.match(noNumRegex).length;

// username should have only alphanumeric characters
// username cannot start with a number, there can be zero or more numbers at the end
// Username letters can be lowercase and uppercase.
// Usernames have to be at least two characters long. \
// A two-character username can only use alphabet letters as characters.
let username = "JackOfAllTrades";
let userCheck = /^[a-z][a-z]+\d*$|^[a-z]\d\d+$/i; // Change this line
result = userCheck.test(username);

// 1.^ - start of input
// 2.[a-z] - first character is a letter
// 3.[a-z]+ - following characters are letters
// 4.\d*$ - input ends with 0 or more digits
// 5.| - or
// 6.^[a-z] - first character is a letter
// 7.\d\d+ - following characters are 2 or more digits
// 8.$ - end of input


// check whitespaces using "\s", it is equivalent to "[ \r\t\f\n\v]"
let sample = "Whitespace is important in separating words";
let countWhiteSpace = /\s/g; // Change this line
result = sample.match(countWhiteSpace);

// match non whitespace using "\S"

// match using range "{}"
let ohStr = "Ohhh no";
let ohRegex = /Oh{3,6} no/;
result = ohRegex.test(ohStr);


// check using grouping "()"
myString = "Eleanor Roosevelt";
myRegex = /(Franklin|Eleanor)\s.*Roosevelt/;
result = myRegex.test(myString); 

// Use capture groups in reRegex to match numbers that are repeated
// only three times in a string, each separated by a space.
let repeatNum = "42 42 42";
let reRegex = /^(\d+)\s\1\s\1$/;
result = reRegex.test(repeatNum);


// Use Capture Groups to Search and Replace
let str = "one two three";
let fixRegex = /(\w+)\s(\w+)\s(\w+)/; // Change this line
let replaceText = "$3 $2 $1"; // Change this line
result = str.replace(fixRegex, replaceText);

// remove spaces from beginning and end of string
let hello = "   Hello, World!  ";
let wsRegex = /^\s*|\s*$/g;
result = hello.replace(wsRegex,"");