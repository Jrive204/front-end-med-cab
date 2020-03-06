import React, { useState } from 'react';
import {
  flav,
  races,
  positive,
  negative,
  medical,
  Inputtextarea,
  StyledReviewDiv
} from './helpers';
import { axiosWithAuth } from '../../Utils/axiosWithAuth';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #98fb98;
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
  form > div {
    margin-top: 20px;
    background-color: white;
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 10px;
    width: 80%;
    border: 1px solid #f5f5f5;
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
      }
    }
    > div:last-child {
      padding: 10px;
    }
    fieldset {
      input {
        background-color: #f5f5f5;
      }
    }
  }
`;

const RecommendForm = () => {
  const [choices, setChoices] = useState({
    race: '',
    positive_effects: '',
    negative_effects_avoid: '',
    ailments: '',
    flavors: '',
    additional_desired_effects: ''
  });
  const { push } = useHistory();

  const userID = useSelector(state => state.currentuser);

  const onSubmit = e => {
    e.preventDefault();
    console.log(choices);
    axiosWithAuth()
      .post(
        `https://medcabinet1.herokuapp.com/api/usersdata/${localStorage.getItem(
          'userID'
        )}/user`,
        choices
      )
      .then(res => {
        console.log(res.data);
        push(`/recommendations`);
      })
      .catch(err => console.log(err.message));
  };

  const handlechange = e => {
    e.preventDefault();
    setChoices({
      ...choices,
      race: Array.isArray(choices.race) ? choices.race.join(',') : choices.race,
      positive_effects: Array.isArray(choices.positive_effects)
        ? choices.positive_effects.join(',')
        : choices.positive_effects,
      negative_effects_avoid: Array.isArray(choices.negative_effects_avoid)
        ? choices.negative_effects_avoid.join(',')
        : choices.negative_effects_avoid,
      ailments: Array.isArray(choices.ailments)
        ? choices.ailments.join(',')
        : choices.ailments,
      flavors: Array.isArray(choices.flavors)
        ? choices.flavors.join(',')
        : choices.flavors,
      additional_desired_effects: e.target.value
    });
  };

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
        onSubmit={onSubmit}>
        <div
          style={{ backgroundColor: '#F5F5F5', padding: '50px', marginTop: 0 }}>
          Welcome to our recommendations page – use these parameters to generate
          a list of strain recommendations.
        </div>
        <div>
          <div>
            <h3 style={{ marginTop: '1%' }}>Your Medical Symptoms</h3>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '80%',
              flexWrap: 'wrap',
              marginTop: '.2%'
            }}>
            {medical.map(ele => (
              <fieldset style={{ width: '20%' }}>
                {ele} &nbsp;
                <input
                  checked={choices.ailments.includes(ele) ? true : false}
                  type='checkbox'
                  id='coding'
                  name='ailments'
                  value={ele}
                  onChange={e =>
                    choices.ailments.includes(ele)
                      ? setChoices({
                          ...choices,
                          ailments: choices.ailments.filter(e => e !== ele)
                        })
                      : setChoices({
                          ...choices,
                          [e.target.name]: [...choices.ailments, e.target.value]
                        })
                  }
                />
              </fieldset>
            ))}
          </div>
        </div>
        <div>
          <div>
            <h3 style={{ marginTop: '1%' }}>Preferred Type of Strain</h3>
          </div>
          {console.log(choices, 'CHOICES')}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginTop: '.2%'
            }}>
            {races.map(ele => (
              <fieldset style={{ width: '10%', margin: '0 auto' }}>
                <span style={{ fontSize: '1.2rem' }}>{ele} &nbsp;</span>
                <input
                  checked={choices.race.includes(ele) ? true : false}
                  type='checkbox'
                  id='coding'
                  name='race'
                  value={ele}
                  onChange={e =>
                    choices.race.includes(ele)
                      ? setChoices({
                          ...choices,
                          race: choices.race.filter(e => e !== ele)
                        })
                      : setChoices({
                          ...choices,
                          [e.target.name]: [...choices.race, e.target.value]
                        })
                  }
                />
              </fieldset>
            ))}
          </div>
        </div>
        <div>
          <div>
            <h3 style={{ marginTop: '1%' }}>Flavors</h3>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '80%',
              flexWrap: 'wrap',
              marginTop: '.2%'
            }}>
            {flav.map(flavs => (
              <fieldset style={{ width: '20%' }}>
                {flavs} &nbsp;
                <input
                  checked={choices.flavors.includes(flavs) ? true : false}
                  type='checkbox'
                  id='coding'
                  name='flavors'
                  value={flavs}
                  onChange={e =>
                    choices.flavors.includes(flavs)
                      ? setChoices({
                          ...choices,
                          flavors: choices.flavors.filter(e => e !== flavs)
                        })
                      : setChoices({
                          ...choices,
                          [e.target.name]: [...choices.flavors, e.target.value]
                        })
                  }
                />
              </fieldset>
            ))}
          </div>
        </div>
        <div>
          <div>
            <h3 style={{ marginTop: '1%' }}>Desired Effects</h3>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '80%',
              flexWrap: 'wrap',
              marginTop: '.2%'
            }}>
            {positive.map(ele => (
              <fieldset style={{ width: '20%' }}>
                {ele} &nbsp;
                <input
                  checked={
                    choices.positive_effects.includes(ele) ? true : false
                  }
                  type='checkbox'
                  id='coding'
                  name='positive_effects'
                  value={ele}
                  onChange={e =>
                    choices.positive_effects.includes(ele)
                      ? setChoices({
                          ...choices,
                          positive_effects: choices.positive_effects.filter(
                            e => e !== ele
                          )
                        })
                      : setChoices({
                          ...choices,
                          [e.target.name]: [
                            ...choices.positive_effects,
                            e.target.value
                          ]
                        })
                  }
                />
              </fieldset>
            ))}
          </div>
        </div>
        <div>
          <div>
            <h3 style={{ marginTop: '1%' }}>Effects to Avoid</h3>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '80%',
              flexWrap: 'wrap',
              marginTop: '.2%'
            }}>
            {negative.map(ele => (
              <fieldset style={{ width: '20%' }}>
                {ele} &nbsp;
                <input
                  checked={
                    choices.negative_effects_avoid.includes(ele) ? true : false
                  }
                  type='checkbox'
                  id='coding'
                  name='negative_effects_avoid'
                  value={ele}
                  onChange={e =>
                    choices.negative_effects_avoid.includes(ele)
                      ? setChoices({
                          ...choices,
                          negative_effects_avoid: choices.negative_effects_avoid.filter(
                            e => e !== ele
                          )
                        })
                      : setChoices({
                          ...choices,
                          [e.target.name]: [
                            ...choices.negative_effects_avoid,
                            e.target.value
                          ]
                        })
                  }
                />
              </fieldset>
            ))}
          </div>
        </div>
        <div className='review'>
          <div>
            <h3 style={{ marginTop: '2%' }}>Anything Else? </h3>
          </div>
          <StyledReviewDiv>
            <Inputtextarea
              placeholder='Tell us how we can help'
              type='text'
              name='additional_desired_effects'
              cols='50'
              rows='10'
              maxLength='200'
              required
              // value={user.review}
              onChange={handlechange}
            />
          </StyledReviewDiv>
          <input style={{ marginBottom: '1.5%' }} type='submit' />
        </div>
      </form>
    </Container>
  );
};

export default RecommendForm;
