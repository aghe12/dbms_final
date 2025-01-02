import React, { useState } from 'react';

const FormSection = ({ title, fields, data, setData, endpoint }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert(`${title} submitted successfully!`);
      } else {
        const errorData = await response.json(); // Get error details from response
        console.error('Error:', errorData);
        alert(`Failed to submit ${title}: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`An error occurred while submitting ${title}: ${error.message}`);
    }
  };

  const commonStyles = {
    inputField: {
      margin: '10px 0',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      width: '100%',
      boxSizing: 'border-box',
    },
    button: {
      backgroundColor: '#007bff',
      color: 'white',
      padding: '10px 15px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    container: {
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      maxWidth: '600px',
      margin: '20px auto',
      backgroundColor: '#f9f9f9',
    },
  };

  return (
    <div style={commonStyles.container}>
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div key={field.key} style={{ marginBottom: '10px' }}>
            <label>{field.label}:</label>
            <input
              type="text"
              value={data[field.key] || ''}
              onChange={(e) =>
                setData({ ...data, [field.key]: e.target.value })
              }
              style={commonStyles.inputField}
            />
          </div>
        ))}
        <button type="submit" style={commonStyles.button}>
          Submit {title}
        </button>
      </form>
    </div>
  );
};

const Tables = () => {
  const [recruiter, setRecruiter] = useState({});
  const [skill, setSkill] = useState({});
  const [internship, setInternship] = useState({});
  const [interview, setInterview] = useState({});
  const [placement, setPlacement] = useState({});

  return (
    <div>
      <FormSection
        title="Recruiter Details"
        fields={[
          { key: 'company_name', label: 'Company Name' },
          { key: 'contact_person', label: 'Contact Person' },
          { key: 'contact_email', label: 'Contact Email' },
        ]}
        data={recruiter}
        setData={setRecruiter}
        endpoint="http://localhost:5000/api/recruiter"
      />
      
      <FormSection
        title="Skill Details"
        fields={[
          { key: 'std_id', label: 'Student ID' },
          { key: 'skill_name', label: 'Skill Name' },
        ]}
        data={skill}
        setData={setSkill}
        endpoint="http://localhost:5000/api/skill"
      />
      
      <FormSection
        title="Internship Details"
        fields={[
          { key: 'title', label: 'Title' },
          { key: 'description', label: 'Description' },
          { key: 'recruit_id', label: 'Recruiter ID' },
        ]}
        data={internship}
        setData={setInternship}
        endpoint="http://localhost:5000/api/internship"
      />
      
      <FormSection
        title="Interview Details"
        fields={[
          { key: 'std_id', label: 'Student ID' },
          { key: 'recruit_id', label: 'Recruiter ID' },
          { key: 'interview_result', label: 'Interview Result' },
        ]}
        data={interview}
        setData={setInterview}
        endpoint="http://localhost:5000/api/interview"
      />
      
      <FormSection
        title="Placement Details"
        fields={[
          { key: 'std_id', label: 'Student ID' },
          {key:'placed',label:'placement result'},
          { key: 'date_of_placement', label: 'Date of Placement' },
        ]}
        data={placement}
        setData={setPlacement}
        endpoint="http://localhost:5000/api/placement"
      />
    </div>
  );
};

export default Tables;
