package com.uga.bookStore.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "order_items")
public class OrderItems {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_Item_Id")
    private int orderItemId;
    
    @Column(name = "book_Id") // Corrected: Specify the column name for bookId
    private int bookId;
    
    private int quantity;
    private double price;

    @ManyToOne(targetEntity = Orders.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "order_Id")
    private Orders orders;

    @JsonBackReference
    public Orders getOrders() {
        return orders;
    }

    public void setOrders(Orders orders) {
        this.orders = orders;
    }
}