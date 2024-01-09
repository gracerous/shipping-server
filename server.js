const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 3000;

app.use(cors());

const transporter = nodemailer.createTransport({
  host: 'mail.itiro-dmcc.ae',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});
app.use(express.json());
app.post('/submit-form', async (req, res) => {
  try {
    const { name, email, telephone, message } = req.body;
    const mailOptions = {
      from: process.env.EMAIL_SENDER,
      to: process.env.EMAIL_RECEIVER,
      subject: 'New Contact Form Submission',
      text: `
        Name: ${name}
        Email: ${email}
        Telephone: ${telephone}
        Message: ${message}
      `,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
