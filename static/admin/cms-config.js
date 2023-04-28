// Construct the full URLs
const origin = window.location.origin;
const siteJsonUrl = `${origin}/static/data/site.json`;
const configYmlUrl = `${origin}/static/admin/config.yml`;

// Fetch the site metadata
fetch(siteJsonUrl)
  .then(response => response.json())
  .then(siteMetadata => {
    // Get the site_url from siteMetadata
    const siteUrl = siteMetadata.siteUrl;

    // Read the original config.yml content
    fetch(configYmlUrl)
      .then(response => response.text())
      .then(configContent => {
        // Replace the placeholder with the actual site_url
        const updatedConfigContent = configContent.replace("{{site_url}}", siteUrl);

        // Create a Blob with the updated content
        const configBlob = new Blob([updatedConfigContent], { type: "text/yaml" });

        // Set the CMS config using the updated Blob
        window.CMS_MANUAL_INIT = true;
        CMS.init({ config: configBlob });
      });
  });
