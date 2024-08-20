package com.edu.dto;


import com.edu.entities.AttributeOption;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AttributeOptionDTO {

    private int id;
    private int attributeId; // ID của thuộc tính liên kết
    private String value;
    private String img;

    // Constructor từ thực thể (Entity) để chuyển đổi dễ dàng
    public static AttributeOptionDTO fromEntity(AttributeOption attributeOption) {
        if (attributeOption == null) {
            return null;
        }
        AttributeOptionDTO dto = new AttributeOptionDTO();
        dto.setId(attributeOption.getId());
        dto.setAttributeId(attributeOption.getAttributes() != null ? attributeOption.getAttributes().getId() : 0);
        dto.setValue(attributeOption.getValue());
        dto.setImg(attributeOption.getImg());
        return dto;
    }
}


