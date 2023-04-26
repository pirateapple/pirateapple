import React, { useState, useRef, useEffect } from "react";
import AuthenticatedTimeline from "../components/AuthenticatedTimeline";
import { useStaticQuery, graphql } from "gatsby";
import Layout from "../components/siteLayout"; // Import the Layout component

const TimeLine = () => {
  const data = useStaticQuery(graphql`
    query {
      markdownRemark(fileAbsolutePath: { regex: "/index.md$/" }) {
        frontmatter {
          pagePW
        }
      }
    }
  `);

  const pagePassword = data.markdownRemark.frontmatter.pagePW || "";
  const [password, setPassword] = useState(Array(3).fill(""));
  const [verified, setVerified] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, password.length);
  }, [password]);

  useEffect(() => {
    if (password.join("") === pagePassword) {
      setVerified(true);
    }
  }, [password, pagePassword]);

  const handleInputChange = (event, index) => {
    const newValue = event.target.value;

    setPassword((prev) => {
      const newPW = [...prev];
      newPW[index] = newValue;
      return newPW;
    });

    if (newValue && index < inputRefs.current.length - 1) {
      setTimeout(() => {
        inputRefs.current[index + 1].focus();
      }, 0);
    }
  };

  if (verified) {
    return <AuthenticatedTimeline />;
  }

  if (pagePassword) {
    return (
      <Layout>
        <div>
          <p>You are not logged in.</p>
          <form>
            {password.map((_, index) => (
              <input
  key={index}
  ref={(el) => (inputRefs.current[index] = el)}
  type="text"
  maxLength="1"
  onChange={(event) => handleInputChange(event, index)}
  style={{ fontSize: "3rem", width: "2rem", margin: "1rem" }}
  autoFocus={index === 0}
/>
            ))}
          </form>
        </div>
      </Layout>
    );
  }

  return <AuthenticatedTimeline />;
};

export default TimeLine;
