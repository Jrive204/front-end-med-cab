import styled from "styled-components";

export const flav = [
  "Earthy",
  "Chemical",
  "Pine",
  "Spicy/Herbal",
  "Pungent",
  "Pepper",
  "Flowery",
  "Citrus",
  "Tropical",
  "Orange",
  "Sweet",
  "Skunk",
  "Woody",
  "Grape",
  "Strawberry",
  "Minty",
  "Mango",
  "Blueberry",
  "Cheese",
  "Diesel",
  "Grapefruit",
  "Nutty",
  "Lemon",
  "Berry",
  "Ammonia",
  "Apple",
  "Rose",
  "Sage",
  "Butter",
  "Honey",
  "Chestnut",
  "Tea",
  "Lavender",
  "Lime",
  "Tobacco",
  "Mint",
  "Tree Fruit",
  "Tree",
  "Fruit",
  "Pear",
  "Vanilla",
  "Apricot",
  "Peach",
  "Blue",
  "Blue Cheese",
  "Menthol",
  "Coffee",
  "Tar",
  "Pineapple",
  "Plum",
  "Violet",
];

export const positive = [
  "Relaxed",
  "Hungry",
  "Happy",
  "Sleepy",
  "Creative",
  "Focused",
  "Euphoric",
  "Energetic",
  "Talkative",
  "Aroused",
  "Tingly",
  "Uplifted",
  "Giggly",
];

export const negative = [
  "Dizzy",
  "Dry Mouth",
  "Paranoid",
  "Dry Eyes",
  "Anxious",
];

export const medical = [
  "Depression",
  "Insomnia",
  "Pain",
  "Stress",
  "Lack of Appetite",
  "Nausea",
  "Headache",
  "Cramps",
  "Fatigue",
  "Headaches",
  "Muscle Spasms",
  "Eye Pressure",
  "Inflammation",
  "Spasticity",
  "Seizures",
];

export const races = ["hybrid", "sativa", "indica"];

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

export const Container = styled.div`
background-color: #98fb98;



  .cbcontainer {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }
  }
  .race {
    width: 20%;
    margin: 0 auto;
    @media (max-width: 800px) {
      width: 80%;
    }
  }

  .checkmark {
    position: absolute;
    top: 4px;
    left: 6px;
    height: 25px;
    width: 25px;
    background-color: #eee;
  }

  .cbcontainer:hover input ~ .checkmark {
    background-color: #ccc;
  }

  .cbcontainer input:checked ~ .checkmark {
    background-color: #23a2b8;
  }

  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
  }
  .cbcontainer input:checked ~ .checkmark:after {
    /* display: block; */
  }
  .cbcontainer .checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  form {
    margin: 2%;
    input[type='submit'] {
      font-size: 100%;
      padding: 8px;
      background-color: #3cb371;
      color: white;
      border-radius: 5px;
      &:hover {
        cursor: pointer;
        border: 1px solid #98fb98;
        color: #98fb98;
      }
      &:active {
        background-color: #2e8b57;
        outline: none;
      }
      &:focus {
        outline: none;
      }
    }
  }
  .flavors {
    @media (max-width: 800px) {
      width: 45%;
      display: flex;
      align-items: center;
      margin: 2%;
    }
  }

  form > div {
    margin-top: 20px;
    background-color: white;
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 10px;
    width: 80%;
    border: 1px solid #f5f5f5;
    @media (max-width: 800px) {
      width: 100%;
    }
    > div:first-child {
      width: 100%;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      background-color: #3cb371;
      display: flex;
      justify-content: center;
      h3 {
        text-decoration: none;
        color: white;
        font-size: 180%;
        @media (max-width: 800px) {
          text-align: center;
        }
      }
    }
    > div:last-child {
      padding: 10px;
    }
    fieldset {
      width: 20%;
      input {
        background-color: #f5f5f5;
      }
      @media (max-width: 800px) {
        width: 100%;
      }
    }
  }
}
`;
