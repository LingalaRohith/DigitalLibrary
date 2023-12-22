package com.uga.bookStore.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.Valid;
import lombok.Data;

@Entity
@Data
@Table(name = "orders")
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_Id")
    private Integer orderId;
    
    @Column(name = "user_Id") // Corrected: Specify the column name for userId
    private Integer userId;
    
    private String orderDate;
    private float totalAmount;
    private int addressId;
    private int paymentId;
    private String orderStatus;
    private boolean confirmationEmailSent;
    private int confirmationNumber;
    private String promoCode;

    @OneToMany(mappedBy = "orders", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonManagedReference
    @Valid
    private List<OrderItems> orderItems;
}