package com.edu.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.entities.AttributesSkusEntity;
import com.edu.jpa.AttributeSkusJPA;

@Service
public class AttributeSkusService {
    @Autowired
    private AttributeSkusJPA attributeSkusJPA;

    public List<AttributesSkusEntity> getAttributeSkus(){
        return attributeSkusJPA.findAll();
    }

      public AttributesSkusEntity getAttributeSkusById(int id) {
        return attributeSkusJPA.findById(id).orElse(null);
    }

    public AttributesSkusEntity saveAttributeSkus(AttributesSkusEntity attributeSkus) {
        return attributeSkusJPA.save(attributeSkus);
    }

    public AttributesSkusEntity updateAttributeSkus(int id, AttributesSkusEntity attributeSkus) {
        if (attributeSkusJPA.existsById(id)) {
            attributeSkus.setId(id);
            return attributeSkusJPA.save(attributeSkus);
        }
        return null;
    }
    

    public void deleteAttributeSkus(int id) {
        attributeSkusJPA.deleteById(id);
    }

    // public List<AttributesSkusEntity> searchAttributesOption(String name, String value) {
    //     if (name != null || value != null) {
    //         return attributeSkusJPA.findByAttributes_NameOrValue(name, value);
    //     } else {
    //         return attributeSkusJPA.findAll();
    //     }
    // }
}
