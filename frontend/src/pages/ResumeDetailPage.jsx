import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getResumeById, addSection, addEntry } from "../services/resumeService";
import sectionFields from "../config/sectionFields";
import AppLayout from "../layouts/AppLayout";
import ClassicTemplate from "../templates/ClassicTemplate";
import ModernTemplate from "../templates/ModernTemplate";
import {
  exportResumeAsPdf,
  exportResumeAsDoc,
} from "../services/exportService";

import themes from "../themes/themeConfig";

function ResumeDetailPage() {
  const { id } = useParams();

  const [resume, setResume] = useState(null);

  const [sectionType, setSectionType] = useState("");
  const [sectionDisplayName, setSectionDisplayName] = useState("");

  const [entryFields, setEntryFields] = useState({
    field1: "",
    field2: "",
    field3: "",
  });

  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [selectedTheme, setSelectedTheme] = useState("cyberBlue");

  const theme = themes[selectedTheme];

  useEffect(() => {
    loadResume();
  }, []);

  async function loadResume() {
    const data = await getResumeById(id);

    setResume(data);
  }

  async function handleAddSection() {
    if (!sectionType.trim()) {
      alert("Enter section type");
      return;
    }

    if (!sectionDisplayName.trim()) {
      alert("Enter display name");
      return;
    }

    await addSection(id, sectionType, sectionDisplayName);

    setSectionType("");
    setSectionDisplayName("");

    loadResume();
  }

  async function handleAddEntry(sectionId) {
    const values = {};

    Object.entries(entryFields).forEach(([key, value]) => {
      if (value.trim()) {
        values[key] = value;
      }
    });

    if (Object.keys(values).length === 0) {
      alert("Enter at least one field");
      return;
    }

    await addEntry(id, sectionId, values);

    setEntryFields({
      field1: "",
      field2: "",
      field3: "",
    });

    loadResume();
  }

  if (!resume) {
    return <h2>Loading...</h2>;
  }

  return (
    <AppLayout className="min-h-screen bg-slate-950 text-white p-8 max-w-7xl mx-auto">
      <h1 className="text-5xl font-bold mb-4 text-cyan-400">{resume.title}</h1>

      <p className="text-slate-400 mb-6">ID: {resume.id}</p>
      <div className="bg-slate-900 p-6 rounded-2xl mb-8 border border-slate-800">
        <input
          className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 mr-3 mb-3 text-white"
          type="text"
          placeholder="Section Type"
          value={sectionType}
          onChange={(e) => setSectionType(e.target.value)}
        />

        <input
          className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 mr-3 mb-3 text-white"
          type="text"
          placeholder="Display Name"
          value={sectionDisplayName}
          onChange={(e) => setSectionDisplayName(e.target.value)}
        />

        <button
          className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg font-semibold transition"
          onClick={handleAddSection}
        >
          Add Section
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Resume Template</h2>

        <select
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white"
        >
          <option value="modern">Modern</option>

          <option value="classic">Classic</option>
        </select>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Theme</h2>

        <select
          value={selectedTheme}
          onChange={(e) => setSelectedTheme(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white"
        >
          <option value="cyberBlue">Cyber Blue</option>

          <option value="corporateGray">Corporate Gray</option>

          <option value="minimalWhite">Minimal White</option>
        </select>
      </div>

      <h2 className="text-3xl font-bold mb-6 text-white">Sections</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resume.sections.map((section) => (
          <div
            key={section.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6 hover:border-cyan-500 transition duration-300"
          >
            <h3 className="text-2xl font-bold mb-3 text-cyan-300">
              {section.displayName}
            </h3>

            <p>Type: {section.type}</p>

            <div
              style={{
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              >
                {(sectionFields[section.type] || []).map((field, index) => (
                  <input
                    className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 mr-3 mb-3 text-white"
                    key={index}
                    type="text"
                    placeholder={field.label}
                    value={entryFields[field.key]}
                    onChange={(e) =>
                      setEntryFields({
                        ...entryFields,
                        [field.key]: e.target.value,
                      })
                    }
                  />
                ))}

                <button
                  className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg font-semibold transition"
                  onClick={() => handleAddEntry(section.id)}
                >
                  Add Entry
                </button>
              </div>
            </div>

            {section.entries.map((entry) => (
              <div
                key={entry.id}
                className="bg-slate-950 border border-slate-800 rounded-xl p-4 mt-4"
              >
                {(sectionFields[section.type] || []).map((field) => (
                  <p key={field.key} className="mb-2 text-slate-300">
                    <strong>{field.label}:</strong> {entry.values[field.key]}
                  </p>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-6">Resume Preview</h2>
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => exportResumeAsPdf()}
            className="bg-green-500 hover:bg-green-600 px-5 py-3 rounded-lg font-semibold transition"
          >
            Export PDF
          </button>

          <button
            onClick={() => exportResumeAsDoc(resume)}
            className="bg-blue-500 hover:bg-blue-600 px-5 py-3 rounded-lg font-semibold transition"
          >
            Export DOC
          </button>
        </div>
        {selectedTemplate === "modern" ? (
          <ModernTemplate resume={resume} theme={theme} />
        ) : (
          <ClassicTemplate resume={resume} />
        )}
      </div>
    </AppLayout>
  );
}

export default ResumeDetailPage;
