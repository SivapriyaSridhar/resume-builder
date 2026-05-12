package com.resumebuilder.web.dto;

import java.util.Map;

public class CreateEntryRequest {

    private Map<String, Object> values;

    public Map<String, Object> getValues() {
        return values;
    }

    public void setValues(Map<String, Object> values) {
        this.values = values;
    }
}