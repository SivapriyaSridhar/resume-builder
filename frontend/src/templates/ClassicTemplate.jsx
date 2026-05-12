import sectionFields from "../config/sectionFields";

function ClassicTemplate({ resume }) {

  return (

    <div className="bg-white text-black p-10 rounded-2xl">

      <h1 className="text-4xl font-bold mb-8">
        {resume.title}
      </h1>

      {resume.sections.map((section) => (

        <div
          key={section.id}
          className="mb-8"
        >

          <h2 className="text-2xl font-bold border-b pb-2 mb-4">
            {section.displayName}
          </h2>

          {section.entries.map((entry) => (

            <div
              key={entry.id}
              className="mb-4"
            >

              {(sectionFields[section.type] || [])
                .map((field) => (

                <p key={field.key}>

                  <strong>
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

export default ClassicTemplate;