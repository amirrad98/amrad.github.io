const output = document.getElementById("output");
const input = document.getElementById("command");

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
    output.innerHTML += `\n> ${command}\n`;
    if (commands[command]) {
      output.innerHTML += `${commands[command]}\n`;
    } else {
      output.innerHTML += `Command not found. Type 'help' to see available commands.\n`;
    }
    input.value = "";
    window.scrollTo(0, document.body.scrollHeight);
  }
});
