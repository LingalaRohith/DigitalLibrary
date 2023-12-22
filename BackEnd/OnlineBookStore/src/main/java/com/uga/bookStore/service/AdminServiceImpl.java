package com.uga.bookStore.service;

import java.util.List;
import java.util.Map;

import com.uga.bookStore.Exceptions.PromoCodeAlreadyExistsException;
import com.uga.bookStore.Exceptions.PromoNotFoundException;
import com.uga.bookStore.model.Books;
import com.uga.bookStore.model.BooksReq;
import com.uga.bookStore.model.Promotions;
import com.uga.bookStore.model.Response;
import com.uga.bookStore.response.GenericResponse_bookStore;

import jakarta.servlet.http.HttpServletRequest;


public interface AdminServiceImpl {

	Response addPromo(Promotions newPromo, HttpServletRequest request, Map<String, Object> model) throws PromoCodeAlreadyExistsException;

	List<Promotions> getAllPromos() throws PromoNotFoundException;

	GenericResponse_bookStore<Books> addBook(BooksReq books);
	
	Response editBookPrice(Books books); 
}
