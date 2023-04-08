import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/siteLayout"
const CategoryIndex = ({ data }) => {
  const categories = data.allMarkdownRemark.group.map(group => group.fieldValue);

  return (
    <Layout>
      <div className="spacer" style={{ height: '70px', border: '0px solid yellow' }}></div>
      <div style={{textAlign:'center', paddingTop:'1rem'}}>
      <h1>Categories</h1>
<br /><br />

      {/* <div style={{maxWidth:'70vw', margin:'0 auto'}}><StaticImage className="featured-image1 layer1" src="../../static/assets/edition1-promo.webp" alt="Default Image" style={{position:'relative', zIndex:'',}} /></div> */}



      <ul className="contentpanel horizontal-scroll panels" style={{display:'flex', justifyItems:'center', justifyContent:'center', gap:'3vw', textTransform:'capitalize', margin:'3vh'}}>

<div className="sliderSpacer" style={{height:'', paddingTop:'', display:''}}></div>

   
        {categories.map(category => (
          <li key={category} style={{border:'1px solid red', display:'block', width:'100%', height:'50vh'}}>
            <Link to={`/category/${category}`}>{category}</Link>
          </li>
        ))}
      </ul>
  
    </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark {
      group(field: {frontmatter: {category: SELECT}}) {
        fieldValue
      }
    }
  }
`;

export default CategoryIndex;
