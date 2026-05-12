import sectionFields from "../config/sectionFields";

function ModernTemplate({ resume, theme }) {
  return (
    <div
      className={`
    ${theme.card}
    border
    ${theme.border}
    p-10
    rounded-2xl
  `}
    >
      <h1
        className={`
  text-5xl
  font-bold
  mb-10
  ${theme.title}
`}
      >
        {resume.title}
      </h1>

      {resume.sections.map((section) => (
        <div key={section.id} className="mb-10">
          <h2 className="text-3xl font-bold text-cyan-300 mb-6">
            {section.displayName}
          </h2>

          {section.entries.map((entry) => (
            <div
              key={entry.id}
              className="bg-slate-950 border border-slate-800 rounded-xl p-5 mb-5"
            >
              {(sectionFields[section.type] || []).map((field) => (
                <p key={field.key} className="mb-2 text-slate-300">
                  <strong className="text-cyan-400">{field.label}:</strong>{" "}
                  {entry.values[field.key]}
                </p>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ModernTemplate;
