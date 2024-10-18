import React, { useState } from "react";
import axios from "axios";

const JobPostingForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    experienceLevel: "",
    endDate: "",
    candidates: [{ email: "" }],
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/jobs/create", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Job posted successfully");
    } catch (error) {
      setMessage("Error posting job");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Job Title"
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Job Description"
        onChange={handleChange}
      ></textarea>
      <input
        type="text"
        name="experienceLevel"
        placeholder="Experience Level"
        onChange={handleChange}
      />
      <input type="date" name="endDate" onChange={handleChange} />
      <button type="submit">Post Job</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default JobPostingForm;
