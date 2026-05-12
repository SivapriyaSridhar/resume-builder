package com.resumebuilder.domain.model;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class Entry {

    private String id;
    private Map<String, Object> values;

    public Entry() {
        this.id = UUID.randomUUID().toString();
        this.values = new HashMap<>();
    }

    public String getId() {
        return id;
    }

    public Map<String, Object> getValues() {
        return values;
    }

    public void setValues(Map<String, Object> values) {
        this.values = values;
    }
}
