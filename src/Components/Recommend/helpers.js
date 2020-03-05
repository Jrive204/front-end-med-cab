import styled from 'styled-components';

export const flav = [
  'Earthy',
  'Chemical',
  'Pine',
  'Spicy/Herbal',
  'Pungent',
  'Pepper',
  'Flowery',
  'Citrus',
  'Tropical',
  'Orange',
  'Sweet',
  'Skunk',
  'Woody',
  'Grape',
  'Strawberry',
  'Minty',
  'Mango',
  'Blueberry',
  'Cheese',
  'Diesel',
  'Grapefruit',
  'Nutty',
  'Lemon',
  'Berry',
  'Ammonia',
  'Apple',
  'Rose',
  'Sage',
  'Butter',
  'Honey',
  'Chestnut',
  'Tea',
  'Lavender',
  'Lime',
  'Tobacco',
  'Mint',
  'Tree Fruit',
  'Tree',
  'Fruit',
  'Pear',
  'Vanilla',
  'Apricot',
  'Peach',
  'Blue',
  'Blue Cheese',
  'Menthol',
  'Coffee',
  'Tar',
  'Pineapple',
  'Plum',
  'Violet'
];

export const positive = [
  'Relaxed',
  'Hungry',
  'Happy',
  'Sleepy',
  'Creative',
  'Focused',
  'Euphoric',
  'Energetic',
  'Talkative',
  'Aroused',
  'Tingly',
  'Uplifted',
  'Giggly'
];

export const negative = [
  'Dizzy',
  'Dry Mouth',
  'Paranoid',
  'Dry Eyes',
  'Anxious'
];

export const medical = [
  'Depression',
  'Insomnia',
  'Pain',
  'Stress',
  'Lack of Appetite',
  'Nausea',
  'Headache',
  'Cramps',
  'Fatigue',
  'Headaches',
  'Muscle Spasms',
  'Eye Pressure',
  'Inflammation',
  'Spasticity',
  'Seizures'
];

export const races = ['hybrid', 'sativa', 'indica'];

export const Inputtextarea = styled.textarea`
  display: flex;
  line-height: 1.44em;
  border: 0;
  outline: none;
  padding: 0;
  resize: none;
  width: 100%;
  height: 15vh;
  font-size: 1.8rem;

  ::placeholder {
    font-size: 1rem;
    color: gray;
  }
`;

export const StyledReviewDiv = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: text;
  padding: 18px;
  max-width: 630px;
  margin-bottom: 1.5%;
`;
