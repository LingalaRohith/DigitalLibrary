package com.uga.bookStore.service;

import java.util.List;
import java.util.*;
import java.util.function.Predicate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mysql.cj.Session;
import com.uga.bookStore.model.Books;
import com.uga.bookStore.model.BooksFeaturedTopsellers;
import com.uga.bookStore.model.FilterBooksReq;
import com.uga.bookStore.model.GetBooksReq;
import com.uga.bookStore.repo.BookRepo;
import com.uga.bookStore.repo.BooksFeaturedTopsellersRepo;
import com.uga.bookStore.response.Filter_Response;
import com.uga.bookStore.response.GenericResponse_bookStore;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import java.util.stream.Collectors;
@Service
public class FilterBooksService {

	@Autowired
	BookRepo bookRepo;
	@PersistenceContext
	private EntityManager entityManager;
	
	public Filter_Response filterBook(FilterBooksReq filterBooksreq) {
		Predicate<Books> predicate = null ;
		boolean flag=false;
		
		if (!(filterBooksreq.getPrice()==0)) {
			predicate = (b ->  b.getSelling_Price()<=(filterBooksreq.getPrice()));
		}
		if (filterBooksreq.isCategory_motivation() && !filterBooksreq.isCategory_suspense() && !filterBooksreq.isCategory_drama() && !filterBooksreq.isCategory_fantasy()) {
			predicate = predicate.and(b -> b.getCategory().contains("Motivation")); 
			flag=true;
		}
		if(filterBooksreq.isCategory_suspense() && !filterBooksreq.isCategory_motivation() && !filterBooksreq.isCategory_drama() && !filterBooksreq.isCategory_fantasy()) {
			predicate = predicate.and(b -> b.getCategory().contains("Suspense"));
			flag=true;
		}
		if(filterBooksreq.isCategory_drama() && !filterBooksreq.isCategory_motivation() && !filterBooksreq.isCategory_fantasy() && !filterBooksreq.isCategory_suspense()) {
			predicate = predicate.and(b -> b.getCategory().contains("Drama"));
			flag=true;
		}
		if(filterBooksreq.isCategory_fantasy() && !filterBooksreq.isCategory_motivation() && !filterBooksreq.isCategory_drama() && !filterBooksreq.isCategory_suspense()) {
			predicate = predicate.and(b -> b.getCategory().contains("Fantasy"));
			flag=true;
		}
		
		if(!(filterBooksreq.getAuthor().isEmpty())) {
			if(predicate != null) {
			predicate = predicate.and(b -> b.getAuthor().contains(filterBooksreq.getAuthor()));
			}else {
				predicate = (b -> b.getAuthor().contains(filterBooksreq.getAuthor()));
			}
			flag=true;
		}
		if(!(filterBooksreq.getBookName().isEmpty())) {
			if(predicate != null) {
			predicate = predicate.and(b -> b.getTitle().contains(filterBooksreq.getBookName()));
			}else {
				predicate = (b -> b.getTitle().contains(filterBooksreq.getBookName()));
			}
			flag=true;
		}
		if(!(filterBooksreq.getPublisher().isEmpty())) {
			if(predicate != null) {
			predicate = predicate.and(b -> b.getPublisher().contains(filterBooksreq.getPublisher()));
			}else {
				predicate = (b -> b.getPublisher().contains(filterBooksreq.getPublisher()));
			}
			flag=true;
		}
		if(!flag) {
			
			predicate = (b -> (b.getCategory().contains("Fantasy")) || (b.getCategory().contains("Drama")) || (b.getCategory().contains("Motivation")) 
					|| (b.getCategory().contains("Suspense")));
		
		
	}
		System.out.println(predicate);
		List<Books> books=bookRepo.findAll().stream()
		
		.filter(predicate)
		
		.collect(Collectors.toList());

		List<Books> filtered_books = new ArrayList<Books>();
		for(Books b:books) {
			Books book=new Books();
			book.setBookId(b.getBookId());
			book.setISBN(b.getISBN());
			book.setTitle(b.getTitle());
			book.setCategory(b.getCategory());
			book.setAuthor(b.getAuthor());
			book.setPublisher(b.getPublisher());
			book.setPublication_Year(b.getPublication_Year());
			book.setEdition(b.getEdition());
			book.setBuying_Price(b.getBuying_Price());
			book.setSelling_Price(b.getSelling_Price());
			book.setQuantity(0);
			book.setDescription(b.getDescription());
			book.setImage_data(b.getImage_data());
			filtered_books.add(book);
		}
		
		Filter_Response genericResponse_bookStore=new Filter_Response();
		genericResponse_bookStore.setResponseCode("200");
		genericResponse_bookStore.setDescription("filtered results");
		genericResponse_bookStore.setStatus("success");
		genericResponse_bookStore.setDetails(filtered_books);
        return genericResponse_bookStore;

    
		
	}


	@Autowired
	private BooksFeaturedTopsellersRepo booksFeaturedTopSellersRepo;

	public Filter_Response getBooks(GetBooksReq getBooksReq) {
	    List<Books> result = new ArrayList<>();
	    boolean flag = false;

	    if (getBooksReq.isFeaturedBooks()) {
	        List<BooksFeaturedTopsellers> featuredBooks = booksFeaturedTopSellersRepo.findByFeatured();
	        result = featuredBooks.stream()
	                .map(booksFeatured -> bookRepo.findById(booksFeatured.getBookId()))
	                .filter(Optional::isPresent)
	                .map(Optional::get)
	                .collect(Collectors.toList());
	        flag = true;
	    } else if (getBooksReq.isNewBooks()) {
	        List<BooksFeaturedTopsellers> newBooks = booksFeaturedTopSellersRepo.findByNewBook(true);
	        result = newBooks.stream()
	                .map(booksFeatured -> bookRepo.findById(booksFeatured.getBookId()))
	                .filter(Optional::isPresent)
	                .map(Optional::get)
	                .collect(Collectors.toList());
	        flag = true;
	    } else if (getBooksReq.isTopBooks()) {
	        List<BooksFeaturedTopsellers> topSellerBooks = booksFeaturedTopSellersRepo.findByTopseller(true);
	        result = topSellerBooks.stream()
	                .map(booksFeatured -> bookRepo.findById(booksFeatured.getBookId()))
	                .filter(Optional::isPresent)
	                .map(Optional::get)
	                .collect(Collectors.toList());
	        flag = true;
	    }

	    if (!flag) {
	        result = bookRepo.findAll();
	    }

	    List<Books> filtered_books = new ArrayList<>();

	    for (Books b : result) {
	        Books book = new Books();
	        book.setBookId(b.getBookId());
	        book.setISBN(b.getISBN());
	        book.setTitle(b.getTitle());
	        book.setCategory(b.getCategory());
	        book.setAuthor(b.getAuthor());
	        book.setPublisher(b.getPublisher());
	        book.setPublication_Year(b.getPublication_Year());
	        book.setEdition(b.getEdition());
	        book.setBuying_Price(b.getBuying_Price());
	        book.setSelling_Price(b.getSelling_Price());
	        book.setQuantity(0);
	        book.setDescription(b.getDescription());
	        book.setImage_data(b.getImage_data());
	        filtered_books.add(book);
	    }

	    Filter_Response filterResponse = new Filter_Response();
	    filterResponse.setResponseCode("200");
	    filterResponse.setDescription("filtered results");
	    filterResponse.setStatus("success");
	    filterResponse.setDetails(filtered_books);

	    return filterResponse;
	}


}
