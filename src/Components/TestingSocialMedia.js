import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
const queryString = require("query-string");

const TestingSocialMedia = (props) => {
  const location = useLocation();
  const [state, setstate] = useState("");

  async function fetchdata() {
    const parse = queryString.parse(location.search);
    let user = await axios.get(
      `https://post-route-feature.herokuapp.com/api/users/user`,
      {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxOSwiZW1haWwiOiJzb21lVGVzdEBoZWxsby5jb20iLCJva3RhX3VzZXJpZCI6IjAwdTUwaGl3bGY5ZzJVTXJKNHg2IiwiaWF0IjoxNTg1MzM3MjY3LCJleHAiOjE1ODU0MjM2Njd9.KBJSIZhBQWDf1kAYYA8HNlzo4GFZc-ABtRElcR3lNzI",
        },
      }
    );
    let ax = await axios.get(
      `https://post-route-feature.herokuapp.com/api/users`,
      {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxOSwiZW1haWwiOiJzb21lVGVzdEBoZWxsby5jb20iLCJva3RhX3VzZXJpZCI6IjAwdTUwaGl3bGY5ZzJVTXJKNHg2IiwiaWF0IjoxNTg1MzM3MjY3LCJleHAiOjE1ODU0MjM2Njd9.KBJSIZhBQWDf1kAYYA8HNlzo4GFZc-ABtRElcR3lNzI",
        },
      }
    );

    let post = await axios.post(
      `https://post-route-feature.herokuapp.com/api/auth/${user.data.subject}/callback`,
      { parse: parse, location: location },
      {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxOSwiZW1haWwiOiJzb21lVGVzdEBoZWxsby5jb20iLCJva3RhX3VzZXJpZCI6IjAwdTUwaGl3bGY5ZzJVTXJKNHg2IiwiaWF0IjoxNTg1MzM3MjY3LCJleHAiOjE1ODU0MjM2Njd9.KBJSIZhBQWDf1kAYYA8HNlzo4GFZc-ABtRElcR3lNzI",
        },
      }
    );

    setstate(user.data.subject);
    console.log(ax, user.data, post, "AXXX");
    console.log(user.data.subject, "SHOWUPPPPP");
    console.log(location.search);
    console.log(parse, "QUERIYSTRINGSTUFF");
  }

  async function userstuff() {
    let user = await axios.get(
      `https://post-route-feature.herokuapp.com/api/users/user`,
      {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxOSwiZW1haWwiOiJzb21lVGVzdEBoZWxsby5jb20iLCJva3RhX3VzZXJpZCI6IjAwdTUwaGl3bGY5ZzJVTXJKNHg2IiwiaWF0IjoxNTg1MzM3MjY3LCJleHAiOjE1ODU0MjM2Njd9.KBJSIZhBQWDf1kAYYA8HNlzo4GFZc-ABtRElcR3lNzI",
        },
      }
    );
    setstate(user.data.subject);
  }

  useEffect(() => {
    fetchdata();
    userstuff();
  }, []);

  return (
    <div>
      <h1 style={{ color: "blue" }}>
        Testing saocial Media {console.log("HELLOOOO", state)}
      </h1>
      <button
        onClick={async () => {
          console.log("click");

          let axioscall = await axios.get(
            `https://post-route-feature.herokuapp.com/api/auth/${state}/oauth`,
            // `http://localhost:5000/api/auth/8/oauth`,
            {
              headers: {
                Authorization:
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxOSwiZW1haWwiOiJzb21lVGVzdEBoZWxsby5jb20iLCJva3RhX3VzZXJpZCI6IjAwdTUwaGl3bGY5ZzJVTXJKNHg2IiwiaWF0IjoxNTg1MzM3MjY3LCJleHAiOjE1ODU0MjM2Njd9.KBJSIZhBQWDf1kAYYA8HNlzo4GFZc-ABtRElcR3lNzI",
              },
            },
            { crossDomain: true }
          );
        }}
      />
    </div>
  );
};

export default TestingSocialMedia;
