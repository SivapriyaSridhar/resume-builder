import ModernTemplate from "../templates/ModernTemplate";
import ClassicTemplate from "../templates/ClassicTemplate";

function ResumePreview({
  resume,
  selectedTemplate,
  theme
}) {

  if (!resume) {
    return null;
  }

  return (

    <div id="resume-preview">

      {selectedTemplate === "modern" ? (

        <ModernTemplate
          resume={resume}
          theme={theme}
        />

      ) : (

        <ClassicTemplate
          resume={resume}
        />

      )}

    </div>

  );
}

export default ResumePreview;