import { jsx } from "theme-ui";
import React from "react";
import { useState, state } from "react";
import { graphql, navigate } from "gatsby";
import Seo from "../components/seo";
import Layout from "../components/siteLayout";
import useSiteMetadata from "../hooks/SiteMetadata";
import { Helmet } from "react-helmet";
import Footer from "../components/footer";

export const pageQuery = graphql`
  query ContactQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt(pruneLength: 140)
      frontmatter {
        title
        redirect
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;

const Contact = ({ data }) => {
  const { showNav } = useSiteMetadata();
  const { markdownRemark, site } = data;
  const { frontmatter, html } = markdownRemark;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitted, setSubmitted] = useState(false);


  
  const encode = data => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }
  
  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    setIsSubmitting(true);
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    if (frontmatter.redirect === true) {
      setTimeout(() => {
        window.location.href = "/thanks";
      }, 1600);
    } else {
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": form.getAttribute("name"),
          ...data
        })
      })
        .then(() => setSubmitted(true))
        .catch(error => alert(error));
    }
  };
  
  
  
  
  

  return (
    <Layout className="contact-page">
      <Helmet>
        <body className="contactpage utilitypage scroll" />
      </Helmet>
      <Seo
        title={frontmatter.title}
        description={frontmatter.title + " " + site.siteMetadata.title}
      />

      {showNav ? <div className="spacer" style={{ height: "60px", border: "0px solid yellow" }}></div> : ""}

      <div className="container panel" style={{ maxWidth: "1024px", margin: "0 auto", paddingTop: "20px" }}>
        <h1 className="headline">{frontmatter.title}</h1>
        <div className="description" style={{ padding: "2vh 6%" }} dangerouslySetInnerHTML={{ __html: html }} />

        <div
          className="wrapper"
          style={{ padding: "0 10%", maxWidth: "900px", margin: "0 auto", display: "flex", flexDirection: "column", justifyContent: "center" }}
        >


<form
  className={`contact-form ${submitted ? "submitted" : ""}`}
  // action="/thanks"
  name="contact"
  method="POST"
  data-netlify="true"
  data-netlify-honeypot="bot-field"
  onSubmit={handleSubmit}
  style={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    opacity: isSubmitting ? 0.5 : 1,
  }}
>


  {submitted ? (
    <div className="thank-you-message" style={{fontSize:'200%', height:'60vh', textAlign:'center'}}>
      Thank you - we'll be in touch!
    </div>
  ) : (
    <>
      <input type="hidden" name="form-name" value="contact" />
      <p>
        <label>
          <input type="email" name="email" placeholder="your@email.com" required />
        </label>
      </p>
      <p>
        <label>
          <textarea name="message" placeholder="Your Message"></textarea>
        </label>
      </p>
      <p
        className="text-align-right1"
        style={{ margin: "0 auto", color: "#fff" }}
      >
        <button className="button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Send Message"}
        </button>
      </p>
    </>
  )}
</form>

        </div>
      </div>
      <br />
      <br />
      <Footer />
    </Layout>
  );
};

export default Contact;
