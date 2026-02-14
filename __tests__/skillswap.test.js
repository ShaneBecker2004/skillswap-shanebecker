const { filterSkillsByCategory } = require('../skillswap-functions');

describe('filterSkillsByCategory', () => {

  const skills = [
    { title: 'Python Tutoring', category: 'Programming', price: 20 },
    { title: 'Guitar Lessons', category: 'Music', price: 15 },
    { title: 'Resume Review', category: 'Career', price: 0 },
    { title: 'Web Development', category: 'Programming', price: 25 }
  ];

  test('filters skills by category', () => {
    const result = filterSkillsByCategory(skills, 'Programming');

    expect(result).toEqual([
      { title: 'Python Tutoring', category: 'Programming', price: 20 },
      { title: 'Web Development', category: 'Programming', price: 25 }
    ]);
  });

  test('returns all skills when category is "All"', () => {
    const result = filterSkillsByCategory(skills, 'All');

    expect(result).toEqual(skills);
  });

  test('returns empty array when no matches found', () => {
    const result = filterSkillsByCategory(skills, 'Cooking');

    expect(result).toEqual([]);
  });

});

const { 
  filterSkillsByCategory,
  calculateTotalCost 
} = require('../skillswap-functions');

describe('calculateTotalCost', () => {

  test('returns correct total for whole number hours', () => {
    expect(calculateTotalCost(20, 2)).toBe(40);
  });

  test('returns 0 for free sessions', () => {
    expect(calculateTotalCost(0, 3)).toBe(0);
  });

  test('returns correct total for decimal hours', () => {
    expect(calculateTotalCost(25, 1.5)).toBe(37.5);
  });

  test('returns 0 when hours are 0', () => {
    expect(calculateTotalCost(20, 0)).toBe(0);
  });

});
