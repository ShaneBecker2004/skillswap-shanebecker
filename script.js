const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const details = card.querySelector(".details");
      details.classList.toggle("hidden");
    });
  });


const skills = [
  { title: 'Python Tutoring', category: 'Programming', price: 20 },
  { title: 'Guitar Lessons', category: 'Music', price: 15 },
  { title: 'Resume Review', category: 'Career', price: 0 },
  { title: 'Web Development', category: 'Programming', price: 25 }
];


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

    container.appendChild(card);
  });
}

renderSkills(skills);

document.querySelectorAll('.filter-buttons button').forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.category;

    const filteredSkills = filterSkillsByCategory(skills, category);
    renderSkills(filteredSkills);
  });
});
