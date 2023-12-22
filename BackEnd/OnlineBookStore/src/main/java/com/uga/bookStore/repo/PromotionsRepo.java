package com.uga.bookStore.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.uga.bookStore.model.Promotions;


public interface PromotionsRepo extends JpaRepository<Promotions, Integer> {
	
	    Promotions findByPromoCode(String promoCode);

}
	
