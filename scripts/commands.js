// commands.js
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
  