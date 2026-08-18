const morseMap = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.',
  'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
  'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
  'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
  'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
  'Z': '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--',
  '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
  '9': '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.',
  '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...',
  ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-',
  '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.', ' ': '/'
};

const reverseMap = {};
for (let key in morseMap) {
  reverseMap[morseMap[key]] = key;
}

function translateToMorse() {
  const input = document.getElementById("inputText").value.toUpperCase();
  if (!input.trim()) {
    document.getElementById("outputMorse").value = "";
    return;
  }

  const morseWords = input.split(/\s+/).map(word => {
    return word.split('').map(char => morseMap[char] || '?').join(' ');
  });

  document.getElementById("outputMorse").value = morseWords.join(" / ");
}

function translateToEnglish() {
  const input = document.getElementById("inputMorse").value.trim();
  if (!input) {
    document.getElementById("outputText").value = "";
    return;
  }

  const morseWords = input.split(/\s*\/\s*|\s{3,}/);
  const englishWords = morseWords.map(word => {
    const chars = word.trim().split(/\s+/);
    return chars.map(morseChar => {
      if (!morseChar) return '';
      return reverseMap[morseChar] || '?';
    }).join('');
  });

  document.getElementById("outputText").value = englishWords.join(" ");
}

// Add real-time translation bindings
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('inputText').addEventListener('input', translateToMorse);
  document.getElementById('inputMorse').addEventListener('input', translateToEnglish);

  // Set dates just like the reference photo top left
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const today = new Date().toLocaleDateString('en-US', options);
  if (document.getElementById('dateText')) document.getElementById('dateText').textContent = today;
  if (document.getElementById('dateMorse')) document.getElementById('dateMorse').textContent = today;
});

// Copy to Clipboard logic
function copyToClipboard(elementId, btnElement) {
  const copyText = document.getElementById(elementId);
  if (!copyText.value) return;

  // Modern clipboard API
  navigator.clipboard.writeText(copyText.value).then(() => {
    // Visual feedback success state
    btnElement.classList.add('copied');
    // Change SVG to Checkmark
    const originalSVG = btnElement.innerHTML;
    btnElement.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="3" fill="none"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

    // Revert back after 2 seconds
    setTimeout(() => {
      btnElement.classList.remove('copied');
      btnElement.innerHTML = originalSVG;
    }, 2000);
  });
}

