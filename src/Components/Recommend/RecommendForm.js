import React, { useState, useRef, useEffect } from "react";
import {
  flav,
  races,
  positive,
  negative,
  medical,
  Inputtextarea,
  StyledReviewDiv,
  Container,
} from "./helpers";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Modal, ModalBody } from "reactstrap";
import { v4 as uuidv4 } from "uuid";
import { Send } from "../../Actions";
import Loader from "react-loader-spinner";

const RecommendForm = () => {
  const [choices, setChoices] = useState({
    race: "",
    positive_effects: "",
    negative_effects_avoid: "",
    ailments: "",
    flavors: "",
    additional_desired_effects: "",
  });
  const mainRef = useRef(null);

  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  useEffect(() => {}, [mainRef]);

  const toggle = (e) => {
    if (!choices.ailments) {
      mainRef.current.focus();

      return alert(
        "Please fill in Medical Symptoms you are trying to alleviate"
      );
    } else {
      return (
        setChoices({
          ...choices,
          race: Array.isArray(choices.race)
            ? choices.race.join(",")
            : choices.race,
          positive_effects: Array.isArray(choices.positive_effects)
            ? choices.positive_effects.join(",")
            : choices.positive_effects,
          negative_effects_avoid: Array.isArray(choices.negative_effects_avoid)
            ? choices.negative_effects_avoid.join(",")
            : choices.negative_effects_avoid,
          ailments: Array.isArray(choices.ailments)
            ? choices.ailments.join(",")
            : choices.ailments,
          flavors: Array.isArray(choices.flavors)
            ? choices.flavors.join(",")
            : choices.flavors,
        }) & dispatch({ type: "MODAL" })
      );
    }
  };

  const { push } = useHistory();

  const loading = useSelector((state) => state.isloading);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(choices);

    dispatch(
      Send(`/usersdata/${localStorage.getItem("userID")}/user`, choices)
    );
    dispatch({ type: "MODAL" });

    if (!loading) {
      push(`/waiting`);
    }
  };

  const handlechange = (e) => {
    e.preventDefault();
    setChoices({
      ...choices,
      additional_desired_effects: e.target.value,
    });
  };

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {loading ? (
          <Loader
            type="BallTriangle"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={5000} //3 secs
          />
        ) : (
          <>
            <div
              style={{
                backgroundColor: "#F5F5F5",
                padding: "50px",
                marginTop: 0,
              }}
            >
              Welcome to our recommendations page – use these parameters to
              generate a list of strain recommendations.
            </div>
            <div>
              <div>
                <h3
                  ref={mainRef}
                  tabIndex="-1"
                  id="med"
                  style={{ marginTop: "1%" }}
                >
                  Your Medical Symptoms
                </h3>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  flexWrap: "wrap",
                  marginTop: ".2%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {medical.map((ele) => (
                  <fieldset>
                    <label className="cbcontainer">
                      {ele} &nbsp;
                      <input
                        checked={choices.ailments.includes(ele) ? true : false}
                        type="checkbox"
                        id={uuidv4()}
                        name="ailments"
                        required
                        value={ele}
                        onChange={(e) =>
                          choices.ailments.includes(ele)
                            ? setChoices({
                                ...choices,
                                ailments: choices.ailments.filter(
                                  (e) => e !== ele
                                ),
                              })
                            : setChoices({
                                ...choices,
                                [e.target.name]: [
                                  ...choices.ailments,
                                  e.target.value,
                                ],
                              })
                        }
                      />
                      <span className="checkmark"></span>
                    </label>
                  </fieldset>
                ))}
              </div>
            </div>
            <div>
              <div>
                <h3 style={{ marginTop: "1%" }}>Preferred Type of Strain</h3>
              </div>
              {console.log(choices, "CHOICES")}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginTop: ".2%",
                }}
              >
                {races.map((ele) => (
                  <fieldset className="race">
                    <label className="cbcontainer">
                      {ele} &nbsp;
                      <input
                        checked={choices.race.includes(ele) ? true : false}
                        type="checkbox"
                        id={uuidv4()}
                        name="race"
                        value={ele}
                        onChange={(e) =>
                          choices.race.includes(ele)
                            ? setChoices({
                                ...choices,
                                race: choices.race.filter((e) => e !== ele),
                              })
                            : setChoices({
                                ...choices,
                                [e.target.name]: [
                                  ...choices.race,
                                  e.target.value,
                                ],
                              })
                        }
                      />
                      <span className="checkmark"></span>
                    </label>
                  </fieldset>
                ))}
              </div>
            </div>
            <div>
              <div>
                <h3 style={{ marginTop: "1%" }}>Flavors</h3>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  flexWrap: "wrap",
                  marginTop: ".2%",
                  justifyContent: "space-between",
                }}
              >
                {flav.map((flavs) => (
                  <fieldset className="flavors">
                    <label className="cbcontainer">
                      {flavs}
                      <input
                        checked={choices.flavors.includes(flavs) ? true : false}
                        type="checkbox"
                        id={uuidv4()}
                        name="flavors"
                        value={flavs}
                        // style={{ marginLeft: '5%' }}
                        onChange={(e) =>
                          choices.flavors.includes(flavs)
                            ? setChoices({
                                ...choices,
                                flavors: choices.flavors.filter(
                                  (e) => e !== flavs
                                ),
                              })
                            : setChoices({
                                ...choices,
                                [e.target.name]: [
                                  ...choices.flavors,
                                  e.target.value,
                                ],
                              })
                        }
                      />
                      <span className="checkmark"></span>
                    </label>
                  </fieldset>
                ))}
              </div>
            </div>
            <div>
              <div>
                <h3 style={{ marginTop: "1%" }}>Desired Effects</h3>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "80%",
                  flexWrap: "wrap",
                  marginTop: ".2%",
                }}
              >
                {positive.map((ele) => (
                  <fieldset>
                    <label className="cbcontainer">
                      {ele} &nbsp;
                      <input
                        checked={
                          choices.positive_effects.includes(ele) ? true : false
                        }
                        type="checkbox"
                        id={uuidv4()}
                        name="positive_effects"
                        value={ele}
                        onChange={(e) =>
                          choices.positive_effects.includes(ele)
                            ? setChoices({
                                ...choices,
                                positive_effects: choices.positive_effects.filter(
                                  (e) => e !== ele
                                ),
                              })
                            : setChoices({
                                ...choices,
                                [e.target.name]: [
                                  ...choices.positive_effects,
                                  e.target.value,
                                ],
                              })
                        }
                      />
                      <span className="checkmark"></span>
                    </label>
                  </fieldset>
                ))}
              </div>
            </div>
            <div>
              <div>
                <h3 style={{ marginTop: "1%" }}>Effects to Avoid</h3>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "80%",
                  flexWrap: "wrap",
                  marginTop: ".2%",
                }}
              >
                {negative.map((ele) => (
                  <fieldset>
                    <label className="cbcontainer">
                      {ele} &nbsp;
                      <input
                        checked={
                          choices.negative_effects_avoid.includes(ele)
                            ? true
                            : false
                        }
                        type="checkbox"
                        id={uuidv4()}
                        name="negative_effects_avoid"
                        value={ele}
                        onChange={(e) =>
                          choices.negative_effects_avoid.includes(ele)
                            ? setChoices({
                                ...choices,
                                negative_effects_avoid: choices.negative_effects_avoid.filter(
                                  (e) => e !== ele
                                ),
                              })
                            : setChoices({
                                ...choices,
                                [e.target.name]: [
                                  ...choices.negative_effects_avoid,
                                  e.target.value,
                                ],
                              })
                        }
                      />
                      <span className="checkmark"></span>
                    </label>
                  </fieldset>
                ))}
              </div>
            </div>
            <Button
              style={{ marginTop: "1%" }}
              color="info"
              onClick={toggle}
              size="lg"
            >
              Lock in Selections
            </Button>
          </>
        )}

        <Modal
          isOpen={modal}
          toggle={toggle}
          backdrop={"static"}
          // style={{ color: 'red' }}
          size="lg"
          centered
        >
          <ModalBody className={"modalstuff"}>
            <div className="review">
              <div>
                <h3 style={{ marginTop: "2%" }}>
                  Any other useful information to help us help you!{" "}
                </h3>
              </div>
              <StyledReviewDiv>
                <Inputtextarea
                  placeholder="Tell us how we can help"
                  type="text"
                  name="additional_desired_effects"
                  cols="50"
                  rows="10"
                  maxLength="200"
                  onChange={handlechange}
                />
              </StyledReviewDiv>
              <Button
                color="success"
                onClick={onSubmit}
                style={{ width: "90%", marginLeft: "4%" }}
              >
                SUBMIT
              </Button>
            </div>
          </ModalBody>
        </Modal>
      </form>
    </Container>
  );
};

export default RecommendForm;
