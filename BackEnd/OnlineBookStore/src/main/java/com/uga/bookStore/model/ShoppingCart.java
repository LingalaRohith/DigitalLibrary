package com.uga.bookStore.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="shopping_cart")
public class ShoppingCart {
	public ShoppingCart() {
		
	}
	public ShoppingCart(Integer userId) {
		this.userId=userId;
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="cart_Id")
	private int cartId;
	
	private Integer userId;
	
}
