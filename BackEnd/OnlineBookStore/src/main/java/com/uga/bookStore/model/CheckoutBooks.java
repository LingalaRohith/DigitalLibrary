package com.uga.bookStore.model;

import java.sql.Date;

import lombok.Data;

@Data

public class CheckoutBooks {
	private int bookId;  
 	private String ISBN;
 	private String Title;
 	private String Author;
 	private String Category;
 	private String Publisher;
 	private Date Publication_Year;
 	private String Edition;
 	private Double Buying_Price;
 	private Double Selling_Price;
 	private int Quantity;
 	private String Description;
 	private String image_data;
 	private double total_book;
}
