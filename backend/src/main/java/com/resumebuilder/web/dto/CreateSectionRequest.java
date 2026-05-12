package com.resumebuilder.web.dto;

import jakarta.validation.constraints.NotBlank;

public class CreateSectionRequest {

    @NotBlank(message = "Section type is required")
    private String type;

    @NotBlank(message = "Display name is required")
    private String displayName;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }
}