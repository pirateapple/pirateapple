// Fetch the site metadata
fetch("/data/site.json")
  .then(response => response.json())
  .then(siteMetadata => {
    // Get the site_url from siteMetadata
    const siteUrl = siteMetadata.siteUrl;

    // Read the original config.yml content
    fetch("/admin/config.yml")
      .then(response => response.text())
      .then(configContent => {
        // Create a Blob with the config content
        const configBlob = new Blob([configContent], { type: "text/yaml" });

        // Set the CMS config using the Blob and the siteUrl
        window.CMS_MANUAL_INIT = true;
        CMS.init({ config: configBlob, site_url: siteUrl });
      });
  });
