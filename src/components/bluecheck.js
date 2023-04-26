import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import {BsFillPatchCheckFill} from 'react-icons/bs'
const BlueCheck = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `)

  const hasNetlifyApp = data.site.siteMetadata.siteUrl.includes("netlify.app")

  return (
    <>
      {!hasNetlifyApp ? (
        <span style={{ color: "#1D9BF0" }}><BsFillPatchCheckFill /></span>
      ) : null}
    </>
  )
}

export default BlueCheck
