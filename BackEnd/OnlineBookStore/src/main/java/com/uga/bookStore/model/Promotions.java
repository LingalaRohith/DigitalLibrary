package com.uga.bookStore.model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;


@Data
@Entity
@Table(name = "promotions")
public class Promotions {

	
	
	    public Promotions() {
	        super();
	    }

	    @Id
	    @Column(name="Promo_Code")
	    private String promoCode;

	    public Promotions(String promoCode, float percentage, Date startDate, Date expiryDate) {
	        super();
	        this.promoCode = promoCode;
	        this.percentage = percentage;
	        this.startDate = startDate;
	        this.expiryDate = expiryDate;
	    }

	   @Column(name="percentage")
	    private float percentage;
	   @Column(name="start_date")
	    private Date startDate;
	    @Column(name="expiry_date")
	    private Date expiryDate;

	
}
