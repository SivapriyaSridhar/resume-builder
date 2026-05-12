import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getResumeById, addSection, addEntry } from "../services/resumeService";

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
            <div
              style={{
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              <input
                type="text"
                placeholder="College / Company / Skill"
                value={entryFields.field1}
                onChange={(e) =>
                  setEntryFields({
                    ...entryFields,
                    field1: e.target.value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Degree / Role / Level"
                value={entryFields.field2}
                onChange={(e) =>
                  setEntryFields({
                    ...entryFields,
                    field2: e.target.value,
                  })
                }
              />

              <input
                type="text"
                placeholder="CGPA / Experience / Notes"
                value={entryFields.field3}
                onChange={(e) =>
                  setEntryFields({
                    ...entryFields,
                    field3: e.target.value,
                  })
                }
              />

              <button onClick={() => handleAddEntry(section.id)}>
                Add Entry
              </button>
            </div>

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
