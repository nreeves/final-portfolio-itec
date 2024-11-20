class FileSystem {
  static readFile(path) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", path, false);
    xhr.send();
    return xhr.responseText;
  }
}

import TitleHeader from './title.js';
document.getElementById('ascii-art').innerText = TitleHeader;


const output = document.getElementById("output");
const input = document.getElementById("cinput");
const prompt = document.getElementById("prompt");

const stacklist = [
  ["JavaScript", "Python", "HTML", "CSS"],
  ["Git", "Django", "Java", "..."],
];

const commandHistory = [];

document.addEventListener("DOMContentLoaded", () => input.focus());
document.addEventListener("click", () => input.focus());

const commandFunctions = {
  list() {
    return commands.map(command => `<span class="text-green">${command.command}</span> - ${command.details} <br>`).join('');
  },
  ls() {
    return this.list();
  },
  about() {
    return FileSystem.readFile("commands/about.html");
  },
  projects() {
    return FileSystem.readFile("commands/project.html");
  },
  contact() {
    return FileSystem.readFile("commands/contact.html");
  },
  db() {
    return FileSystem.readFile("commands/database.html");
  },
  resume() {
    const resumeURL = "commands/resume.html";
    window.open(resumeURL, "_blank");
    return `Opening <span class="text-green">resume</span> in a new tab.`;
  },
  skills() {
    const { table, maxCellLength } = createTable(stacklist);
    const containerWidth = maxCellLength * stacklist[0].length * 10 + 20;
    return `<div style="width:${containerWidth}px" class="text-green"> <pre>${table}</pre> </div>`;
  },
  open(command) {
    const args = command.split(" ");
    if (args.length < 2) {
      return `<span class="text-red"> specify a name. Usage: open [link-name]</span>`;
    }
    
    const linkName = args[1];
    if (links.hasOwnProperty(linkName)) {
      window.open(links[linkName], "_blank");
      return `Opening <span class="text-green">${linkName}</span> in a new tab.`;
      } else {
        return `<span class="text-red">Invalid link name: <span class="text-gray">${linkName}</span></span>`;
      }},
        
  
  socials() {
    return Object.keys(links).map(linkName => `${linkName} <br>`).join('') + `<br><span class="text-gray">Type "open <span class="text-pink">[link-name]</span>" to open a link in a new tab</span>`;
  },
};

output.innerHTML += "Type <span class='text-green'>list</span> for a list of commands. <br /> <br />";
input.focus();

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const command = input.value.trim().toLowerCase();
    commandHistory.push(command);
    input.value = "";
    const [commandName] = command.split(" ");
    output.innerHTML += `${prompt.innerHTML}${command}<br /> <br />`;
    if (commandFunctions[commandName]) {
      output.innerHTML += commandFunctions[commandName](command) + "<br />";
    } else if (commandName === "clear") {
      output.innerHTML = "Type <span class='text-green'>list</span> for a list of commands. <br /><br />";
    } else {
      output.innerHTML += `<span class="text-red">Invalid command: ${commandName}</span>. <br> Type <span class="text-green">list</span> for a list of commands.`;
    }
    if (commandName !== "clear") {
      output.innerHTML += "<br><br>";
    }
    scrollToBottom();
  }
  resizeInput();
});

input.addEventListener("blur", () => input.focus());

function resizeInput() {
  input.style.width = input.value.length + 1 + "ch";
}

function scrollToBottom() {
  const shell = document.getElementById("shell");
  shell.scrollTop = shell.scrollHeight;
  window.scroll(0, shell.scrollHeight);
}

function createTable(data) {
  const maxCellLength = Math.max(...data.flat().map(cell => cell.length));
  const border = (char, length) => `${char}${"─".repeat(length + 2)}`;
  const row = (cells) => cells.map(cell => ` │ ${cell.padEnd(maxCellLength)} `).join('') + '│';

  const topBorder = `┌${data[0].map(() => border('─', maxCellLength)).join('┬')}┐`;
  const bottomBorder = `└${data[0].map(() => border('─', maxCellLength)).join('┴')}┘`;
  const middleBorder = `├${data[0].map(() => border('─', maxCellLength)).join('┼')}┤`;
  const rows = data.map(row).join(`\n${middleBorder}\n`);

  return { maxCellLength, table: `${topBorder}\n${rows}\n${bottomBorder}` };
}