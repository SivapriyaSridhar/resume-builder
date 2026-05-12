package com.resumebuilder.infrastructure.repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.resumebuilder.application.repository.ResumeRepository;
import com.resumebuilder.domain.model.Resume;
import org.springframework.stereotype.Repository;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class JsonResumeRepository implements ResumeRepository {

    private static final String STORAGE_FOLDER = "storage/resumes";

    private final ObjectMapper objectMapper;

    public JsonResumeRepository() {
        this.objectMapper = new ObjectMapper();
        this.objectMapper.registerModule(new JavaTimeModule());

        File folder = new File(STORAGE_FOLDER);

        if (!folder.exists()) {
            folder.mkdirs();
        }
    }

    @Override
    public Resume save(Resume resume) {

        File file = new File(STORAGE_FOLDER, resume.getId() + ".json");

        try {
            objectMapper.writerWithDefaultPrettyPrinter()
                    .writeValue(file, resume);

            return resume;

        } catch (IOException e) {
            throw new RuntimeException("Failed to save resume", e);
        }
    }

    @Override
    public Optional<Resume> findById(String id) {

        File file = new File(STORAGE_FOLDER, id + ".json");

        if (!file.exists()) {
            return Optional.empty();
        }

        try {
            Resume resume = objectMapper.readValue(file, Resume.class);

            return Optional.of(resume);

        } catch (IOException e) {
            throw new RuntimeException("Failed to read resume", e);
        }
    }

    @Override
    public List<Resume> findAll() {

        File folder = new File(STORAGE_FOLDER);

        File[] files = folder.listFiles((dir, name) -> name.endsWith(".json"));

        List<Resume> resumes = new ArrayList<>();

        if (files == null) {
            return resumes;
        }

        for (File file : files) {

            try {
                Resume resume = objectMapper.readValue(file, Resume.class);

                resumes.add(resume);

            } catch (IOException e) {
                throw new RuntimeException("Failed to read resume file", e);
            }
        }

        return resumes;
    }

    @Override
    public void deleteById(String id) {

        File file = new File(STORAGE_FOLDER, id + ".json");

        if (file.exists()) {
            file.delete();
        }
    }
}