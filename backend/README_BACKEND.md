# Resume Builder Backend

A beginner-friendly yet enterprise-style backend project built using Java and Spring Boot.

This project is designed not only to create a working resume builder application, but also to help learn:

- Java backend development
- Spring Boot architecture
- REST APIs
- JSON storage systems
- Clean Architecture concepts
- Git and project workflow
- Full stack application structure
- Real-world software engineering practices

---

# Project Goal

The main goal of this backend is to act as the core engine for a Resume Builder application.

The backend handles:

- Resume creation
- Resume storage
- Section management
- Dynamic entry management
- JSON persistence
- API communication

This backend is intentionally designed using scalable architecture principles so it can later support:

- PDF export
- DOCX export
- AI integration
- Template engines
- Database migration
- Authentication
- Cloud deployment

---

# Tech Stack

| Technology | Purpose |
|---|---|
| Java 21 | Core programming language |
| Spring Boot | Backend framework |
| Maven | Dependency and build management |
| Jackson | JSON serialization/deserialization |
| REST APIs | Client-server communication |
| Git | Version control |
| JSON File Storage | V1 local persistence |

---

# Current Features

## Resume Management

- Create Resume
- Get All Resumes
- Get Resume By ID
- Delete Resume
- Update Resume

---

## Section Management

- Add sections dynamically
- Support any section type
- Store section ordering
- Rename sections

Examples:

- Education
- Projects
- Skills
- Experience
- Certifications

---

## Entry Management

Each section can contain dynamic entries.

Example:

```json
{
  "college": "SRM University",
  "degree": "B.Tech",
  "cgpa": "8.2"
}
```

The system is generic and metadata-driven.

This means:

- frontend controls field structure
- backend remains flexible
- no hardcoded section logic required

---

# Why This Architecture?

Instead of creating:

- EducationEntry
- SkillEntry
- ProjectEntry
- ExperienceEntry

separately,

this project uses:

```text
Resume
    ↓
Section
    ↓
Entry
    ↓
Dynamic Values Map
```

This allows the system to scale without major backend rewrites.

---

# Architecture Style

This project follows simplified Clean Architecture principles.

```text
Controller Layer
        ↓
Service Layer
        ↓
Repository Layer
        ↓
JSON Storage
```

---

# Package Structure

```text
src/main/java/com/resumebuilder
│
├── application
│   ├── repository
│   └── service
│
├── domain
│   └── model
│
├── infrastructure
│   └── repository
│
├── web
│   ├── dto
│   ├── exception
│   └── controllers
│
└── BackendApplication.java
```

---

# Layer Explanation

## Domain Layer

Contains core business models.

Examples:

- Resume
- Section
- Entry

This layer contains:

- business structure
- object relationships
- core application data

This layer should NOT know about:

- databases
- APIs
- frontend
- file systems

---

## Application Layer

Contains business orchestration logic.

Examples:

- create resume
- update resume
- add section
- add entries

This layer acts as the brain of the application.

---

## Infrastructure Layer

Contains actual technical implementations.

Examples:

- JSON repository
- file handling
- serialization logic

This layer can later be replaced with:

- PostgreSQL
- SQLite
- Cloud storage

without changing business logic.

---

## Web Layer

Handles:

- REST APIs
- request handling
- validation
- exception handling

This layer acts as the communication bridge between frontend and backend.

---

# Dynamic Entry System

One of the most important concepts in this project is:

```java
Map<String, Object>
```

inside the Entry model.

This allows:

```json
{
  "college": "SRM",
  "cgpa": "8.5"
}
```

OR:

```json
{
  "company": "India1 Payments",
  "role": "Intern"
}
```

using the SAME backend structure.

This makes the backend:

- highly flexible
- scalable
- template friendly
- AI friendly

---

# JSON Storage

Version 1 uses local JSON storage.

Example:

```text
storage/resumes
```

Each resume is stored as:

```text
<resume-id>.json
```

