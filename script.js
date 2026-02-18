const cards = document.querySelectorAll(".card");


  cards.forEach(card => {
    card.addEventListener("click", () => {
      const details = card.querySelector(".details");
      details.classList.toggle("hidden");
    });
  });


async function loadSkills() {
  try {
    const skillArray = await apiService.fetchSkills();
    window.skills = skillsArray;
    renderSkills(skillArray);
  } catch (error) {
    console.error('Failed to load skills:', error);
  }
}

function renderSkills(skillsArray) {
  const container = document.getElementById('skills-container');
  container.innerHTML = '';


  skillsArray.forEach(skill => {
    const card = document.createElement('div');
    card.classList.add('skill-card');


    card.innerHTML = `
      <h3>${skill.title}</h3>
      <p>Category: ${skill.category}</p>
      <p>Price: $${skill.price}</p>
    `;

    card.addEventListener('click', () => {
      const details = card.querySelector('.details');
      details.classList.toggle('hidden');
    });


    container.appendChild(card);
  });
}


loadSkills();

const addSkillForm = document.getElementById('add-skill-form');

addSkillForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // prevent page reload

  // Get values from form inputs
  const title = document.getElementById('skill-title').value.trim();
  const category = document.getElementById('skill-category').value.trim();
  const price = parseFloat(document.getElementById('skill-price').value) || 0;
  const description = document.getElementById('skill-description').value.trim();

  // Create a new skill object
  const newSkill = { title, category, price, description };

  try {
    // Call API to save the skill
    await apiService.createSkill(newSkill);

    // Reload skills from API to include the new skill
    await loadSkills();

    // Clear the form
    addSkillForm.reset();
  } catch (error) {
    console.error('Error adding skill:', error);
    alert('Failed to add skill. Check console for details.');
  }
});


document.querySelectorAll('.filter-buttons button').forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.category;


    const filteredSkills = filterSkillsByCategory(window.skills, category);
    renderSkills(filteredSkills);
  });
});

document.getElementById('calculate-btn').addEventListener('click', () => {
  const rate = parseFloat(document.getElementById('rate-input').value);
  const hours = parseFloat(document.getElementById('hours-input').value);

  const total = calculateTotalCost(rate || 0, hours || 0);

  document.getElementById('total-result').textContent = `Total: $${total}`;
});

document.getElementById('match-btn').addEventListener('click', () => {

  const category = document.getElementById('match-category').value;
  const maxPrice = parseFloat(document.getElementById('match-price').value) || 0;

  const userNeeds = {
    category,
    maxPrice
  };

  const matchedSkills = matchSkillsToUser(userNeeds, window.skills);

  const resultsContainer = document.getElementById('match-results');
  resultsContainer.innerHTML = '';

  if (matchedSkills.length === 0) {
    resultsContainer.innerHTML = '<p>No matches found.</p>';
    return;
  }

  matchedSkills.forEach(skill => {
    const card = document.createElement('div');
    card.classList.add('skill-card');

    card.innerHTML = `
      <h3>${skill.title}</h3>
      <p>Category: ${skill.category}</p>
      <p>Price: $${skill.price}</p>
    `;

    resultsContainer.appendChild(card);
  });

});
