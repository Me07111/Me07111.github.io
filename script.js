const vowels = ["a","á","e","é","i","í","o","ó","ö","ő","u","ú","ü","ű"]
const consonants = ["b","c","d","f","g","h","j","k","l","ly","m","n","p","s","r","t","v","w","q","x","y","z","cs","dz","dzs","gy","ny","sz","ty","zs"]


  document.getElementById('text-input').value = '';
  document.getElementById('results').innerHTML = '';
  document.getElementById('results').style.visibility = 'hidden'
  document.getElementById('text-input').style.display = 'block';
  document.querySelector(".sidebar p").innerHTML = "Statisztikák"
  // Scroll to top of the main content area
  document.querySelector('.main-content').scrollTop = 0;
  var wasAnalyzed = false

// Event listener for the analyze button
document.getElementById('analyze-btn').addEventListener('click', () => {
  if (wasAnalyzed == false) {
    const inputText = document.getElementById('text-input').value;
    parseText(inputText);
    document.getElementById('results').style.visibility = 'visible'
    wasAnalyzed = true
  }
});

// Event listener for the restart button
document.getElementById('restart-btn').addEventListener('click', () => {
  // Clear the input and results
  document.getElementById('text-input').value = '';
  document.getElementById('results').innerHTML = '';
  document.getElementById('results').style.display = 'none';
  document.getElementById('text-input').style.display = 'block';
  document.querySelector(".sidebar p").innerHTML = "Statisztikák"
  // Scroll to top of the main content area
  document.querySelector('.main-content').scrollTop = 0;
  document.getElementById('results').style.visibility = 'hidden'
});



function parseText(text){
  // Perform text parsing and highlighting
  //const text = body.text; // Get the entire text of the document
  const Clines = text.split("\n"); // Split the text into lines
  let rhymeLineDepth = 1
  let linesT = []
  let lines = []
  syllableCounts = []
  wordCounts = []
  detectEndRhymes = true
  detectStartRhymes = true
  detectInLineRhymes = true
  let sylPat = []
  let lineStarts = [0]
  let pattern = new Map()
  let stats = new Map()
  stats.set("Rímeló szótagok",0)
  stats.set("szótagok",0)
  stats.set("unique words",0)
  stats.set("syllable rhymes",[])

  //splitting text into lines
  for (let i = 0; i < Clines.length; i++) 
  {
    linesT[i] = Clines[i].split(" ")
  }

  //splitting into sylllables
  for (let i = 0; i < linesT.length; i++) {
    for (let j = 0; j < linesT[i].length; j++) {
      word = linesT[i][j]
      linesT[i][j] = toSyllables(word)
    }
  }

  //making lines
  for (let i = 0; i < linesT.length; i++) {
    lines.push(linesT[i]);
  }

  //making line lengts
  for (let i = 0; i < lines.length; i++) {
    l = 0
    wordCounts.push(lines[i].length)
    for (let j = 0; j < lines[i].length; j++) {
      l+=lines[i][j].length
    }
    syllableCounts.push(l)
    l = 0
  }

   //add rhyme data (which syl has what vowel in it)
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      for (let k = 0; k < lines[i][j].length; k++) {
        t = lines[i][j][k]
        lines[i][j][k] = addRhymeData(t)
      }
    }
  }
  //making syl pattern
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]
    sylPat.push([])
    for (let j = 0; j < line.length; j++) {
      let word = line[j]
      for (let k = 0; k < word.length; k++) {
        let syl = word[k]
        sylPat[i].push(syl[1])
      }
    }
  }

  //declare the pattern we manipulate couse we need a one dimensional array so we can add and remove easily
  let highlightPattern = []
  //fill the highligt pattern and make lineStarts
  for (let i = 0; i < sylPat.length; i++) {
    let line = sylPat[i]
    for (let j = 0; j< line.length; j++) {
      highlightPattern.push(false)
    }
    lineStarts.push(highlightPattern.length)
  }
  //detect beginning rhymes
