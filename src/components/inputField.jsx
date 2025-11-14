import { useState, useReducer, useEffect, useRef } from "react";

export default function InputField() {
  const initialCourses = [];

  function actions(subjects, action) {
    switch (action.type) {
      case "ADD_COURSE": {
        const gradePoint = {
          A: 5,
          B: 4,
          C: 3,
          D: 2,
          E: 1,
          F: 0,
        };
        const addCourses = action.payload;
        const numeric = gradePoint[addCourses.grade];

        const calculatedAverage = numeric * addCourses.creditLoad;
        const updatedCourses = {
          ...addCourses,
          numericGrade: numeric,
          GP: calculatedAverage,
        };
        if (
          !addCourses.grade ||
          !addCourses.courseCode ||
          !addCourses.courseTitle ||
          !addCourses.creditLoad
        ) {
          alert("please fill in all fields");
          return subjects;
        }
        return [...subjects, updatedCourses];
      }
      case "REMOVE_COURSE": {
        return subjects.filter((score) => score.id !== action.payload);
      }
      case "CLEAR_ALL": {
        return [];
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
    dispatch({
      type: "ADD_COURSE",
      payload: { ...course, id: subjects.length },
    });
  }
  function clearAll() {
    setCourse({
      grade: "",
      courseCode: "",
      courseTitle: "",
      creditLoad: "",
    });
  }

  const creditunitsArray = subjects.map((course) => course.creditLoad);
  const total = creditunitsArray.reduce((t, u) => t + u, 0);
  const CGP = subjects.map((course) => course.GP);
  const GPA = CGP.reduce((t, u) => t + u, 0);
  const CGPA = (GPA / total).toFixed(2);

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
        <h3>Total Credit Unit load is {total}</h3>
        <br />
      </div>
      <div className="course">
        <h1>Your GP is {CGPA}</h1>
        <div className="section-2">
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
        <button className="clearAll" onClick={() => dispatch({ type: "CLEAR_ALL" })}>Clear All</button>
      </div>
    </div>
  );
}
