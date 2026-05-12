const API_BASE_URL = "http://localhost:8080/resumes";

export async function getAllResumes() {

  const response = await fetch(API_BASE_URL);

  return await response.json();
}

export async function createResume(title) {

  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title
    })
  });

  return await response.json();
}

export async function getResumeById(id) {

  const response = await fetch(`${API_BASE_URL}/${id}`);

  return await response.json();
}