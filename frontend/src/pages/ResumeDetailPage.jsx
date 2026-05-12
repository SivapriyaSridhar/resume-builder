import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getResumeById, addSection, addEntry } from "../services/resumeService";

function ResumeDetailPage() {
  const { id } = useParams();

  const [resume, setResume] = useState(null);

  const [sectionType, setSectionType] = useState("");
  const [sectionDisplayName, setSectionDisplayName] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [fieldValue, setFieldValue] = useState("");

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
    if (!fieldName.trim()) {
      alert("Enter field name");
      return;
    }

    if (!fieldValue.trim()) {
      alert("Enter field value");
      return;
    }

    const values = {
      [fieldName]: fieldValue,
    };

    await addEntry(id, sectionId, values);

    setFieldName("");
    setFieldValue("");

    loadResume();
  }

  if (!resume) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{resume.title}</h1>

      <p>ID: {resume.id}</p>

      <div
        style={{
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Section Type"
          value={sectionType}
          onChange={(e) => setSectionType(e.target.value)}
        />

        <input
          type="text"
          placeholder="Display Name"
          value={sectionDisplayName}
          onChange={(e) => setSectionDisplayName(e.target.value)}
        />

        <button onClick={handleAddSection}>Add Section</button>
      </div>

      <h2>Sections</h2>

      {resume.sections.map((section) => (
        <div
          key={section.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{section.displayName}</h3>

          <p>Type: {section.type}</p>

          <div
            style={{
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <input
              type="text"
              placeholder="Field Name"
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Field Value"
              value={fieldValue}
              onChange={(e) => setFieldValue(e.target.value)}
            />

            <button onClick={() => handleAddEntry(section.id)}>
              Add Entry
            </button>
          </div>

          {section.entries.map((entry) => (
            <div
              key={entry.id}
              style={{
                border: "1px solid gray",
                padding: "10px",
                marginTop: "10px",
              }}
            >
              {Object.entries(entry.values).map(([key, value]) => (
                <p key={key}>
                  <strong>{key}:</strong> {value}
                </p>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ResumeDetailPage;
