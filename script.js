const output = document.getElementById("output");
const input = document.getElementById("command");
//q: make the font size bigger
input.style.fontSize = "16px"; // Increase font size for input  
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
      output.innerHTML += '<div class="output-line">Type "help" to see what you can ask.</div>';
    }
  }, delay);
}

showBlinkingWelcome("Welcome to Amir Etminanrad’s terminal resume.");
const commands = {
  help: "Available commands: help, about, experience, education, contact",
  about: "I'm Amir, a Biochemistry student with a tech twist!",
  experience: "Worked at UNBC, Lab Services, IT, and more...",
  education: "UNBC – BSc in Biochem & Molecular Biology",
  contact: "Email: amir@example.com | GitHub: @amirad"
};

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const command = input.value.trim();

    // Show the command in green
    output.innerHTML += `<div class="command-line">&gt; ${command}</div>`;

    // Show the output in white
    const response = commands[command] || "Command not found. Type 'help' to see available commands.";
    output.innerHTML += `<div class="output-line">${response}</div>`;

    input.value = "";
    window.scrollTo(0, document.body.scrollHeight);
  }
});