if(detectStartRhymes)
   {
    for (let i = 0; i < sylPat.length; i++) {
    let line = sylPat[i] 
    let pattern = []
    let patternIndices = [] 
    lineStarts.push(highlightPattern.length)
    let linesToCheck = []
      for (let i = 1; i < rhymeLineDepth+1; i++) {
        linesToCheck.push(i)
        linesToCheck.push(-i)
      }
    for (let j = 0; j < line.length; j++) {
      let syl = line[j]
      let doesRhyme = false
      let toSlice = []
      for (let b = 0;b < linesToCheck.length;b++){
        if (((i + linesToCheck[b] < sylPat.length) && linesToCheck[b] > 0 || (i + linesToCheck[b] >= 0) && linesToCheck[b] < 0) && (syl === sylPat[i + linesToCheck[b]][j])) {
          doesRhyme = true
          highlightPattern[lineStarts[i] + j] = true;
          continue
        } else {
          toSlice.push(b)
        }
      }
      for (let n = 0; n < toSlice.length; n++) {
        linesToCheck.splice(toSlice[n],1)
      }
      toSlice = []
      if(!doesRhyme){
          break;
        } 
    }
  }
}
  //detect end rhymes
if(detectEndRhymes)
  {
   for (let i = 0; i < sylPat.length; i++) {
   let line = sylPat[i].slice().reverse()
      lineStarts.push(highlightPattern.length)
   let linesToCheck = []
     for (let i = 1; i < rhymeLineDepth+1; i++) {
       linesToCheck.push(i)
       linesToCheck.push(-i)
     }
   for (let j = 0; j < line.length; j++) {
     let syl = line[j]
     let doesRhyme = false
     let toSlice = []
     for (let b = 0;b < linesToCheck.length;b++){
       if (((i + linesToCheck[b] < sylPat.length) && (linesToCheck[b] > 0 || ((i + linesToCheck[b] >= 0)) && linesToCheck[b] < 0)) && (syl === sylPat[i + linesToCheck[b]].slice().reverse()[j])) {
         doesRhyme = true
         highlightPattern[lineStarts[i]+(line.length-(j+1))] = true;
         continue
       } else {
         toSlice.push(b)
       }
     }
     for (let n = 0; n < toSlice.length; n++) {
       linesToCheck.splice(toSlice[n],1)
     }
     toSlice = []
     if(!doesRhyme){
         break;
       } 
   }
 }
}
//detect inline rhymes and all other rhymes that are not the end rhymes
if(detectInLineRhymes)
  {
    let starts = []
    let lines = []
    for (let i = 0; i < sylPat.length; i+=2) {
      if (i+1 < sylPat.length) {
        lines.push(sylPat[i].concat(sylPat[i + 1]))
        starts.push(lineStarts[i])
      }
    }

    for (let i = 1; i < sylPat.length; i+=2) {
      if (i+1 < sylPat.length) {
        lines.push(sylPat[i].concat(sylPat[i + 1]))
        starts.push(lineStarts[i])
      }
    }

    //console.log(starts,lines)
    for (let i = 0; i < starts.length; i++) {
      let start = starts[i]
      let line = lines[i]
      let result = findPatterns(line,2,4).indices
      //console.log(result)
      for (let j = 0; j < result.length; j++) {
        //console.log(start + result[j])
        highlightPattern[start + result[j]] = true 
      }
    }
  }

  //applying highlighting to the input of logResults
  let tInd = 0
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]
    for (let j = 0; j < line.length; j++) {
      let word = line[j]
      for (let k = 0; k < word.length; k++) {
        let syl = word[k]
        word[k].push(highlightPattern[tInd])
        tInd++
      }
    }
  }

  //UPDATE STATS
  stats.set("szótagok",highlightPattern.length)
  stats.set("Rímeló szótagok",highlightPattern.filter(Boolean).length)
  let result = []
  result.push(lines)
  result.push(syllableCounts)
  result.push(wordCounts)
  logResults(result,stats)
}

