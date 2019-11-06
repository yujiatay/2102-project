export const cuisineTypes = {
  '1': 'Bakery',
  '2': 'Dessert',
  '3': 'Fast Food',
  '4': 'Vegetarian',
  '11': 'American',
  '12': 'Chinese',
  '13': 'French',
  '14': 'Indian',
  '15': 'Indonesia',
  '16': 'Italian',
  '17': 'Japanese',
  '18': 'Korean',
  '19': 'Mexican',
  '20': 'Middle Eastern',
  '21': 'Thai',
  '22': 'Vietnamese',
  '23': 'Western'
};

export const cuisineTypesList = Object.keys(cuisineTypes).map(function(key) {
  return [cuisineTypes[key], key];
});
