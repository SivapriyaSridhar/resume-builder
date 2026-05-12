package com.resumebuilder.domain.model;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class Section {

    private String id;
    private String type;
    private String displayName;
    private int order;
    private List<Entry> entries;

    public Section() {
        this.id = UUID.randomUUID().toString();
        this.entries = new ArrayList<>();
    }

    public String getId() {
        return id;
    }

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

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }

    public List<Entry> getEntries() {
        return entries;
    }

    public void setEntries(List<Entry> entries) {
        this.entries = entries;
    }
}