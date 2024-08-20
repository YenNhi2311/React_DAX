package com.edu.jpa;

import com.edu.entities.AddressEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressJPA extends JpaRepository<AddressEntity, Integer> {
}