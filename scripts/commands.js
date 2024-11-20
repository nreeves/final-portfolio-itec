const commands = [
  { 
    command: "help", 
    details: "Displays all available commands." 
  },
  { 
    command: "about", 
    details: "Provides information about me." 
  },
  { 
    command: "skills", 
    details: "Shows a list of languages and tools I use." 
  },
  { 
    command: "contact", 
    details: "Displays contact information." 
  },
  { 
    command: "projects", 
    details: "Lists my projects." 
  },
  { 
    command: "clear", 
    details: "Clears the terminal screen." 
  },
  { 
    command: "links", 
    details: "Shows all available links." 
  },
  { 
    command: "open [link-name]", 
    details: "Opens the specified link in a new tab." 
  }
];

  
  const links = {
    "github": "https://github.com/nreeves",
    "linkedin": "https://www.linkedin.com/in/nreeves",
    "buffaloretreat": "https://github.com/nreeves/buffalo-retreat",
    "medicifoundation": "insert soon"
  };
  
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
  