package com.uga.bookStore.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uga.bookStore.model.Orders;
import com.uga.bookStore.model.User;

@Repository
public interface OrdersRepo extends JpaRepository<Orders, Integer> {
	
	 

	List<Orders> findAllByUserId(Integer userId);

	Orders findByOrderId(Integer orderId);
}
