package com.edu.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.entities.AttributeEntity;
import com.edu.jpa.AttributesJPA;
import java.util.List;

@Service
public class AttributesService {
    @Autowired
    private AttributesJPA attributesJPA;

    public List<AttributeEntity> getAllAttributes() {
        return attributesJPA.findAll();
    }

    public AttributeEntity getAttributeById(int id) {
        return attributesJPA.findById(id).orElse(null);
    }

    public AttributeEntity saveAttribute(AttributeEntity attribute) {
        return attributesJPA.save(attribute);
    }

    public AttributeEntity updateAttribute(int id, AttributeEntity attribute) {
        if (attributesJPA.existsById(id)) {
            attribute.setId(id);
            return attributesJPA.save(attribute);
        }
        return null;
    }

    public void deleteAttribute(int id) {
        attributesJPA.deleteById(id);
    }

    public List<AttributeEntity> searchAttributes(String name) {
        if (name != null) {
            return attributesJPA.findByName(name);
        } else {
            return attributesJPA.findAll(); // Trả về tất cả nếu không có tham số nào
        }
    }
}