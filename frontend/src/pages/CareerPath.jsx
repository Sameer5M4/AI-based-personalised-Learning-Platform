import React, { useState } from "react";

const CareerPath = () => {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [topic, setTopic] = useState("");
  const [course, setCourse] = useState("");

  const options = {
    Engineering: {
      "Computer Science": {
        "Artificial Intelligence": {
          "Machine Learning": ["Supervised Learning", "Unsupervised Learning", "Deep Learning"],
          "Data Science": ["Python for Data Science", "Big Data Analytics", "Statistics"]
        },
        "Software Development": {
          "Web Development": ["React.js", "Node.js", "Django"],
          "Mobile Development": ["Flutter", "React Native", "Swift"]
        }
      },
      "Mechanical": {
        "Robotics": {
          "Automation": ["Control Systems", "PLC Programming", "Industrial Automation"]
        }
      }
    },
    Medical: {
      "MBBS": {
        "Surgery": {
          "Neurosurgery": ["Brain Surgery", "Spinal Surgery"],
          "Cardiology": ["Heart Surgery", "Cardiac Imaging"]
        }
      }
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Choose Your Field</h2>
      <select
        className="w-full p-2 border rounded-lg"
        onChange={(e) => {
          setCategory(e.target.value);
          setSubCategory("");
          setSpecialization("");
          setTopic("");
          setCourse("");
        }}
        value={category}
      >
        <option value="">Select Category</option>
        {Object.keys(options).map((key) => (
          <option key={key} value={key}>{key}</option>
        ))}
      </select>

      {category && (
        <div className="mt-4">
          <label className="block mb-2">Select Subcategory:</label>
          <select
            className="w-full p-2 border rounded-lg"
            onChange={(e) => {
              setSubCategory(e.target.value);
              setSpecialization("");
              setTopic("");
              setCourse("");
            }}
            value={subCategory}
          >
            <option value="">Select Subcategory</option>
            {Object.keys(options[category]).map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>
      )}

      {subCategory && (
        <div className="mt-4">
          <label className="block mb-2">Select Specialization:</label>
          <select
            className="w-full p-2 border rounded-lg"
            onChange={(e) => {
              setSpecialization(e.target.value);
              setTopic("");
              setCourse("");
            }}
            value={specialization}
          >
            <option value="">Select Specialization</option>
            {Object.keys(options[category][subCategory]).map((spec) => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
        </div>
      )}

      {specialization && (
        <div className="mt-4">
          <label className="block mb-2">Select Topic:</label>
          <select
            className="w-full p-2 border rounded-lg"
            onChange={(e) => {
              setTopic(e.target.value);
              setCourse("");
            }}
            value={topic}
          >
            <option value="">Select Topic</option>
            {Object.keys(options[category][subCategory][specialization]).map((top) => (
              <option key={top} value={top}>{top}</option>
            ))}
          </select>
        </div>
      )}

      {topic && (
        <div className="mt-4">
          <label className="block mb-2">Select Course:</label>
          <select
            className="w-full p-2 border rounded-lg"
            onChange={(e) => setCourse(e.target.value)}
            value={course}
          >
            <option value="">Select Course</option>
            {options[category][subCategory][specialization][topic].map((course) => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </div>
      )}

      {course && (
        <div className="mt-4 p-3 bg-green-100 rounded-lg">
          <p className="text-green-700">You selected: <strong>{category} → {subCategory} → {specialization} → {topic} → {course}</strong></p>
        </div>
      )}
    </div>
  );
};

export default CareerPath;