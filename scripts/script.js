
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

// Output and Input setup
const output = document.getElementById("output");
const input = document.getElementById("command-input");
const prompt = document.getElementById("prompt");

const technologies = [
    ["JavaScript", "Python", "HTML", "CSS"],
    ["GIT", "Django"]
];

const commandHistory = [];
let commandHistoryIndex = 0;

// Auto-focus input node on page load
document.addEventListener("DOMContentLoaded", () => {
  input.focus();
});

// Handle click events to focus on the input node
document.addEventListener("click", (event) => {
  if (!event.target.closest("#command-input")) {
      input.focus();
  }
});

// Updated commandFunctions (no changes)
const commandFunctions = {
    help: function () {
        let helpText = "commands: <br> <br>";
        commands.forEach((command) => {
          helpText += `<span class="text-green">${command.name}</span> - ${command.description} <br>`;
        });
        return helpText;
    },
    about: function () {
        const aboutText = FileSystem.readFile("commands/about.html");
        return aboutText;
    },
    projects: function () {
        const project = FileSystem.readFile("commands/project.html");
        return project;
    },
    contact: function () {
        const contact = FileSystem.readFile("commands/contact.html");
        return contact;
    },
    skills: function () {
        const { table, maxCellLength } = createTable(technologies);
        const containerWidth = maxCellLength * technologies[0].length * 10 + 20;
        const tableContainer = `<div style="width:${containerWidth}px" class="text-green"> <pre>${table}</pre> </div>`;
        return tableContainer;
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
        let list = "";
        for (const linkName in links) {
            list += `${linkName} <br>`;
        }
        list += `<br><span class="text-gray">Type "open <span class="text-pink">[link-name]</span>" to open a link in a new tab</span>`;
        return list;
    },
    surprise: function () {
        const asciiContent = getRandomASCII();
        return `<pre class="ascii-art">${asciiContent}</pre>`;
    }
};

output.innerHTML += "Type <span class='text-green'>help</span> for a list of commands. <br /> <br />";
input.focus();
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    commandHistory.push(input.value);
    input.value = input.value.toLowerCase();
    const command = input.value.trim().split(" ")[0];
    const commandArgs = input.value.trim().split(" ")[1];
    input.value = "";
    output.innerHTML += `${prompt.innerHTML}${command} ${commandArgs || ''}<br /> <br />`;
    if (commandFunctions[command]) {
      output.innerHTML += commandFunctions[command](`${command} ${commandArgs}`) + "<br />";
      if (postRenderFunctions[command]) {
        postRenderFunctions[command]();
      }
    } else if (command === "clear") {
      output.innerHTML = "Type <span class='text-green'>help</span> for a list of commands. <br /><br />";
    } else {
      output.innerHTML += `<span class="text-red">Invalid command: ${command}</span>. <br> Type <span class="text-green">help</span> for a list of commands.`;
    }
    if (command !== "clear") {
      output.innerHTML += "<br><br>";
    }
    scrollToBottom();
  }
// michael helped
  resizeInput();
});

input.addEventListener(function (event) {
  if (!document.activeElement.classList.contains("focusable")) { 
      input.focus();
  }
});

// input resizing
function resizeInput() {
    input.style.width = input.value.length + 1 + "ch";
}

// window scrolling function to keep the terminal scrolling
function scrollToBottom() {
  const shell = document.getElementById("shell");
    shell.scrollTop = output.scrollHeight;
    window.scroll(0, output.scrollHeight);
}

// Create table (for skills list)
function createTable(data) {
    let maxCellLength = 0;
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            if (data[i][j].length > maxCellLength) {
                maxCellLength = data[i][j].length;
            }
        }
    }

    let topBorder = "┌" + "─".repeat(maxCellLength + 2) + "┬" + "─".repeat(maxCellLength + 2) + "┬" + "─".repeat(maxCellLength + 2) + "┬" + "─".repeat(maxCellLength + 2) + "┐";
    let dataRows = "";
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            let cell = data[i][j];
            let padding = " ".repeat(Math.floor((maxCellLength - cell.length) / 2));
            let extraPadding = (cell.length % 2 == maxCellLength % 2) ? "" : " ";
            let formattedCell = "│ " + padding + cell + padding + extraPadding + " ";
            dataRows += formattedCell;
        }
        dataRows += "│\n";
        if (i != data.length - 1) {
            dataRows += "├" + "─".repeat(maxCellLength + 2) + "┼" + "─".repeat(maxCellLength + 2) + "┼" + "─".repeat(maxCellLength + 2) + "┼" + "─".repeat(maxCellLength + 2) + "┤\n";
        }
    }
    let bottomBorder = "└" + "─".repeat(maxCellLength + 2) + "┴" + "─".repeat(maxCellLength + 2) + "┴" + "─".repeat(maxCellLength + 2) + "┴" + "─".repeat(maxCellLength + 2) + "┘";

    let table = topBorder + "\n" + dataRows + bottomBorder;

    return { maxCellLength, table };
}

// Get a random ASCII art (optional)
function getRandomASCII() {
  const asciiArts = [
    // Example ASCII arts could be added here
  ];
  const random = Math.floor(Math.random() * asciiArts.length);
  const ascii = asciiArts[random];
  return ascii;
}