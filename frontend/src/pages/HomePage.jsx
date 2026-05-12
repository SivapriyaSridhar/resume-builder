import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllResumes, createResume } from "../services/resumeService";

import AppLayout from "../layouts/AppLayout";
import StatCard from "../components/StatCard";

function HomePage() {
  const [resumes, setResumes] = useState([]);
  const [title, setTitle] = useState("");

  const totalSections = resumes.reduce(
    (count, resume) => count + resume.sections.length,
    0,
  );

  const totalEntries = resumes.reduce(
    (count, resume) =>
      count +
      resume.sections.reduce(
        (sectionCount, section) => sectionCount + section.entries.length,
        0,
      ),
    0,
  );

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
      <h1 className="text-5xl font-bold text-cyan-400 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Resumes" value={resumes.length} />

        <StatCard title="Total Sections" value={totalSections} />

        <StatCard title="Total Entries" value={totalEntries} />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-10">
          <h2 className="text-2xl font-bold mb-4 text-cyan-300">
            Quick Actions
          </h2>

          <input
            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 mr-4 text-white w-96"
            type="text"
            placeholder="Enter resume title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button
            className="bg-cyan-500 hover:bg-cyan-600 px-5 py-3 rounded-lg font-semibold transition"
            onClick={handleCreateResume}
          >
            Create Resume
          </button>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-6">Recent Resumes</h2>

      {resumes.map((resume) => (
        <div
          key={resume.id}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6 hover:border-cyan-500 transition duration-300"
        >
          <h3 className="text-2xl font-bold text-cyan-300 mb-3">
            {resume.title}
          </h3>

          <p>ID: {resume.id}</p>

          <Link
            to={`/resumes/${resume.id}`}
            className="inline-block mt-4 bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg font-semibold transition"
          >
            Open Resume
          </Link>
        </div>
      ))}
    </AppLayout>
  );
}

export default HomePage;
