package com.uga.bookStore.model;

import lombok.Data;

@Data
public class CartBookDetails {
	private int cartBookID;
	
	private int cartId;
	private int bookId;
	private int quantity;
	private double price;
	private int userId; 
	private String image;
	private String name;
	private String author;
}
