package com.edu.jpa;

<<<<<<< HEAD
<<<<<<< HEAD
import org.springframework.data.jpa.repository.JpaRepository;

import com.edu.entities.PaymentEntity;

public interface PaymentJPA extends JpaRepository<PaymentEntity, Integer> {
    PaymentEntity findByPaymentType(boolean paymentType);
 }
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
import com.edu.entities.PaymentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentJPA extends JpaRepository<PaymentEntity, Integer> {
}
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
