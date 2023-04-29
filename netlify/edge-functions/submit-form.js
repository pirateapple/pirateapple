const { writeFile } = require('@netlify/fs-utils');

exports.handler = async (event) => {
  try {
    const { name, email } = JSON.parse(event.body);

    const formData = `Name: ${name}\nEmail: ${email}\n`;

    await writeFile('./public/form-data.txt', formData, { append: true });

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
