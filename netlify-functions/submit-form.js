const fs = require('fs');

exports.handler = async (event) => {
  try {
    const { name, email } = JSON.parse(event.body);

    const formData = `Name: ${name}\nEmail: ${email}\n`;

    fs.appendFileSync('./public/form-data.txt', formData);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Form submitted successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error submitting form' }),
    };
  }
};
