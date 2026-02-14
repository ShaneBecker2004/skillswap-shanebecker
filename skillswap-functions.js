function filterSkillsByCategory(skills, category) {
    if (category === 'All') {
        return skills;
    }

    return skills.filter(skill => skill.category === category);
}

function calculateTotalCost(hourlyRate, hours) {
    return hourlyRate * hours;
}

if (typeof module !== 'undefined') {    
    module.exports = {
        filterSkillsByCategory,
        calculateTotalCost
};
}
