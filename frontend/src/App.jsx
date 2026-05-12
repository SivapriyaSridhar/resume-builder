import { useEffect, useState } from "react";

function App() {

  const [resumes, setResumes] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    loadResumes();
  }, []);

  async function loadResumes() {

    console.log("Loading resumes...");

    try {

      const response = await fetch("http://localhost:8080/resumes");

      console.log("Response status:", response.status);

      const data = await response.json();

      console.log("Resume data:", data);

      setResumes(data);

    } catch (error) {

      console.error("Failed to load resumes", error);
    }
  }

  async function createResume() {

    console.log("Creating resume...");

    if (!title.trim()) {
      alert("Please enter title");
      return;
    }

    try {

      const response = await fetch("http://localhost:8080/resumes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: title
        })
      });

      console.log("Create response:", response.status);

      const result = await response.json();

      console.log("Created resume:", result);

      setTitle("");

      await loadResumes();

    } catch (error) {

      console.error("Create failed:", error);
    }
  }

  return (
    <div style={{ padding: "20px" }}>

      <h1>Resume Builder</h1>

      <div style={{ marginBottom: "20px" }}>

        <input
          type="text"
          placeholder="Enter resume title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={createResume}>
          Create Resume
        </button>

      </div>

      <h2>Resume List</h2>

      {resumes.map((resume) => (

        <div
          key={resume.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px"
          }}
        >

          <h3>{resume.title}</h3>

          <p>ID: {resume.id}</p>

          <p>
            Sections: {resume.sections.length}
          </p>

        </div>

      ))}

    </div>
  );
}

export default App;