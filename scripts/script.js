const FileSystem = {
  readFile: function (path) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", path, false);
    xhr.send();
    return xhr.responseText;
  },
};

const asciiArt = `
███╗   ██╗ █████╗ ████████╗███████╗    ██████╗ ███████╗███████╗██╗   ██╗███████╗███████╗
████╗  ██║██╔══██╗╚══██╔══╝██╔════╝    ██╔══██╗██╔════╝██╔════╝██║   ██║██╔════╝██╔════╝
██╔██╗ ██║███████║   ██║   █████╗      ██████╔╝█████╗  █████╗  ██║   ██║█████╗  ███████╗
██║╚██╗██║██╔══██║   ██║   ██╔══╝      ██╔══██╗██╔══╝  ██╔══╝  ╚██╗ ██╔╝██╔══╝  ╚════██║
██║ ╚████║██║  ██║   ██║   ███████╗    ██║  ██║███████╗███████╗ ╚████╔╝ ███████╗███████║
╚═╝  ╚═══╝╚═╝  ╚═╝   ╚═╝   ╚══════╝    ╚═╝  ╚═╝╚══════╝╚══════╝  ╚═══╝  ╚══════╝╚══════╝
`;

document.getElementById('ascii-art').innerText = asciiArt;

const output = document.getElementById("output");
const input = document.getElementById("command-input");
const prompt = document.getElementById("prompt");

const commands = [
  { name: "help", description: "list all available commands" },
  { name: "about", description: "about me" },
  { name: "skills", description: "languages + tools" },
  { name: "contact", description: "contact" },
  { name: "projects", description: "projects" },
  { name: "clear", description: "clear the terminal" },
  { name: "links", description: "list all the links" },
  { name: "open [link-name]", description: "open a link in a new tab" }
];

const links = {
  "github": "https://github.com/nreeves",
  "linkedin": "https://www.linkedin.com/in/nreeves",
  "buffaloretreat": "https://github.com/nreeves/buffalo-retreat",
  "medicifoundation": "insert soon"
};

const commandHistory = [];
let commandHistoryIndex = 0;

function autoCompleteCommand(command) {
  const commandName = command.split(" ")[0];
  const commandArgs = Object.keys(links).find((link) => link.startsWith(command.split(" ")[1]));
  const filteredCommands = commands.map((command) => command.name).filter((command) => command.startsWith(commandName));
  let autoCompleteCommand = command;
  if (filteredCommands.length === 1) {
    autoCompleteCommand = filteredCommands[0];
  }
  if (filteredCommands.length === 1 && commandArgs) {
    autoCompleteCommand += " " + commandArgs;
  }
  return autoCompleteCommand;
}

document.addEventListener("DOMContentLoaded", () => {
  input.focus();
});

document.addEventListener("click", (event) => {
  const input = document.getElementById("command-input");
  if (!event.target.closest("#command-input")) {
    input.focus();
  }
});

const commandFunctions = {
  help: function () {
    return commands.map((command) => `<span class="text-green">${command.name}</span> - ${command.description} <br>`).join('');
  },
  about: function () {
    return FileSystem.readFile("commands/about.html");
  },
  projects: function () {
    return FileSystem.readFile("commands/project.html");
  },
  contact: function () {
    return FileSystem.readFile("commands/contact.html");
  },
  skills: function () {
    return `<pre class="text-green">JavaScript, Python, HTML, CSS, GIT, Django</pre>`;
  },
  
  open: function (command) {
    const linkName = command.split(" ")[1];
    if (links[linkName]) {
      window.open(links[linkName], "_blank");
      return `Opening ${linkName} in a new tab`;
    } else {
      return `<span class="text-red">Invalid link name: ${linkName}</span>`;
    }
  },
  links: function () {
    return Object.keys(links).join('<br>') + `<br><span class="text-gray">Type "open [link-name]" to open a link in a new tab</span>`;
  },
  clear: function () {
    output.innerHTML = "Type <span class='text-green'>help</span> for a list of commands. <br><br>";
  },
};

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const command = input.value.trim().split(" ")[0];
    const commandArgs = input.value.trim().split(" ")[1];
    input.value = "";
    output.innerHTML += `${prompt.innerHTML}${command} ${commandArgs || ''}<br><br>`;
    
    if (commandFunctions[command]) {
      output.innerHTML += commandFunctions[command](`${command} ${commandArgs}`) + "<br />";
    } else {
      output.innerHTML += `<span class="text-red">Invalid command: ${command}</span>. <br> Type <span class="text-green">help</span> for a list of commands.`;
    }
    scrollToBottom();
  }
  if (event.key === "Tab") {
    event.preventDefault();
    input.value = autoCompleteCommand(input.value);
  }
  if (event.key === "ArrowUp") {
    if (commandHistory.length === 0) return;
    event.preventDefault();
    input.value = commandHistory[commandHistory.length - 1 - commandHistoryIndex];
    commandHistoryIndex = (commandHistoryIndex + 1) % commandHistory.length;
  }
  if (event.key === "ArrowDown") {
    event.preventDefault();
    if (commandHistory.length === 0) return;
    commandHistoryIndex = (commandHistoryIndex - 1 + commandHistory.length) % commandHistory.length;
    input.value = commandHistory[commandHistory.length - 1 - commandHistoryIndex];
  }
});

function scrollToBottom() {
  const shell = document.getElementById("shell");
  shell.scrollTop = output.scrollHeight;
}

function resizeInput() {
  input.style.width = input.value.length + 1 + "ch";
}
