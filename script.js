const morseMap = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.',
  'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
  'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
  'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
  'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
  'Z': '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--',
  '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
  '9': '----.', ' ': '/'
};

const reverseMap = {};
for (let key in morseMap) {
  reverseMap[morseMap[key]] = key;
}

function translateToMorse() {
  const input = document.getElementById("inputText").value.toUpperCase();
  let morse = "";

  for (let char of input) {
    morse += morseMap[char] ? morseMap[char] + " " : "? ";
  }

  const reversed = morse.trim().split("").reverse().join("");
  document.getElementById("outputMorse").value = reversed;
}

function translateToEnglish() {
  const input = document.getElementById("inputMorse").value.trim();
  if (!input) {
    document.getElementById("outputText").value = "";
    return;
  }
  const unreversed = input.split("").reverse().join("");
  const morseWords = unreversed.split(" / ");
  let english = "";

  for (let word of morseWords) {
    const chars = word.trim().split(" ");
    for (let morseChar of chars) {
      if (morseChar) {
        english += reverseMap[morseChar] || "?";
      }
    }
    english += " ";
  }

  document.getElementById("outputText").value = english.trim();
}

// Add real-time translation bindings
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('inputText').addEventListener('input', translateToMorse);
  document.getElementById('inputMorse').addEventListener('input', translateToEnglish);

  // Set dates just like the reference photo top left
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const today = new Date().toLocaleDateString('en-US', options);
  document.getElementById('dateText').textContent = today;
  document.getElementById('dateMorse').textContent = today;
});
