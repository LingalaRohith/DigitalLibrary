package com.uga.bookStore.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.uga.bookStore.model.BookInventory;


public interface BookInventoryRepo extends JpaRepository<BookInventory, Integer>  {

	BookInventory findByBookId(int bookId);

}
