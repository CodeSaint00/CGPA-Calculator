import { useState, useReducer, useEffect, useRef } from "react";

export default function InputField() {
  const initialCourses = [];

  function actions(subjects, action) {
    switch (action.type) {
      case "ADD_COURSE": {
        const addCourses = action.payload;
        if (
          !addCourses.grade ||
          !addCourses.courseCode ||
          !addCourses.courseTitle ||
          !addCourses.creditLoad
        ) {
          alert("please fill in all fields");
          return subjects;
        }
        return [...subjects, addCourses];
      }
      case "REMOVE_COURSE": {
        return subjects.filter((score) => score.id !== action.payload);
      }
      default:
        return subjects;
    }
  }
  const [subjects, dispatch] = useReducer(actions, initialCourses);

  const [course, setCourse] = useState({
    id: Date.now(),
    grade: "",
    courseCode: "",
    courseTitle: "",
    creditLoad: "",
  });
  function courseDisplay(e) {
    e.preventDefault();
    dispatch({ type: "ADD_COURSE", payload: { ...course, id: Date.now() } });
  }
  function clearAll() {
    setCourse({
      grade: "",
      courseCode: "",
      courseTitle: "",
      creditLoad: "",
    });
  }

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="fragment">
      <div className="section-1">
        <h1>CGPA Calculator</h1>
        <form action="" onSubmit={courseDisplay} onReset={clearAll}>
          <input
            value={course.courseCode}
            placeholder="Course Code"
            ref={inputRef}
            onChange={(e) => {
              setCourse({ ...course, courseCode: e.target.value });
            }}
          />
          <input
            placeholder="Course Title"
            value={course.courseTitle}
            onChange={(e) => {
              setCourse({ ...course, courseTitle: e.target.value });
            }}
          />
          <input
            type="number"
            placeholder="Credit Load"
            value={course.creditLoad}
            onChange={(e) => {
              setCourse({ ...course, creditLoad: Number(e.target.value) });
            }}
          />
          <select
            name="grade"
            id="grade"
            value={course.grade}
            onChange={(e) => {
              setCourse({ ...course, grade: e.target.value });
            }}
          >
            <option value=""></option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
          </select>
          <div className="buttons">
            <button type="submit">Record</button>
            <button type="reset">Clear</button>
          </div>
        </form>
      </div>
      <div className="course">
        {subjects.length === 0 ? (
          <p>No Scores Yet</p>
        ) : (
          subjects.map((course) => (
            <div key={course.id} className="section">
              <h4>{course.grade}</h4>
              <div className="courseName">
                <h5>
                  <span>{course.courseCode} </span>
                  <br />
                  {course.courseTitle}
                </h5>
              </div>
              <span>{course.creditLoad} Unit</span>
              <button
                className="remove"
                onClick={() =>
                  dispatch({ type: "REMOVE_COURSE", payload: course.id })
                }
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
