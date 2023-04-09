import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/siteLayout"
import { Helmet } from "react-helmet"
const CategoryIndex = ({ data }) => {
  const [selectedTag, setSelectedTag] = useState(''); // State to keep track of selected tag

  const handleTagChange = (event) => { // Handler for select change
    setSelectedTag(event.target.value);
  }

  const tags = data.allMarkdownRemark.group.filter(
    group => group.fieldValue !== null && group.fieldValue !== ""
  ).map(group => group.fieldValue);

  if (!tags || tags.length === 0) {
    return <div>No tags found.</div>;
  }

  return (
    <Layout>
        <Helmet>
        <body className="tagpage utilitypage scroll" />
      </Helmet>
      <div className="spacer" style={{ height: '70px', border: '0px solid yellow' }}></div>
      <div style={{textAlign:'center', paddingTop:'1rem'}}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
          <select className="cattags" id="tag-select" value={selectedTag} onChange={handleTagChange}>
            <option value="">All tags</option>
            {tags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>

        <div className="contentpanel grid-container" style={{ marginTop: "5vh" }}>
          <div className="sliderSpacer" style={{ height: "", paddingTop: "", display: "" }}></div>
   
          {data.allMarkdownRemark.edges &&
            data.allMarkdownRemark.edges
              .filter(({ node }) => !selectedTag || (node.frontmatter.tags && node.frontmatter.tags.includes(selectedTag)))
              .map(({ node }) => {
                const { featuredImage } = node.frontmatter;

                return (
                  <div key={node.fields.slug} className="post-card1" style={{ justifyContent: "center", alignItems: "center" }}>
                    <Link to={node.fields.slug}>
                      {featuredImage ? (
                        <GatsbyImage
                          image={featuredImage.childImageSharp.gatsbyImageData}
                          alt={node.frontmatter.title + " - Featured image"}
                          className="featured-image12 layer12 iiz__img"
                          placeholder="blurred"
                        />
                      ) : (
                        <StaticImage
                          className="featured-image1"
                          src="../../static/assets/default-og-image.webp"
                          alt="Default Image"
                          style={{ position: 'relative', zIndex: '' }}
                        />
                      )}
                      {node.frontmatter.title}
                    </Link>
                  </div>
                )
              })
          }
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            tags
            featuredImage {
              childImageSharp {
                gatsbyImageData(
                  width: 800
                  quality: 80
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
          }
        }
      }
      group(field: frontmatter___tags) {
        fieldValue
      }
    }
  }
`;

export default CategoryIndex;