function logResults(results, stats) {
  let lines = results[0];
  let syllableCounts = results[1];
  let wordCounts = results[2];
  const colors = [
      'rgb(255,0,0)',     // Red
      'rgb(255,158,3)',   // Orange
      'rgb(255,242,3)',   // Yellow
      'rgb(145,255,0)',   // Lime
      'rgb(140,13,2)',    // Dark Red
      'rgb(202,0,252)',   // Purple
      'rgb(250,2,180)',   // Pink
      'rgb(105,108,112)', // Gray
      'rgb(50,50,50)',
  ];

  let usedSyllables = [];
  let undefinedLine = false;
  let resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = ''; // Clear previous results

  for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      let lineDiv = document.createElement('div');
      undefinedLine = false;
      
      for (let k = 0; k < line.length; k++) {
          let word = line[k];
          let wordSpan = document.createElement('span');
          wordSpan.textContent = ' ';
          
          for (let j = 0; j < word.length; j++) {
              let syl = word[j];
              let sylSpan = document.createElement('span');
              
              if (syl[0] === 'undefined') {
                  sylSpan.style.color = 'white';
                  sylSpan.textContent = '\n';
                  undefinedLine = true;
                  continue;
              }

              if (syl[2] === true) {
                  if (usedSyllables.indexOf(syl[1]) !== -1) {
                      let index = usedSyllables.indexOf(syl[1]);
                      sylSpan.style.color = colors[index];
                  } else {
                      usedSyllables.push(syl[1]);
                      let index = usedSyllables.indexOf(syl[1]);
                      sylSpan.style.color = colors[index];
                  }
                  sylSpan.textContent = syl[0];
              } else {
                  sylSpan.textContent = syl[0];
              }
              wordSpan.appendChild(sylSpan);
          }
          lineDiv.appendChild(wordSpan);
      }
      
      if (!undefinedLine) {
          let statsSpan = document.createElement('span');
          statsSpan.style.color = '#fff'; // White text
          statsSpan.textContent = `    ${wordCounts[i]}sz ${syllableCounts[i]}szt`;
          lineDiv.appendChild(statsSpan);
      }

      resultsDiv.appendChild(lineDiv);
  }
  document.querySelector(".sidebar p").innerHTML += `<br></br>`
  stats.forEach((value, key) => {
    string = ` ${key}: ${value} `
    document.querySelector(".sidebar p").innerHTML += `<br> ${string} </br>`
});


  // Hide the text input and show the results
  document.getElementById('text-input').style.display = 'none';
  resultsDiv.style.display = 'block';
}

function addRhymeData(syl)
{
if (syl.includes("a") || syl.includes("A")) {
  return [syl,"a"]
} else if(syl.includes("á") || syl.includes("Á")) {
  return [syl,"á"]
}
else if(syl.includes("e") || syl.includes("E")) {
  return [syl,"e"]
}
else if(syl.includes("é") || syl.includes("É")) {
  return [syl,"é"]
}
else if(syl.includes("i") || syl.includes("í") || syl.includes("I")|| syl.includes("Í")) {
  return [syl,"i"]
}
else if(syl.includes("o") || syl.includes("ó") || syl.includes("O")|| syl.includes("Ó")) {
  return [syl,"o"]
}
else if(syl.includes("ö") || syl.includes("ő") || syl.includes("Ö")|| syl.includes("Ő")) {
  return [syl,"ö"]
}
else if(syl.includes("u") || syl.includes("ú") || syl.includes("U")|| syl.includes("Ú")) {
  return [syl,"u"]
}
else if(syl.includes("ü") || syl.includes("ű") || syl.includes("Ü")|| syl.includes("Ű")) {
  return [syl,"ü"]
}
}

function toSyllables(word) {
  chars = splitIntoChars(word).reverse();
  let result = [];
  let vowelFound = false;
  let consonantAfterVowelFound = false;
  let syl = "";
  chars.forEach((chary) => {
    if (consonants.includes(chary.toLowerCase()) && vowelFound == false) {
      syl = syl + chary.split("").reverse().join("");
    } else if (vowels.includes(chary.toLowerCase()) && vowelFound == false) {
      syl = syl + chary.split("").reverse().join("");
      vowelFound = true;
    } else if (
      consonants.includes(chary.toLowerCase()) &&
      consonantAfterVowelFound == true
    ) {
      result.push(syl.split("").reverse().join(""));
      syl = chary.split("").reverse().join("");
      vowelFound = false;
      consonantAfterVowelFound = false;
    } else if (consonants.includes(chary.toLowerCase()) && vowelFound == true) {
      syl = syl + chary.split("").reverse().join("");
      consonantAfterVowelFound = true;
    } else if (vowels.includes(chary.toLowerCase()) && vowelFound == true) {
      result.push(syl.split("").reverse().join(""));
      syl = chary.split("").reverse().join("");
      vowelFound = true;
      consonantAfterVowelFound = false;
    }
  });
  result.push(syl.split("").reverse().join(""));
  result = result.reverse()
  if(/[aeiouáéíóöőúüűAEIOUÁÉÍÓÖŐÚÜŰ]/.test(result[0]) == false)
    {
      t = result.shift()
      result[0] = t + result[0]
    }
  return result
}

