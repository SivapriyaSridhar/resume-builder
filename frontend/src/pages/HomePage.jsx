import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllResumes,
  createResume
} from "../services/resumeService";

import AppLayout from "../layouts/AppLayout";

function HomePage() {

  const [resumes, setResumes] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    loadResumes();
  }, []);

  async function loadResumes() {

    const data = await getAllResumes();

    setResumes(data);
  }

  async function handleCreateResume() {

    if (!title.trim()) {
      alert("Please enter title");
      return;
    }

    await createResume(title);

    setTitle("");

    loadResumes();
  }

  return (
    <AppLayout style={{ padding: "20px" }}>

      <h1>Resume Builder</h1>

      <div style={{ marginBottom: "20px" }}>

        <input
          type="text"
          placeholder="Enter resume title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={handleCreateResume}>
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

          <Link to={`/resumes/${resume.id}`}>
            Open Resume
          </Link>

        </div>

      ))}

    </AppLayout>
  );
}

export default HomePage;