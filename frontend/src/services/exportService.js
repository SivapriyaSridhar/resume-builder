export function exportResumeAsPdf() {

  window.print();
}

export function exportResumeAsDoc(
  resume
) {

  let content = `
    <html>
    <head>
      <meta charset="utf-8">
      <title>${resume.title}</title>
    </head>
    <body>
  `;

  content += `
    <h1>${resume.title}</h1>
  `;

  resume.sections.forEach((section) => {

    content += `
      <h2>${section.displayName}</h2>
    `;

    section.entries.forEach((entry) => {

      Object.entries(entry.values)
        .forEach(([key, value]) => {

        content += `
          <p>
            <strong>${key}</strong>:
            ${value}
          </p>
        `;
      });

      content += "<hr />";
    });

  });

  content += `
    </body>
    </html>
  `;

  const blob = new Blob(
    [content],
    { type: "application/msword" }
  );

  const url =
    window.URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download =
    `${resume.title}.doc`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
}