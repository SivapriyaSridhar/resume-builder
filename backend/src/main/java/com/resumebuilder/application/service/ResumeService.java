package com.resumebuilder.application.service;

import com.resumebuilder.application.repository.ResumeRepository;
import com.resumebuilder.domain.model.Resume;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ResumeService {

    private final ResumeRepository resumeRepository;

    public ResumeService(ResumeRepository resumeRepository) {
        this.resumeRepository = resumeRepository;
    }

    public Resume createResume(String title) {

        Resume resume = new Resume();
        resume.setTitle(title);

        return resumeRepository.save(resume);
    }

    public List<Resume> getAllResumes() {
        return resumeRepository.findAll();
    }

    public Optional<Resume> getResumeById(String id) {
        return resumeRepository.findById(id);
    }

    public Resume saveResume(Resume resume) {
        return resumeRepository.save(resume);
    }

    public void deleteResume(String id) {
        resumeRepository.deleteById(id);
    }
}