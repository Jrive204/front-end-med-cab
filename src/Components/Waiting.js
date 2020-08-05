import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Waiting = () => {
  const { push } = useHistory();
  function handleScroll() {
    window.scrollTo(0, 0);
  }

  function toRec() {
    setTimeout(() => {
      push('/recommendations');
    }, 6500);
  }

  useEffect(() => {
    handleScroll();
    toRec();
  }, []);

  var body = document.body,
    html = document.documentElement;

  var height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );

  //   useEffect(() => {}, [mainRef]);
  return (
    <div className='waiting-cont' style={{ overflow: 'hidden' }}>
      <p
        style={{
          textAlign: 'center',
          fontFamily: "  font-family: 'Londrina Solid', cursive",
        }}
      >
        Our Scientist are <span>Working Hard</span> To find you the Perfect
        Strains
        <span>
          <img
            src='https://media.giphy.com/media/gLftX4zfedCNO/giphy.gif'
            alt='logo'
            style={{ width: '75px' }}
          />
        </span>
      </p>
      {/* <div className="waiting"></div> */}
      {/* <div className="waiting-2"></div> */}
    </div>
  );
};

export default Waiting;
