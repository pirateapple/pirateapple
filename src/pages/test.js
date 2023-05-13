import React from "react";
// import useSiteMetadata from "../hooks/SiteMetadata"
// import { StaticImage } from "gatsby-plugin-image"
// import {Link} from "gatsby"
import styled from "styled-components"
import Layout from "../components/siteLayout"
import { Helmet } from "react-helmet"
// import Map from "../components/contact-map"
import ChatGPT from "../components/chatgpt"

const CustomBox = styled.div`


`

function Test() {

  
  


  return (

    <CustomBox>
<Layout>
<Helmet>
        <body id="body" className="test" />
      </Helmet>
      test
<div className="scroll-container" style={{display:'grid', justifyContent:'center', maxWidth:'80vw', height:'60vh', margin:'140px auto 0 auto'}}>
  test
<ChatGPT />

</div>





</Layout>



      </CustomBox>
  );
}

export default Test;


