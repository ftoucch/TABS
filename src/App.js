import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight, FaJediOrder } from "react-icons/fa";
const url = "https://course-api.com/react-tabs-project";
function App() {
  // set use state for 3 variables isloading: to check for loading functionality, jobs: to save the result of our fetch and index:for count
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [index, setIndex] = useState(0);

  // fetch data from url and also setis loading to be false and check for errors
  const fetchJob = async () => {
    try {
      const response = await fetch(url);
      const newJob = await response.json();
      setJobs(newJob);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  // call the fetch function
  useEffect(() => {
    fetchJob();
  }, []);

  if (isLoading) {
    return (
      <section className="section loading">
        <h1>Loading...</h1>
      </section>
    );
  }

  const { company, dates, duties, title } = jobs[index]; // desturcture job
  return (
    <section className="section">
      <div className="title">
        <h2>Experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        <div className="btn-container">
          {jobs.map((btnValue, count) => {
            const { id, company } = btnValue;
            return (
              <button
                key={id}
                className={`job-btn ${count === index && "active-btn"}`}
                onClick={() => setIndex(count)}
              >
                {company}
              </button>
            );
          })}
        </div>
        <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>
          {duties.map((duty, index) => {
            return (
              <div className="job-desc" key={index}>
                <FaAngleDoubleRight className="job-icon" />
                <p>{duty}</p>
              </div>
            );
          })}
        </article>
      </div>
      <button type="button" className="btn">
        more info
      </button>
    </section>
  );
}

export default App;
