import sectionFields from "../config/sectionFields";

function ModernTemplate({ resume }) {

  return (

    <div className="bg-slate-900 text-white p-10 rounded-2xl border border-slate-700">

      <h1 className="text-5xl font-bold text-cyan-400 mb-10">
        {resume.title}
      </h1>

      {resume.sections.map((section) => (

        <div
          key={section.id}
          className="mb-10"
        >

          <h2 className="text-3xl font-bold text-cyan-300 mb-6">
            {section.displayName}
          </h2>

          {section.entries.map((entry) => (

            <div
              key={entry.id}
              className="bg-slate-950 border border-slate-800 rounded-xl p-5 mb-5"
            >

              {(sectionFields[section.type] || [])
                .map((field) => (

                <p
                  key={field.key}
                  className="mb-2 text-slate-300"
                >

                  <strong className="text-cyan-400">
                    {field.label}:
                  </strong>

                  {" "}

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