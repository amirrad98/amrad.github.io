const output = document.getElementById("output");
const input = document.getElementById("command");
//q: make the font size bigger
input.style.fontSize = "15px"; // Increase font size for input
output.style.fontSize = "16px"; // Increase font size for output 
// Welcome message printed on load
function showBlinkingWelcome(text, delay = 50) {
  let index = 0;
  const welcomeLine = document.createElement('div');
  welcomeLine.classList.add('output-line');
  output.appendChild(welcomeLine);

  const interval = setInterval(() => {
    welcomeLine.textContent = text.substring(0, index) + (index % 2 === 0 ? '_' : ' ');
    index++;
    if (index > text.length) {
      clearInterval(interval);
      welcomeLine.textContent = text; // Final display
      // q: how to add a blinking cursor effect?
      welcomeLine.innerHTML += '<span class="blinking-cursor">_</span>';
      // Scroll to the bottom of the output
      window.scrollTo(0, document.body.scrollHeight);
      // Show the initial help message
      output.innerHTML += '<div class="output-line">Type "/help" to see what you can ask.</div>';
    }
  }, delay);
}
showBlinkingWelcome("Welcome to Amir Etminanrad’s terminal resume.");


const directories = {
  '/': ['about', 'contact', 'education', 'skills', 'interests'],
  '/about': 'I am Amir Etminanrad.',
  '/contact': 'Email: amir@example.com | GitHub: @amirad',
  '/education': 'Studying Biochemistry and Molecular Biology at UNBC.',
  '/skills': 'Teamwork, problem-solving, photography, 3D modeling, basic coding.',
  '/interests': 'Tech, AI, outdoor adventures, soccer, fitness.'
};

input.addEventListener('keydown', e => {
  if (e.key !== 'Enter' || !input.value.trim()) return;
  const cmd = input.value.trim().toLowerCase();
  output.innerHTML += `<div class="command-line">${currentDir} > ${cmd}</div>`;

  if (cmd === 'ls') {
    const contents = Array.isArray(directories[currentDir]) ? directories[currentDir].join('  ') : '(no subdirectories)';
    output.innerHTML += `<div class="output-line">${contents}</div>`;
  } else if (cmd.startsWith('cd ')) {
    const target = cmd.slice(3);
    const newPath = currentDir === '/' ? `/${target}` : `${currentDir}/${target}`;
    if (directories[newPath]) {
      currentDir = newPath;
    } else {
      output.innerHTML += `<div class="output-line">No such directory: ${target}</div>`;
    }
  } else if (directories[currentDir] && typeof directories[currentDir] === 'string') {
    output.innerHTML += `<div class="output-line">${directories[currentDir]}</div>`;
  } else if (directories[`${currentDir}/${cmd}`]) {
    output.innerHTML += `<div class="output-line">${directories[`${currentDir}/${cmd}`]}</div>`;
  } else {
    output.innerHTML += `<div class="output-line">Unknown command or file. Try 'ls' or 'cd [directory]'.</div>`;
  }

  input.value = '';
  window.scrollTo(0, document.body.scrollHeight);
});

