package com.uga.bookStore.model;

import java.util.List;
import lombok.Data;
@Data
public class OrderHistory {
		private Integer orderId;
	    
	    private Integer userId;
	    
	    private String orderDate;
	    private float totalAmount;
	    private int addressId;
	    private int paymentId;
	    private String orderStatus;
	    private boolean confirmationEmailSent;
	    private int confirmationNumber;
	    private String promoCode;

	    
	    private List<OrderHistoryItems> orderHistoryItems;
}
