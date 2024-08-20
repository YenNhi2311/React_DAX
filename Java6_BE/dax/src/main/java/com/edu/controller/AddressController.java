package com.edu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edu.entities.AddressEntity;
import com.edu.services.AddressService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/address")
public class AddressController {
    
     @Autowired
    private AddressService addressService;

    // Get all addresss
    @GetMapping
    public List<AddressEntity> getAllAddress() {
        return addressService.getAllAddresses();
    }
}
