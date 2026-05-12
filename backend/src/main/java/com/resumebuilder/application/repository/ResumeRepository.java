package com.resumebuilder.application.repository;

import com.resumebuilder.domain.model.Resume;

import java.util.List;
import java.util.Optional;

public interface ResumeRepository {

    Resume save(Resume resume);

    Optional<Resume> findById(String id);

    List<Resume> findAll();

    void deleteById(String id);
}