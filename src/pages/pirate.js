import React from "react";
import useSiteMetadata from "../hooks/SiteMetadata";
import styled from "styled-components";
import Layout from "../components/siteLayout";
import { Helmet } from "react-helmet";

const CustomBox = styled.div``;

function Pirate() {
  const { showNav } = useSiteMetadata();

  const handleGitHubLogin = () => {
    window.location.href = "/admin/";
  };

  return (
    <CustomBox>
      <Layout>
        <Helmet>
          <body id="body" className="social scroll" />
        </Helmet>

        {showNav ? (
          <div
            className="spacer"
            style={{
              height: "70px",
              border: "0px solid yellow",
            }}
          ></div>
        ) : (
          ""
        )}

        <div
          className="scroll-container1"
          style={{
            display: "flex",
            justifyContent: "start",
            maxWidth: "",
            height: "100vh",
            margin: "0 auto 0 auto",
            position: "relative",
            left: "0",
            right: "0",
            top: "0",
          }}
        >
          <button
            className="providerGitHub btn btnProvider"
            onClick={handleGitHubLogin}
          >
            Login with GitHub
          </button>
        </div>
      </Layout>
    </CustomBox>
  );
}

export default Pirate;
