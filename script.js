/*
Here I created a dictionary for different characters.
I included small and capital letters of English language, some special characters
and also three leters ('ü', 'ä', 'ö') that was needed for the last sentence that was in German languge.
*/
var charsDictionary = {
    "a": "3A",
    "b": "77",
    "c": "C280",
    "d": "7F",
	"e": "70",
	"f": "75",
	"g": "56",
	"h": "73",
	"i": "74",
	"j": "71",
	"k": "76",
	"l": "6D",
	"m": "58",
	"n": "63",
	"o": "51",
	"p": "4C",
	"q": "7C",
	"r": "7D",
	"s": "7E",
	"t": "6F",
	"u": "6E",
	"v": "C281",
	"w": "C282",
	"x": "3F",
	"y": "C284",
	"z": "C38F",
	"A": "7B",
    "B": "4D",
    "C": "50",
    "D": "4F",
	"E": "4E",
	"F": "7A",
	"G": "52",
	"H": "53",
	"I": "3C",
	"J": "55",
	"K": "72",
	"L": "57",
	"M": "78",
	"N": "59",
	"O": "5A",
	"P": "5B",
	"Q": "5C",
	"R": "5E",
	"S": "5D",
	"T": "5F",
	"U": "60",
	"V": "61",
	"W": "62",
	"X": "79",
	"Y": "64",
	"Z": "65",
    " ": "2B",    
    "\n": "15",
    "!": "45",
    "\"": "2D",
    "-": "38",
    "'": "32",
    "(": "33",
    ")": "34",
    "*": "35",
    "+": "36",
    ",": "37",
    "-": "38",
    ".": "39",
    "/": "6C",
    ":": "2C",
    ";": "46",
    "<": "47",
    "=": "48",
    ">": "49",
    "?": "4A",
    "[": "66",
    "\\": "67",
    "]": "68",
    "^": "69",
    "_": "6A",
    "`": "6B",
    "&uuml;": "C487", //this is for letter 'ü'
    "&auml;": "C3AF", //this is for letter 'ä'
    "&#246;": "2E",  //this is for letter 'ö'
    "1": "54",
    "2": "3D",
    "3": "3E",
    "4": "C283",
    "5": "40",
    "6": "41",
    "7": "42",
    "8": "43",
    "9": "44",
    "0": "3B"  
};

//This function does all the logic for decoding the entered text.
function decodeString(value) {

    var decodedValue = '';
    var decodeDictionary = getDecodeDictionary(charsDictionary);
    // Here I created two variables for substring
    // We will increase then during the while operation below.
    var startIndex = 0;
    var endIndex = 2;
    // Here I am saving the entered value to a temp variable
    // and during the while operation we will remove the decoded characters from tmp variable.
    // With this method we will know when to exit from While Loop operation.
    var tmp = value;

    while(tmp.length != 0){
        //Here I am getting characters to decode using substring
        var currentChar = value.substring(startIndex, endIndex);
        // This condition checks for the characters that starts with C2, C3 and C4 since they are
        // four characters like character 'c' is equal to 'C280' or letter 'w' is 'C282'
        // so for these cases I increased the endIndex by 2.
        if(currentChar.indexOf("C2") != -1 || currentChar.indexOf("C3") != -1 || currentChar.indexOf("C4") != -1)
        {
            endIndex += 2;
            currentChar = value.substring(startIndex, endIndex);
        }
        var decodedChar = decodeDictionary[currentChar];
        // here we concatinate the new text
        decodedValue += decodedChar === undefined ? currentChar : decodedChar;
        // Also we increase the startIndex for cases like character 'c' is equal to 'C280' or letter 'w' is 'C282' 
        if(currentChar.indexOf("C2") != -1 || currentChar.indexOf("C3") != -1 || currentChar.indexOf("C4") != -1)
            startIndex += 4;
        else 
            startIndex+=2;

        endIndex += 2;
        //Here we remove the character from tmp value
        //This is so we know where to get out of while loop
        tmp = tmp.replace(currentChar,"");
    }  
    return decodedValue;
}
/* 
Here we switch the key and value of dictionary.
So for example: 
before: var d = {"a":"3A" }
after:  var d = {3A: "a"}
*/
function getDecodeDictionary(dictionary) {
    var decodeDictionary = {};
    
    for (var prop in dictionary) {
        if(dictionary.hasOwnProperty(prop)) {
            decodeDictionary[dictionary[prop]] = prop;
        }
    }

    return decodeDictionary;
}

function decodeBtn() {
    //Here we get the value from the textarea
    var input = $('#enteredText').val();
    //Here we set value of textare with the decoded text
    $("#decodedText").html(decodeString(input));
}

