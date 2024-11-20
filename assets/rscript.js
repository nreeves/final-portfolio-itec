function generateSkillsItem(skillName, numCheckboxes, checkedIndexes) {
    // Create div element with class 'skills__item'
    const skillsItemDiv = document.createElement('div');
    skillsItemDiv.classList.add('skills__item');
  
    const leftDiv = document.createElement('div');
    leftDiv.classList.add('left', 'name');
    leftDiv.textContent = skillName;
    skillsItemDiv.appendChild(leftDiv);
  
    const rightDiv = document.createElement('div');
    rightDiv.classList.add('right');
  
    for (let i = 1; i <= numCheckboxes; i++) {
      // Create input element with type 'checkbox'
      const checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.id = `ck${i}`;
 
      if (checkedIndexes.includes(i)) {
        checkbox.checked = true;
      }
  
      const label = document.createElement('label');
      label.setAttribute('for', `ck${i}`);
  
      rightDiv.appendChild(checkbox);
      rightDiv.appendChild(label);
    }
  
    skillsItemDiv.appendChild(rightDiv);
  
    return skillsItemDiv;
  }
  
  const skillsContainer = document.querySelector('.skills');
  

  const javascriptSkills = generateSkillsItem('Javascript', 5, [1, 2]);

  const cssSkills = generateSkillsItem('CSS', 5, [1, 2]);

  skillsContainer.appendChild(javascriptSkills);
  skillsContainer.appendChild(cssSkills);
  