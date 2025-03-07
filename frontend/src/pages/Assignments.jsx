import React, { useState, useEffect } from "react";
import AssignmentCard from "../components/AssignmentCard";

export default function Assignments() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <div className={`flex flex-col m-3 gap-3 bg-white/50 rounded-xl shadow-lg flex-1 ml-70 transition-all min-h-[calc(100vh-1.5rem)] duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
      <div className="flex flex-wrap gap-3 items-center justify-center p-4">
      <AssignmentCard name="React Certification" duration="10 min" marksObtained={45} totalMarks={50} />
      <AssignmentCard name="Python Certification" duration="15 min" marksObtained={40} totalMarks={50} />
      <AssignmentCard name="JavaScript Certification" duration="20 min" marksObtained={35} totalMarks={50} />
      <AssignmentCard name="HTML Certification" duration="25 min" marksObtained={30} totalMarks={50} />
      <AssignmentCard name="CSS Certification" duration="30 min" marksObtained={25} totalMarks={50} />

      </div>
    </div>
  );
};

