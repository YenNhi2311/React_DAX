package com.edu.services;

import com.edu.entities.AddressEntity;
import com.edu.jpa.AddressJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressService {

    @Autowired
    private AddressJPA addressRepository;

    public List<AddressEntity> getAllAddresses() {
        return addressRepository.findAll();
    }

    public AddressEntity getAddressById(int id) {
        return addressRepository.findById(id).orElse(null);
    }

    public AddressEntity saveAddress(AddressEntity address) {
        return addressRepository.save(address);
    }

    public void deleteAddress(int id) {
        addressRepository.deleteById(id);
    }
}
