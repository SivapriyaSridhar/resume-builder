package com.resumebuilder.web;

import com.resumebuilder.application.service.ResumeService;
import com.resumebuilder.domain.model.Resume;
import com.resumebuilder.web.dto.CreateResumeRequest;
import com.resumebuilder.web.dto.CreateSectionRequest;
import com.resumebuilder.web.dto.UpdateResumeRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/resumes")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @PostMapping
    public Resume createResume(@Valid @RequestBody CreateResumeRequest request) {

        return resumeService.createResume(request.getTitle());
    }

    @GetMapping
    public List<Resume> getAllResumes() {

        return resumeService.getAllResumes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resume> getResumeById(@PathVariable String id) {

        return resumeService.getResumeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResume(@PathVariable String id) {

        resumeService.deleteResume(id);

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public Resume updateResume(
            @PathVariable String id,
            @Valid @RequestBody UpdateResumeRequest request) {

        return resumeService.updateResume(id, request.getTitle());
    }

    @PostMapping("/{id}/sections")
    public Resume addSection(
            @PathVariable String id,
            @Valid @RequestBody CreateSectionRequest request) {

        return resumeService.addSection(
                id,
                request.getType(),
                request.getDisplayName());
    }

}