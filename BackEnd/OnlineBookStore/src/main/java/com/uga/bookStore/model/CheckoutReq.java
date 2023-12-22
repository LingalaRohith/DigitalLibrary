package com.uga.bookStore.model;

import java.util.List;

import lombok.Data;

@Data
public class CheckoutReq {
	private int userId;
	private int paymentCardId;
	private int shippingAddressId;
	private String promoCode;
	
}
