package com.uga.bookStore.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.uga.bookStore.model.CartBooks;
import com.uga.bookStore.model.ShoppingCart;


public interface CartBooksRepo  extends JpaRepository<CartBooks, Integer>{

	CartBooks findByCartIdAndBookId(int cartId, int bookId);

    List<CartBooks> findByCartId(int cartId);
    CartBooks findByBookId(int bookId);
    void deleteByUserId(int userId);
	List<CartBooks> findAllByUserId(Integer userId);
}
