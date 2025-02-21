import React, { useState } from "react";

function BugReport() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    steps: "",
    screenshot: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, screenshot: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Bug Report Submitted:", formData);
    alert("Bug report submitted! Thank you.");
    setFormData({
      title: "",
      description: "",
      steps: "",
      screenshot: null,
    });
  };

  return (
    
    <div>
      <div className="bugtitle">
        <h1>
          Bug Reporting
        </h1>
      </div>

      <div className="centered-form">
        <p>Help us improve by reporting any bugs you find.</p>

        <h1>Suggested Submission:</h1>
        <ul>
          <li><strong>Title:</strong> A brief title for the issue</li>
          <li><strong>Description:</strong>A brief description of the issue</li>
          <li><strong>Steps to Reproduce:</strong> How to trigger the bug</li>
          <li><strong>Screenshot (optional):</strong> Upload a screenshot if available</li>
        </ul>

        <form onSubmit={handleSubmit}>

          <label>
            Title: <br/>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              required 
            />
          </label>
          
          <br/>
          <br/>
          <label>
            Brief Description of the Issue: <br/>
            <textarea 
            className="fixed-textrea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            />
          </label>
          <br/>
          <br/>
          <label>
            Steps to Reproduce: <br />
            <textarea 
              name="steps" 
              className="fixed-textrea"
              value={formData.steps} 
              onChange={handleChange} 
              required 
            />
          </label>
          <br/>
          <br/>
          <label>
            Screenshot (optional):
            <input 
              type="file" 
              name="screenshot" 
              onChange={handleFileChange} 
            />
          </label>
          <br/>
          <br/>
          <button type="submit">Submit Bug Report</button>
        </form>
      </div>


      </div>
      

  );
}

export default BugReport;