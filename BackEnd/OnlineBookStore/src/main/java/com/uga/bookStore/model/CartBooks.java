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
@Table(name="cart_books")
public class CartBooks {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="cart_Book_Id")
	private int cartBookID;
	
	private int cartId;
	private int bookId;
	private int quantity;
	private double price;
	private int userId;
	
	public CartBooks (int cartId, int bookId, int quantity, double price, int userId) {
		this.cartId = cartId;
		this.bookId = bookId;
		this.quantity = quantity;
		this.userId = userId;
	}

	public CartBooks() {
		// TODO Auto-generated constructor stub
	}
}
