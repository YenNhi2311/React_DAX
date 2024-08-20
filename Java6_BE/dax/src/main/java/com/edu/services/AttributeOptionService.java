package com.edu.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.entities.AttributeEntity;
import com.edu.entities.AttributeOption;
import com.edu.jpa.AttributeOptionJPA;
import com.edu.jpa.AttributesJPA;

@Service
public class AttributeOptionService {
    @Autowired
    private AttributeOptionJPA attributeOptionJPA;

    public List<AttributeOption> getAllAttributeOption() {
        return attributeOptionJPA.findAll();
    }

    public AttributeOption getAttributeOptionById(int id) {
        return attributeOptionJPA.findById(id).orElse(null);
    }

    public AttributeOption saveAttributeOption(AttributeOption attributeOption) {
        return attributeOptionJPA.save(attributeOption);
    }

    public AttributeOption updateAttributeOption(int id, AttributeOption attributeOption) {
        if (attributeOptionJPA.existsById(id)) {
            attributeOption.setId(id);
            return attributeOptionJPA.save(attributeOption);
        }
        return null;
    }

    public void deleteAttributeOption(int id) {
        attributeOptionJPA.deleteById(id);
    }

    public List<AttributeOption> searchAttributesOption(String name, String value) {
        if (name != null || value != null) {
            return attributeOptionJPA.findByAttributes_NameOrValue(name, value);
        } else {
            return attributeOptionJPA.findAll();
        }
    }
}