Example:

```text
95ff753e.json
```

---

# Example Stored JSON

```json
{
  "id": "95ff753e",
  "title": "Software Engineer Resume",
  "sections": [
    {
      "type": "education",
      "displayName": "Education",
      "entries": [
        {
          "values": {
            "college": "SRM University",
            "degree": "B.Tech"
          }
        }
      ]
    }
  ]
}
```

---

# REST APIs

## Health Check

```http
GET /health
```

---

## Create Resume

```http
POST /resumes
```

Body:

```json
{
  "title": "Software Engineer Resume"
}
```

---

## Get All Resumes

```http
GET /resumes
```

---

## Get Resume By ID

```http
GET /resumes/{id}
```

---

## Update Resume

```http
PUT /resumes/{id}
```

---

## Delete Resume

```http
DELETE /resumes/{id}
```

---

## Add Section

```http
POST /resumes/{resumeId}/sections
```

Example Body:

```json
{
  "type": "education",
  "displayName": "Education"
}
```

---

## Add Entry

```http
POST /resumes/{resumeId}/sections/{sectionId}/entries
```

Example Body:

```json
{
  "values": {
    "college": "SRM University",
    "degree": "B.Tech",
    "cgpa": "8.2"
  }
}
```

---

# Validation

The backend uses validation annotations.

Example:

```java
@NotBlank
```

This ensures invalid requests are rejected automatically.

---

# Global Exception Handling

The project uses centralized exception handling.

Benefits:

- cleaner APIs
- proper HTTP status codes
- better frontend integration
- easier debugging

---

# Learning Outcomes From This Project

This project teaches:

## Backend Development

- Java
- Spring Boot
- REST APIs
- Maven
- Dependency Injection
- JSON serialization

---

## Software Architecture

- Clean Architecture
- Layer separation
- Repository pattern
- DTO usage
- Service layer design
- Scalability thinking

---

## Engineering Workflow

- Git commits
- Version control
- Incremental development
- Modular project structure
- Professional project organization

---

# Future Roadmap

## Planned Features

- React frontend
- Live preview
- PDF export
- DOCX export
- Drag-and-drop sections
- Template system
- AI assistance
- Authentication
- Database migration
- Cloud deployment

---

# How To Run Backend

## Step 1

Move into backend folder:

```bash
cd backend
```

---

## Step 2

Run Spring Boot application:

```bash
mvn spring-boot:run
```

---

## Step 3

Open browser:

```text
http://localhost:8080/health
```

Expected output:

```text
Resume Builder Backend Running
```

---

# Recommended Tools

| Tool | Purpose |
|---|---|
| VS Code | Development |
| Postman | API Testing |
| GitHub | Version Control |
| Maven | Dependency Management |
| Spring Boot | Backend Development |

---

# Recommended Learning Flow

1. Understand domain models
2. Understand repository pattern
3. Learn REST APIs
4. Learn JSON persistence
5. Learn frontend integration
6. Learn PDF export
7. Learn AI integration
8. Learn deployment

---

# Important Engineering Principles Used

- Keep business logic separated
- Controllers should remain thin
- Services should contain orchestration
- Repositories handle persistence
- Domain models should remain reusable
- Infrastructure should be replaceable

---

# Current Project Status

## Completed

- Backend setup
- REST APIs
- JSON persistence
- Dynamic sections
- Dynamic entries
- Validation
- Exception handling
- Git integration

---

## In Progress

- React frontend
- UI integration
- Live preview

---

# Author Notes

This project is being developed as:

- a learning platform
- a portfolio project
- a scalable software architecture exercise
- a full stack engineering practice system

The focus is not only on building features, but also on learning:

- clean code
- modular architecture
- scalable systems
- real-world engineering workflows

---

# Final Goal

Build a professional resume builder platform that demonstrates:

- strong Java backend skills
- scalable architecture understanding
- project management thinking
- full stack integration knowledge
- real software engineering practices

