package com.uga.bookStore.service;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.uga.bookStore.Exceptions.PromoCodeAlreadyExistsException;
import com.uga.bookStore.Exceptions.PromoNotFoundException;
import com.uga.bookStore.constants.AppConstants;
import com.uga.bookStore.model.Books;
import com.uga.bookStore.model.BookInventory;
import com.uga.bookStore.model.BooksFeaturedTopsellers;
import com.uga.bookStore.model.BooksReq;
import com.uga.bookStore.model.Promotions;
import com.uga.bookStore.model.Response;
import com.uga.bookStore.model.User;
import com.uga.bookStore.repo.BookInventoryRepo;
import com.uga.bookStore.repo.BookRepo;
import com.uga.bookStore.repo.BooksFeaturedTopsellersRepo;
import com.uga.bookStore.repo.PromotionsRepo;
import com.uga.bookStore.repo.UserRepo;
import com.uga.bookStore.response.GenericResponse_bookStore;
import com.uga.bookStore.security.JwtUtils;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class AdminService implements AdminServiceImpl {
	@Autowired
	private UserRepo userDAO;

	@Autowired
	private PromotionsRepo promoDAO;

	//@Autowired
	//private EmailSenderService emailSenderService;
	@Autowired
	BookRepo bookRepo;
	
	@Autowired
	BooksFeaturedTopsellersRepo books_featured_topsellers_Repo;
	
	@Autowired
	BookInventoryRepo bookInventoryRepo;
	
	GenericResponse_bookStore<Books> genericResponse;
	
	@Autowired
	JwtUtils jwtUtils;
	public AdminService(GenericResponse_bookStore<Books> genericResponse) {
		this.genericResponse=genericResponse;
	}
	@Autowired
	private EmailService emailService;


	@Override
	public Response addPromo(Promotions newPromo, HttpServletRequest request, Map<String, Object> model)
			throws PromoCodeAlreadyExistsException {
		Response response = new Response();
		Promotions promoData = promoDAO.findByPromoCode(newPromo.getPromoCode());

		if (promoData == null) {
			model.put("promoCode", newPromo.getPromoCode());
			model.put("promoValue", newPromo.getPercentage());

			List<User> userList = new ArrayList<User>();
			userDAO.findAll().forEach(user -> userList.add(user));

			for (User user : userList) {
				if (user.isSubscribeToPromo() == true) {
					model.put("name", user.getFirstName() + " " + user.getLastName());
					response = emailService.sendPromoDetailsEmail(user.getEmail(),
						AppConstants.PROMO_CODE_EMAIL_SUBJECT, model);
				}
			}
			if (response.getStatus() == Boolean.TRUE) {
				promoDAO.save(newPromo);
			}

		} else {
			throw new PromoCodeAlreadyExistsException("Promotion Code already exists");
		}

		return response;
	}
	@Override
	public GenericResponse_bookStore<Books> addBook(BooksReq books) {
		// TODO Auto-generated method stub
		Books add_book = new Books();
		add_book.setISBN(books.getISBN());
		add_book.setTitle(books.getTitle());
		add_book.setAuthor(books.getAuthor());
		add_book.setCategory(books.getCategory());
		add_book.setPublisher(books.getPublisher());
		add_book.setPublication_Year(books.getPublication_Year());
		add_book.setEdition(books.getEdition());
		add_book.setSelling_Price(books.getSelling_Price());
		add_book.setBuying_Price(books.getBuying_Price());
		add_book.setQuantity(books.getQuantity());
		add_book.setDescription(books.getDescription());
		String file = books.getImage_data();
        
  
        add_book.setImage_data(file);
        bookRepo.save(add_book);
        BooksFeaturedTopsellers isfilter= new BooksFeaturedTopsellers();
        isfilter.setFeatured(books.getIsFeatured());
        isfilter.setNewBook(books.getIsNewBook());
        isfilter.setTopseller(books.getIsTopseller());
        isfilter.setBookId(add_book.getBookId());
        books_featured_topsellers_Repo.save(isfilter);

        BookInventory bookInventory=new BookInventory();
        bookInventory.setBookId(add_book.getBookId());
        bookInventory.setPrice(add_book.getSelling_Price());
        bookInventory.setQuantity(books.getQuantity());
        bookInventory.setStatus("Active");
        bookInventoryRepo.save(bookInventory);
        
        
        genericResponse.setDetails((Books) add_book);
        genericResponse.setStatus("success");
        genericResponse.setResponseCode(HttpStatus.CREATED.toString());
        genericResponse.setDescription("Created Book");
		return genericResponse;
	}
	@Override
	public List<Promotions> getAllPromos() throws PromoNotFoundException {
		List<Promotions> promos = new ArrayList<>();
		promos = promoDAO.findAll();

		if (promos.isEmpty()) {
			throw new PromoNotFoundException("No Promos available");
		}
		return promos;
	}
	@Override
	public Response editBookPrice(Books book) {				
		Response response = new Response();
		try {
			Books bookToEdit=bookRepo.findByBookId(book.getBookId());
			bookToEdit.setSelling_Price(book.getSelling_Price());
			BookInventory bookInventory=bookInventoryRepo.findByBookId(book.getBookId());
			bookInventory.setPrice(book.getSelling_Price());
			bookRepo.save(bookToEdit);
			bookInventoryRepo.save(bookInventory);
			response.setMessage("Book Price was updated");
			response.setStatus(true);
		}catch(Exception e) {
			response.setMessage("Failed to update");
			response.setStatus(false);
		}
		return response;
	}
}
