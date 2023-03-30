import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

const RssTemplate = () => (
  <StaticQuery
    query={graphql`
    query RssQuery {
      site {
        siteMetadata {
          title
          description
          siteUrl
          site_url: siteUrl
        }
      }
      allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
        edges {
          node {
            id
            excerpt(pruneLength: 140)
            html
            frontmatter {
              title
              date(formatString: "YYYY-MM-DD")
              featuredImage {
                publicURL
              }
            }
            fields {
              slug
            }
          }
        }
      }
    }
    `}
    render={({ site, allMarkdownRemark }) => (
      <rss>
        <channel>
          <title>{site.siteMetadata.title}</title>
          <link>{site.siteMetadata.siteUrl}</link>
          <description>{site.siteMetadata.description}</description>
          <atom:link href={`${site.siteMetadata.siteUrl}/rss.xml`} rel="self" type="application/rss+xml" />
          {allMarkdownRemark.edges.map(({ node }) => (
            <item key={node.id}>
              <title>{node.frontmatter.title}</title>
              <link>{site.siteMetadata.siteUrl + node.fields.slug}</link>
              <guid>{site.siteMetadata.siteUrl + node.fields.slug}</guid>
              <pubDate>{new Date(node.frontmatter.date).toUTCString()}</pubDate>
              <description>{node.excerpt}</description>
              <enclosure url={node.frontmatter.featuredImage.publicURL} type="image/jpeg" />
              <content:encoded>
{`<![CDATA[
  <div>
    <h1>${node.frontmatter.title}</h1>
    <div>${node.html}</div>
  </div>
]]>`}
</content:encoded>
            </item>
          ))}
        </channel>
      </rss>
    )}
  />
);

export default RssTemplate;
