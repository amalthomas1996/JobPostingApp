const Job = require('../models/Job');
const nodemailer = require('nodemailer');

const createJob = async (req, res) => {
  try {
    const { title, description, experienceLevel, endDate, candidates } = req.body;

    // Save the job to the database
    const job = await Job.create({ title, description, experienceLevel, endDate, candidates });

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Send email to each candidate
    candidates.forEach(async (candidate) => {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: candidate.email,
        subject: `New Job Posting: ${title}`,
        text: `
          Hello,

          A new job has been posted that matches your experience level. 

          Job Title: ${title}
          Description: ${description}
          Experience Level: ${experienceLevel}
          End Date: ${new Date(endDate).toLocaleDateString()}

          Best regards,
          ${req.user.companyName}
        `
      };

      // Send email
      await transporter.sendMail(mailOptions);
    });

    res.status(201).json({ message: 'Job posted and emails sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createJob };
