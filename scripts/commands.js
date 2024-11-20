const commands = [
  { 
    command: "list", 
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
    command: "resume", 
    details: "Displays my resume." 
  },
  { 
    command: "socials", 
    details: "Shows all available social links." 
  },
  { 
    command: "db", 
    details: "database projects" 
  },
  { 
    command: "clear", 
    details: "Clears the terminal screen." 
  }
];

  
  const links = {
    "github": "https://github.com/nreeves",
    "linkedin": "https://www.linkedin.com/in/nreeves",
    "twitter": "https://twitter.com/nreeves",
    "instagram": "https://www.instagram.com/nreeves_em",
    "leetcode": "https://leetcode.com/nreeves",
    "v1": "https://nreeves.github.io/nreeves/",

  };
  
  const commandFunctions = {
    list: function () {
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
      return `<pre class="text-green">JavaScript, Python, HTML, CSS, Java, Django, Git</pre>`;
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
    socials: function () {
      return Object.keys(links).join('<br>') + `<br><span class="text-gray">Type "open [link-name]" to open a link in a new tab</span>`;
    },
    clear: function () {
      output.innerHTML = "Type <span class='text-green'>list</span> for a list of commands. <br><br>";
    },
  };
