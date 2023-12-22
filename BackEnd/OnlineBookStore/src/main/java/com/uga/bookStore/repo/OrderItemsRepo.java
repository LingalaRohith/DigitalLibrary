package com.uga.bookStore.repo;

import com.uga.bookStore.model.OrderItems;
import com.uga.bookStore.model.Orders;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemsRepo extends JpaRepository<OrderItems, Integer> {

	List<OrderItems> findAllByOrders(Orders order);
}
