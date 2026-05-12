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
          <h2 className="text-3xl font-bold ${theme.subtitle} mb-6">
            {section.displayName}
          </h2>

          {section.entries.map((entry) => (
            <div
              key={entry.id}
              className="${theme.background} border ${theme.border} rounded-xl p-5 mb-5"
            >
              {(sectionFields[section.type] || []).map((field) => (
                <p key={field.key} className="mb-2 ${theme.text}">
                  <strong className="${theme.title}">{field.label}:</strong>{" "}
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
