package com.uga.bookStore.model;

import lombok.Data;
@Data
public class OrderHistoryItems {
	private int orderItemId;
	    
    private int bookId;
	    
    private int quantity;
    private double price;
    
    private String title;
    private String image;
    
    private String author;
    
    
}
