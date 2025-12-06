import React, { useState, useEffect } from 'react';
import { API_URL } from '../utils/constants';

const Courses: React.FC = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses from API
    fetch(`${API_URL}/courses`)
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="courses">
      <h1>Kurslar</h1>
      <ul>
        {courses.map((course: any) => (
          <li key={course.id}>{course.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;

