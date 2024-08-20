package com.edu.dto;

public class AttributesSkusDTO {
    private int id;
    private int skusId;
    private int attributeOptionId;

    // Constructors
    
    public AttributesSkusDTO() {
    }

    public AttributesSkusDTO(int id, int skusId, int attributeOptionId) {
        this.id = id;
        this.skusId = skusId;
        this.attributeOptionId = attributeOptionId;
    }
    // Getters and Setters
    public int getId() {
        return id;
    }

    
    public void setId(int id) {
        this.id = id;
    }

    public int getSkusId() {
        return skusId;
    }

    public void setSkusId(int skusId) {
        this.skusId = skusId;
    }

    public int getAttributeOptionId() {
        return attributeOptionId;
    }

    public void setAttributeOptionId(int attributeOptionId) {
        this.attributeOptionId = attributeOptionId;
    }
}
