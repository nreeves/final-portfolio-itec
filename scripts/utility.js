
// keybind listener for standard terminal controls, example pressing arrow keys to revert previous
//commands

function autoCompleteCommand(command) {
    const commandName = command.split(" ")[0];
    const commandArgs = Object.keys(links).find((link) => link.startsWith(command.split(" ")[1]));
    const commandList = commands.map((command) => command.name);
    const filteredCommands = commandList.filter((command) => command.startsWith(commandName));
    let autoCompleteCommand = command;
    if (filteredCommands.length === 1) {
      autoCompleteCommand = filteredCommands[0].split(" ")[0];
    }
    if (filteredCommands?.length === 1 && commandArgs) {
        autoCompleteCommand = autoCompleteCommand +" "+commandArgs;
    }
    return autoCompleteCommand;
  }