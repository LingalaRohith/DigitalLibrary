package com.uga.bookStore.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.uga.bookStore.model.ShoppingCart;

public interface ShoppingCartRepo extends JpaRepository<ShoppingCart, Integer>{

	ShoppingCart findByUserId(Integer userId);
	
}