package com.uga.bookStore.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data 
@Entity
@Table(name="book_inventory")
public class BookInventory {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int inventoryId;
	
	private int bookId;
	
	private int quantity;
	
	private String status;
	
	private double price;
	
	public BookInventory() {
		
	}
	public BookInventory(int bookId, int quantity, String status, double price) {
		this.bookId = bookId;
		this.quantity = quantity;
		this.status = status;
		this.price = price;
		
	}
}
