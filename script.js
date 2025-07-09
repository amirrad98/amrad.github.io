const output = document.getElementById("output");
const input = document.getElementById("command");
//q: make the font size bigger
input.style.fontSize = "15px"; // Increase font size for input
output.style.fontSize = "16px"; // Increase font size for output 
// Welcome message printed on load


function showBlinkingWelcome(text, delay = 100) {
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
      output.innerHTML += '<div class="output-line">Type "help" to see what you can ask.</div>';
      enableCommandHandler(); // Enable input now
    }
  }, delay);
}

showBlinkingWelcome("Welcome to Amir Etminanrad’s terminal resume.");


const directories = {
  '/': ['about', 'contact', 'education', 'skills', 'interests'],
  '/about': ['bio', 'location'],
  '/about/bio': 'I am Amir Etminanrad, a biochemistry student with a passion for technology.',
  '/about/location': 'Currently based in Canada.',
  '/contact': ['email', 'github'],
  '/contact/email': 'amir@example.com',
  '/contact/github': 'GitHub: @amirad',
  '/education': ['undergrad'],
  '/education/undergrad': 'Biochemistry and Molecular Biology at UNBC.',
  '/skills': ['soft', 'technical'],
  '/skills/soft': 'Teamwork, communication, problem-solving.',
  '/skills/technical': 'Photography, 3D modeling, basic coding.',
  '/interests': ['sports', 'tech'],
  '/interests/sports': 'Soccer, rock climbing, fitness.',
  '/interests/tech': 'AI, automation, Raspberry Pi projects.'
};

let currentDir = '/';
function enableCommandHandler() {
  input.addEventListener('keydown', e => {
    if (e.key !== 'Enter' || !input.value.trim()) return;
    const cmd = input.value.trim();
    output.innerHTML += `<div class="command-line">${currentDir} > ${cmd}</div>`;
    const lowerCmd = cmd.toLowerCase();

    if (lowerCmd === 'ls') {
      const contents = Array.isArray(directories[currentDir])
        ? directories[currentDir].join('    ')
        : '(no subdirectories)';
      output.innerHTML += `<div class="output-line">${contents}</div>`;
    } else if (lowerCmd === 'cd ..') {
      if (currentDir !== '/') {
        const parts = currentDir.split('/').filter(Boolean);
        parts.pop();
        currentDir = '/' + parts.join('/');
        if (currentDir === '') currentDir = '/';
      }
    } else if (lowerCmd.startsWith('cd ')) {
      const target = cmd.slice(3).trim();
      let newPath;
      if (target.startsWith('/')) {
        newPath = target;
      } else {
        newPath = currentDir === '/' ? `/${target}` : `${currentDir}/${target}`;
      }
      if (directories[newPath] && Array.isArray(directories[newPath])) {
        currentDir = newPath;
      } else if (directories[newPath] && typeof directories[newPath] === 'string') {
        output.innerHTML += `<div class="output-line">${directories[newPath]}</div>`;
      } else {
        output.innerHTML += `<div class="output-line">No such directory: ${target}</div>`;
      }
    } else if (directories[`${currentDir}/${cmd}`] && typeof directories[`${currentDir}/${cmd}`] === 'string') {
      output.innerHTML += `<div class="output-line">${directories[`${currentDir}/${cmd}`]}</div>`;
    } else if (directories[currentDir] && Array.isArray(directories[currentDir]) && directories[currentDir].includes(cmd)) {
      // If user types a directory name, treat as 'cd'
      const newPath = currentDir === '/' ? `/${cmd}` : `${currentDir}/${cmd}`;
      if (directories[newPath] && Array.isArray(directories[newPath])) {
        currentDir = newPath;
      } else if (directories[newPath] && typeof directories[newPath] === 'string') {
        output.innerHTML += `<div class="output-line">${directories[newPath]}</div>`;
      } else {
        output.innerHTML += `<div class="output-line">No such directory or file: ${cmd}</div>`;
      }
    } else {
      output.innerHTML += `<div class="output-line">Unknown command or file. Try 'ls', 'cd [dir]', or 'cd ..'</div>`;
    }

    input.value = '';
    window.scrollTo(0, document.body.scrollHeight);
  });
}