function splitIntoChars(str) {
  // Define the Hungarian alphabet including special double and triple characters
  const hungarianAlphabet = [
    "a",
    "á",
    "b",
    "c",
    "cs",
    "d",
    "dz",
    "dzs",
    "e",
    "é",
    "f",
    "g",
    "gy",
    "h",
    "i",
    "í",
    "j",
    "k",
    "l",
    "ly",
    "m",
    "n",
    "ny",
    "o",
    "ó",
    "ö",
    "ő",
    "p",
    "q",
    "r",
    "s",
    "sz",
    "t",
    "ty",
    "u",
    "ú",
    "ü",
    "ű",
    "v",
    "w",
    "x",
    "y",
    "z",
    "zs",
    "A",
    "Á",
    "B",
    "C",
    "Cs",
    "D",
    "Dz",
    "Dzs",
    "E",
    "É",
    "F",
    "G",
    "Gy",
    "H",
    "I",
    "Í",
    "J",
    "K",
    "L",
    "Ly",
    "M",
    "N",
    "Ny",
    "O",
    "Ó",
    "Ö",
    "Ő",
    "P",
    "Q",
    "R",
    "S",
    "Sz",
    "T",
    "Ty",
    "U",
    "Ú",
    "Ü",
    "Ű",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "Zs",
  ];

  // Initialize an empty array to store the characters
  const result = [];

  // Loop through each character in the string
  let i = 0;
  while (i < str.length) {
    let char = str[i];
    // Check if the character is part of a special double character
    // Check if the character is part of a special triple character
    if (i < str.length - 2) {
      const tripleChar = str.substr(i, 3);
      if (tripleChar.toLowerCase() === "dzs") {
        char = tripleChar;
        i += 2; // Skip the next two characters
      }
    }

    if (i < str.length - 1) {
      const doubleChar = str.substr(i, 2);
      if (hungarianAlphabet.includes(doubleChar)) {
        char = doubleChar;
        i++; // Skip the next character
      }
    }
    // Check if the character is in the Hungarian alphabet
    if (hungarianAlphabet.includes(char)) {
      result.push(char); // Add the character to the result array
    }
    i++;
  }

  return result;
}

function findPatterns(array, minPatternLength, maxPatternLength) {
  let indices = [];
  let patterns = [];
  let usedIndices = new Set();

  function arraySliceEquals(arr, start1, start2, length) {
      for (let i = 0; i < length; i++) {
          if (arr[start1 + i] !== arr[start2 + i]) {
              return false;
          }
      }
      return true;
  }

  for (let length = maxPatternLength; length >= minPatternLength; length--) {
      for (let i = 0; i <= array.length - length; i++) {
          let pattern = array.slice(i, i + length);
          let matchFound = false;
          
          for (let j = i + length; j <= array.length - length; j++) {
              if (arraySliceEquals(array, i, j, length)) {
                  if (!matchFound) {
                      patterns.push([[...Array(length).keys()].map(x => x + i), pattern]);
                      matchFound = true;
                      for (let k = 0; k < length; k++) {
                          usedIndices.add(i + k);
                      }
                  }
                  patterns.push([[...Array(length).keys()].map(x => x + j), pattern]);
                  for (let k = 0; k < length; k++) {
                      usedIndices.add(j + k);
                  }
              }
          }
      }
  }

  indices = Array.from(usedIndices).sort((a, b) => a - b);

  return {
      indices: indices,
      patterns: patterns
  };
}