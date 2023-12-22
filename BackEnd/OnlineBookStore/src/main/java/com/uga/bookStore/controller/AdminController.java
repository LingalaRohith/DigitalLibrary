package com.uga.bookStore.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.uga.bookStore.Exceptions.PromoCodeAlreadyExistsException;
import com.uga.bookStore.Exceptions.PromoNotFoundException;
import com.uga.bookStore.model.Books;
import com.uga.bookStore.model.BooksReq;
import com.uga.bookStore.model.Promotions;
import com.uga.bookStore.model.Response;
import com.uga.bookStore.repo.BookRepo;
import com.uga.bookStore.response.Filter_Response;
import com.uga.bookStore.response.GenericResponse_bookStore;
import com.uga.bookStore.security.JwtUtils;
import com.uga.bookStore.service.AdminServiceImpl;


import jakarta.servlet.http.HttpServletRequest;


@RestController
@RequestMapping("/admin")
@CrossOrigin(origins= "*")
public class AdminController{
	@Autowired
	public AdminServiceImpl adminServiceImpl;
	
	
	public AdminController(AdminServiceImpl adminServiceImpl) {
		this.adminServiceImpl = adminServiceImpl;
	}
	
	
	@PostMapping("/addBook")
	public GenericResponse_bookStore<Books> addCourse(@RequestBody BooksReq booksReq) {
		GenericResponse_bookStore<Books> createdBook = adminServiceImpl.addBook(booksReq);
        return createdBook;
	}
	
	@PostMapping("/editBook")
	public Response editBookPrice(@RequestBody Books book) {
		Response response=adminServiceImpl.editBookPrice(book);
        return response;
	}
	
	
	@PostMapping("/addPromo")
	public Response addPromo(@RequestBody Promotions newPromo, HttpServletRequest request, Map<String, Object> model)
			throws PromoCodeAlreadyExistsException {
		Response response = new Response();
		response = adminServiceImpl.addPromo(newPromo, request, model);
		return response;
	}

	
	@GetMapping("/getAllPromos")
	public ResponseEntity<?> getAllPromos() throws PromoNotFoundException {
		List<Promotions> promos = adminServiceImpl.getAllPromos();
		return new ResponseEntity<>(promos, HttpStatus.OK);
	}
	
	
	
	//@GetMapping("/banUser")
	//public Response banUser(@RequestParam String userEmail) throws UserNotFoundException {
		//return adminService.banUser(userEmail);
	//}

	//@GetMapping("/unbanUser")
	//public Response unbanUser(@RequestParam String userEmail) throws UserNotFoundException {
		//return adminService.unbanUser(userEmail);
	//}
	
}
