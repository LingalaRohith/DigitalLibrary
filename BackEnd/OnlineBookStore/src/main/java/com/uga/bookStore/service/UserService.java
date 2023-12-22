package com.uga.bookStore.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.uga.bookStore.Exceptions.AccountAlreadyExistsException;
import com.uga.bookStore.Exceptions.EditProfileException;
import com.uga.bookStore.Exceptions.InvalidOTPException;
import com.uga.bookStore.Exceptions.PaymentCardLimitException;
import com.uga.bookStore.constants.AppConstants;
import com.uga.bookStore.model.AccountStatusEnum;
import com.uga.bookStore.model.AccountTypeEnum;
import com.uga.bookStore.model.BookInventory;
import com.uga.bookStore.model.Books;
import com.uga.bookStore.model.BooksReq;
import com.uga.bookStore.model.CartBookDetails;
import com.uga.bookStore.model.CartBooks;
import com.uga.bookStore.model.Login;
import com.uga.bookStore.model.LoginRequest;
import com.uga.bookStore.model.OrderHistory;
import com.uga.bookStore.model.OrderHistoryItems;
import com.uga.bookStore.model.OrderItems;
import com.uga.bookStore.model.Orders;
import com.uga.bookStore.model.PaymentCard;
import com.uga.bookStore.model.Response;
import com.uga.bookStore.model.ShippingAddress;
import com.uga.bookStore.model.ShoppingCart;
import com.uga.bookStore.model.User;
import com.uga.bookStore.model.UserTypeEnum;
import com.uga.bookStore.repo.BookInventoryRepo;
import com.uga.bookStore.repo.BookRepo;
import com.uga.bookStore.repo.CartBooksRepo;
import com.uga.bookStore.repo.OrderItemsRepo;
import com.uga.bookStore.repo.OrdersRepo;
import com.uga.bookStore.repo.PaymentRepo;
import com.uga.bookStore.repo.ShippingAddressRepo;
import com.uga.bookStore.repo.ShoppingCartRepo;
import com.uga.bookStore.repo.UserRepo;
import com.uga.bookStore.security.JwtUtils;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Data;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.TreeMap;

@Service

public class UserService implements UserServiceImpl {
	private final UserRepo userRepo;
	@Autowired
	private EmailService emailService;

	@Autowired
	private final PaymentRepo paymentRepo;
	@Autowired
	private final ShippingAddressRepo shippingAddressRepo;
	@Autowired
	private final BookRepo bookRepo;

	@Autowired
	private final ShoppingCartRepo shoppingCartRepo;

	@Autowired
	private final BookInventoryRepo bookInventoryRepo;

	@Autowired
	private final CartBooksRepo cartBooksRepo;
	@Autowired
	private final OrdersRepo ordersRepo;
	@Autowired
	private final OrderItemsRepo orderItemsRepo;

	private Set<String> invalidatedTokens = new HashSet<>();

	@Autowired
	public UserService(UserRepo userRepo, PaymentRepo paymentRepo, ShippingAddressRepo shippingAddressRepo,
			BookRepo bookRepo, ShoppingCartRepo shoppingCartRepo, CartBooksRepo cartBooksRepo, OrdersRepo ordersRepo,
			BookInventoryRepo bookInventoryRepo, OrderItemsRepo orderItemsRepo) {
		this.userRepo = userRepo;
		this.paymentRepo = paymentRepo;
		this.shippingAddressRepo = shippingAddressRepo;
		this.bookRepo = bookRepo;
		this.shoppingCartRepo = shoppingCartRepo;
		this.cartBooksRepo = cartBooksRepo;
		this.ordersRepo = ordersRepo;
		this.bookInventoryRepo = bookInventoryRepo;
		this.orderItemsRepo = orderItemsRepo;
	}

	@Autowired
	JwtUtils jwtUtils;

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public List<User> getAllUsers() {
		return userRepo.findAll();
	}

	@Override
	public Optional<User> getUserById(Long id) {
		return userRepo.findByUserId(id);
	}

	@Override
	public User updateUser(Long id, User user, HttpServletRequest request) {
		Optional<User> existingUser = userRepo.findByUserId(id);
		String token = request.getHeader("Authorization").replace("Bearer ", "");
		User userDetail = userRepo.findByEmail(jwtUtils.getUserNameFromJwtToken(token)).get();

		if (existingUser.isPresent()) {
			User updatedUser = existingUser.get();
			updatedUser.setFirstName(user.getFirstName());
			updatedUser.setLastName(user.getLastName());
			updatedUser.setEmail(user.getEmail());
			return userRepo.save(updatedUser);
		}
		return null; // Or throw an exception if user with given id is not found
	}

	@Override
	public Response registerUser(User userRegister, HttpServletRequest request, Map<String, Object> model)
			throws PaymentCardLimitException, AccountAlreadyExistsException {
		Response response = new Response();
		Optional<User> accountData = userRepo.findByEmail(userRegister.getEmail());
		if (accountData.isEmpty()) {
			int min = 10000;
			int max = 99999;
			int OtpCode = (int) (Math.random() * (max - min + 1) + max);
			userRegister.setOtpCode(OtpCode);
			userRegister.setAccountStatusId(AccountStatusEnum.INACTIVE.getType());
			userRegister.setAccountType(UserTypeEnum.CUSTOMER);
			List<PaymentCard> paymentCards = userRegister.getPaymentCard();
			List<ShippingAddress> shippingAddress = userRegister.getShippingAddress();

			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
			String encryptedPassword = encoder.encode(userRegister.getPassword());
			userRegister.setPassword(encryptedPassword);
			String url = getSiteURL(request);
			String verifyURL = "http://localhost:4200/";
			model.put("name", userRegister.getFirstName() + "  " + userRegister.getLastName());
			model.put("URL", verifyURL);
			model.put("verificationCode", userRegister.getOtpCode());
			if (paymentCards.size() > 3) {
				response.setMessage("Users can have only 3 Payment Cards. Please delete a card to add a new card");
				response.setStatus(Boolean.FALSE);
				return response;
			} else {
				response = emailService.sendEmailVerification(userRegister.getEmail(),
						"Online BookStore email address confirmation instructions", model);

				if (response.getStatus() == Boolean.TRUE) {
					response.setOtp(userRegister.getOtpCode());

					userRepo.save(userRegister);
//					  if (userRegister.getPaymentCards() != null && !userRegister.getPaymentCards().isEmpty()) {
//					  paymentRepo.deletePaymentCard(userRegister.getUserId());
//						  paymentRepo.resetPaymentAutoIncrement();
//				        }
//				        
//				        if (userRegister.getShippingAddress() != null && !userRegister.getShippingAddress().isEmpty()) {
//				            shippingAddressRepo.deletShippingAddress(userRegister.getUserId());
//				            shippingAddressRepo.resetShippingAutoIncrement();	            
//		            
//				        }
				}
			}
		} else {
			response.setMessage("User email already exists in the system");
			response.setStatus(Boolean.FALSE);
		}
		return response;
	}

	@Override
	public ResponseEntity<?> signin(LoginRequest loginRequest) {
		return null;
	}

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user = userRepo.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + email));

		return user;
	}

	private String getSiteURL(HttpServletRequest request) {
		String url = request.getRequestURL().toString();
		return url.replace(request.getServletPath(), "");
	}

	@Override
	public Response forgotPassword(User user, HttpServletRequest request, Map<String, Object> model) {
		Response response = new Response();
		Optional<User> userObject = userRepo.findByEmail(user.getEmail());
		int min = 10000;
		int max = 99999;
		int OtpCode = (int) (Math.random() * (max - min + 1) + max);
		userObject.get().setOtpCode(OtpCode);
		String url = getSiteURL(request);
		String verifyURL = "http://localhost:4200/create-new-password";
		model.put("name", userObject.get().getFirstName() + " " + userObject.get().getLastName());
		model.put("URL", verifyURL);
		model.put("OTP", OtpCode);
		response = emailService.sendEmailOTP(userObject.get().getEmail(),
				"Password Reset: Email Confirmation Instructions", model);
		response.setOtp(OtpCode);
		if (response.getStatus() == Boolean.TRUE) {
			userRepo.save(userObject.get());
		}
		return response;
	}

	@Override
	public Response verifyForgotPasswordOTP(User user, HttpServletRequest request) throws InvalidOTPException {
		Optional<User> userObject = userRepo.findByEmail(user.getEmail());
		Response response = new Response();
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		if (userObject != null) {
			user.setPassword(encoder.encode(user.getPassword()));
			userRepo.updatePasswordByEmail(user.getEmail(), user.getPassword());
			response.setMessage("Password reset sucessful");
			response.setStatus(Boolean.TRUE);
		} else {
			throw new InvalidOTPException("OTP is invalid");
		}
		return response;
	}

	@Transactional
	@Override
	public ResponseEntity<?> deletePaymentCards(PaymentCard paymentCard, HttpServletRequest request) {
		String token = request.getHeader("Authorization").replace("Bearer ", "");
		User user = userRepo.findByEmail(jwtUtils.getUserNameFromJwtToken(token)).get();
		PaymentCard cardToDelete = paymentRepo.findByPaymentId(paymentCard.getPaymentId());
		user.getPaymentCards().remove(cardToDelete);
		userRepo.save(user);
		paymentRepo.delete(cardToDelete);
		;
		return new ResponseEntity<>("Card deleted successfully", HttpStatus.OK);
	}

	@Transactional
	@Override
	public ResponseEntity<?> deleteShippingAddress(ShippingAddress shippingAddress, HttpServletRequest request) {
		String token = request.getHeader("Authorization").replace("Bearer ", "");
		User user = userRepo.findByEmail(jwtUtils.getUserNameFromJwtToken(token)).get();
		ShippingAddress addressToDelete = shippingAddressRepo.findByAddressId(shippingAddress.getAddressId());
		user.getShippingAddresses().remove(addressToDelete);
		userRepo.save(user);
		shippingAddressRepo.delete(addressToDelete);
		;
		return new ResponseEntity<>("Address deleted successfully", HttpStatus.OK);
	}

	@Override
	public ResponseEntity<?> addPaymentCard(List<PaymentCard> paymentCards, HttpServletRequest request)
			throws PaymentCardLimitException {
		String token = request.getHeader("Authorization").replace("Bearer ", "");
		User user = userRepo.findByEmail(jwtUtils.getUserNameFromJwtToken(token)).get();
		List<PaymentCard> existingCards = paymentRepo.findAllByUser(user);
		if (existingCards.size() == 3) {
			throw new PaymentCardLimitException(
					"There are already three Payments cards in the system. To add a new card, delete an existing card");
		} else if (paymentCards.size() + existingCards.size() > 3) {
			throw new PaymentCardLimitException(
					"There are already three Payments cards in the system. To add a new card, delete an existing card");
		} else {
			paymentCards.forEach(card -> {
				card.setUser(user);
				paymentRepo.save(card);
			});
		}
		return new ResponseEntity<>("Card added successfully", HttpStatus.OK);
	}

	@Override
	public ResponseEntity<?> editPaymentCard(PaymentCard updatedPaymentCard, HttpServletRequest request) {
		String token = request.getHeader("Authorization").replace("Bearer ", "");
		User user = userRepo.findByEmail(jwtUtils.getUserNameFromJwtToken(token)).orElse(null);

		if (user == null) {
			return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
		}

		PaymentCard existingCard = paymentRepo.findByPaymentId(updatedPaymentCard.getPaymentId());

		if (existingCard == null) {
			return new ResponseEntity<>("Payment card not found", HttpStatus.NOT_FOUND);
		}

		existingCard.setCardType(updatedPaymentCard.getCardType());
		existingCard.setCardHolder(updatedPaymentCard.getCardHolder());
		existingCard.setCardNumber(updatedPaymentCard.getCardNumber());
		existingCard.setExpDate(updatedPaymentCard.getExpDate());
		paymentRepo.save(existingCard);

		return new ResponseEntity<>("Payment card updated successfully", HttpStatus.OK);
	}

	@Override
	public Response editProfile(User user, HttpServletRequest request, Map<String, Object> model)
			throws EditProfileException {
		Response response = new Response();
		try {
			String token = request.getHeader("Authorization").replace("Bearer ", "");
			Optional<User> oldUser = userRepo.findByEmail(jwtUtils.getUserNameFromJwtToken(token));
			User oldUserToUpdate = oldUser.get();
			entityManager.detach(oldUserToUpdate);
			oldUserToUpdate.setFirstName(user.getFirstName());
			oldUserToUpdate.setLastName(user.getLastName());
			if (user.getPassword() != null) {
				BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
				String encryptedPassword = encoder.encode(user.getPassword());
				oldUserToUpdate.setPassword(encryptedPassword);
			}
			oldUserToUpdate.setMobileNumber(user.getMobileNumber());
			oldUserToUpdate.setSubscribeToPromo(user.isSubscribeToPromo());

			userRepo.save(oldUserToUpdate);
			response.setMessage("Updated profile");
			response.setStatus(Boolean.TRUE);
			emailService.sendEmailNotification(oldUserToUpdate.getEmail(), AppConstants.UPDATE_PROFILE_EMAIL_SUBJECT,
					AppConstants.UPDATE_PROFILE_EMAIL_BODY);
		} catch (Exception e) {
			throw new EditProfileException("Error updating the profile");
		}
		return response;
	}

	@Override
	public ResponseEntity<?> addShippingAddress(List<ShippingAddress> shippingAddress, HttpServletRequest request) {
		String token = request.getHeader("Authorization").replace("Bearer ", "");
		User user = userRepo.findByEmail(jwtUtils.getUserNameFromJwtToken(token)).get();
		List<PaymentCard> existingCards = paymentRepo.findAllByUser(user);

		shippingAddress.forEach(address -> {
			address.setUser(user);
			shippingAddressRepo.save(address);
		});
		return new ResponseEntity<>("Address added successfully", HttpStatus.OK);
	}

	@Override
	public ResponseEntity<?> editShippingAddress(ShippingAddress updatedShippingAddress, HttpServletRequest request) {
		String token = request.getHeader("Authorization").replace("Bearer ", "");
		User user = userRepo.findByEmail(jwtUtils.getUserNameFromJwtToken(token)).orElse(null);

		if (user == null) {
			return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
		}

		ShippingAddress existingAddress = shippingAddressRepo.findByAddressId(updatedShippingAddress.getAddressId());

		if (existingAddress == null) {
			return new ResponseEntity<>("Shipping address not found", HttpStatus.NOT_FOUND);
		}

		existingAddress.setStreet(updatedShippingAddress.getStreet());
		existingAddress.setCity(updatedShippingAddress.getCity());
		existingAddress.setState(updatedShippingAddress.getState());
		existingAddress.setZipCode(updatedShippingAddress.getZipCode());
		shippingAddressRepo.save(existingAddress);

		return new ResponseEntity<>("Shipping address updated successfully", HttpStatus.OK);
	}

	@Override
	public List<PaymentCard> getPaymentCards(HttpServletRequest request) {
		String token = request.getHeader("Authorization").replace("Bearer ", "");
		User user = userRepo.findByEmail(jwtUtils.getUserNameFromJwtToken(token)).get();
		List<PaymentCard> cards = paymentRepo.findAllByUser(user);
		return cards;
	}

	@Override
	public List<ShippingAddress> getShippingAddresses(HttpServletRequest request) {
		String token = request.getHeader("Authorization").replace("Bearer ", "");
		User user = userRepo.findByEmail(jwtUtils.getUserNameFromJwtToken(token)).get();
		List<ShippingAddress> addresses = shippingAddressRepo.findAllByUser(user);
		return addresses;
	}

	@Override
	public Response verifyUser(User user) {
		Response response = new Response();
		User userObject = userRepo.findByOtpCode(user.getOtpCode());
		if (userObject == null || userObject.getAccountStatusId() == 2) {
			response.setMessage("User email is not present in system or user account is already active");
		} else {
			userObject.setAccountStatusId(2);
			userRepo.save(userObject);
			response.setMessage("Successfully Verified");
			response.setStatus(Boolean.TRUE);
			ShoppingCart shoppingCart = new ShoppingCart(userObject.getUserId());
			shoppingCartRepo.save(shoppingCart);
		}
		return response;
	}

	@Override
	public ResponseEntity<?> addToCart(Books books, HttpServletRequest request) {
		try {
			String token = request.getHeader("Authorization").replace("Bearer ", "");
			User user = userRepo.findByEmail(jwtUtils.getUserNameFromJwtToken(token)).orElse(null);

			BookInventory bookInventory = bookInventoryRepo.findByBookId(books.getBookId());
			if (user == null) {
				return new ResponseEntity<>("User not found", HttpStatus.INTERNAL_SERVER_ERROR);
			}

			Books bookToAdd = bookRepo.findByBookId(books.getBookId());

			if (bookToAdd == null) {
				return new ResponseEntity<>("Book not found", HttpStatus.INTERNAL_SERVER_ERROR);
			}

			ShoppingCart shoppingCart = shoppingCartRepo.findByUserId(user.getUserId());
			int cartId = shoppingCart.getCartId();

			// Check if a row with the given cartId and bookId already exists in cartBooks
			CartBooks existingCartItem = cartBooksRepo.findByCartIdAndBookId(cartId, bookToAdd.getBookId());

			if (existingCartItem != null) {
				if (bookInventory.getQuantity() <= existingCartItem.getQuantity()) {
					return new ResponseEntity<>("Book is out of stock, cannot add book to cart", HttpStatus.INTERNAL_SERVER_ERROR);
				}
				int updatedQuantity = existingCartItem.getQuantity() + 1;
				existingCartItem.setQuantity(updatedQuantity);
				cartBooksRepo.save(existingCartItem);
			} else {
				CartBooks cartBooks = new CartBooks();
				cartBooks.setCartId(cartId);
				cartBooks.setUserId(user.getUserId());
				cartBooks.setPrice(bookToAdd.getSelling_Price());
				cartBooks.setBookId(bookToAdd.getBookId());
				cartBooks.setQuantity(1);
				cartBooksRepo.save(cartBooks);
			}
			return new ResponseEntity<>("Book added to cart", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Failed to add to cart", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Override
	public ResponseEntity<?> deleteFromCart(Books books, HttpServletRequest request) {
		try {
			String token = request.getHeader("Authorization").replace("Bearer ", "");
			User user = userRepo.findByEmail(jwtUtils.getUserNameFromJwtToken(token)).orElse(null);

			if (user == null) {
				return new ResponseEntity<>("User not found", HttpStatus.INTERNAL_SERVER_ERROR);
			}

			Books bookToAdd = bookRepo.findByBookId(books.getBookId());

			if (bookToAdd == null) {
				return new ResponseEntity<>("Book not found", HttpStatus.INTERNAL_SERVER_ERROR);
			}

			ShoppingCart shoppingCart = shoppingCartRepo.findByUserId(user.getUserId());
			int cartId = shoppingCart.getCartId();

			// Check if a row with the given cartId and bookId already exists in cartBooks
			CartBooks existingCartItem = cartBooksRepo.findByCartIdAndBookId(cartId, bookToAdd.getBookId());

			if (existingCartItem != null && existingCartItem.getQuantity() == 1) {
				cartBooksRepo.delete(existingCartItem);
			} else {
				int updatedQuantity = existingCartItem.getQuantity() - 1;
				existingCartItem.setQuantity(updatedQuantity);
				cartBooksRepo.save(existingCartItem);
			}

			return new ResponseEntity<>("Book deleted from cart", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Failed to delete from cart", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Override
	public ResponseEntity<?> updateCart(CartBooks cartBooks, HttpServletRequest request) {
		try {
			String token = request.getHeader("Authorization").replace("Bearer ", "");
			User user = userRepo.findByEmail(jwtUtils.getUserNameFromJwtToken(token)).orElse(null);
			BookInventory bookInventory = bookInventoryRepo.findByBookId(cartBooks.getBookId());

			if (user == null) {
				return new ResponseEntity<>("User not found", HttpStatus.INTERNAL_SERVER_ERROR);
			}

			Books bookToAdd = bookRepo.findByBookId(cartBooks.getBookId());

			if (bookToAdd == null) {
				return new ResponseEntity<>("Book not found", HttpStatus.INTERNAL_SERVER_ERROR);
			}

			ShoppingCart shoppingCart = shoppingCartRepo.findByUserId(user.getUserId());
			int cartId = shoppingCart.getCartId();

			CartBooks existingCartItem = cartBooksRepo.findByCartIdAndBookId(cartId, bookToAdd.getBookId());

			if (bookInventory.getQuantity() < cartBooks.getQuantity()) {
				return new ResponseEntity<>("Book is out of stock, cannot add book to cart", HttpStatus.INTERNAL_SERVER_ERROR);
			}

			existingCartItem.setQuantity(cartBooks.getQuantity());
			cartBooksRepo.save(existingCartItem);

			return new ResponseEntity<>("Book quantity is updated", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Failed to update quantity in cart", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Override
	public List<CartBookDetails> getCartBooks(HttpServletRequest request) {
		String token = request.getHeader("Authorization").replace("Bearer ", "");
		User user = userRepo.findByEmail(jwtUtils.getUserNameFromJwtToken(token)).get();
		List<CartBooks> cartBooks = cartBooksRepo.findAllByUserId(user.getUserId());
		List<CartBookDetails> cartBookDetailsList = new ArrayList<>();

		for (CartBooks cartBook : cartBooks) {
			// Fetch the Book entity for each cartBook to get additional information
			Books book = bookRepo.findByBookId(cartBook.getBookId());

			if (book != null) {
				CartBookDetails cartBookDetails = new CartBookDetails();
				cartBookDetails.setCartBookID(cartBook.getCartBookID());
				cartBookDetails.setCartId(cartBook.getCartId());
				cartBookDetails.setBookId(cartBook.getBookId());
				cartBookDetails.setQuantity(cartBook.getQuantity());
				cartBookDetails.setPrice(cartBook.getPrice());
				cartBookDetails.setUserId(cartBook.getUserId());
				cartBookDetails.setImage(book.getImage_data());
				cartBookDetails.setName(book.getTitle());
				cartBookDetails.setAuthor(book.getAuthor());

				cartBookDetailsList.add(cartBookDetails);
			}
		}

		return cartBookDetailsList;
	}

	public List<Map<String, Object>> getOrderHistory(HttpServletRequest request) {
		String token = request.getHeader("Authorization").replace("Bearer ", "");
		User user = userRepo.findByEmail(jwtUtils.getUserNameFromJwtToken(token)).get();
		List<Orders> orders = ordersRepo.findAllByUserId(user.getUserId());

		// Define a custom comparator to sort dates in descending order
		Comparator<String> dateComparator = (date1, date2) -> {
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy");
			LocalDate localDate1 = LocalDate.parse(date1, formatter);
			LocalDate localDate2 = LocalDate.parse(date2, formatter);
			return localDate2.compareTo(localDate1);
		};

		// Create a TreeMap with the custom comparator to store orders sorted by date in
		// descending order
		TreeMap<String, List<Map<String, Object>>> ordersMap = new TreeMap<>(dateComparator);

		for (Orders order : orders) {
			Map<String, Object> orderDetails = new HashMap<>();
			orderDetails.put("orderId", order.getOrderId());
			orderDetails.put("userId", order.getUserId());
			orderDetails.put("orderDate", order.getOrderDate());
			orderDetails.put("totalAmount", order.getTotalAmount());
			orderDetails.put("addressId", order.getAddressId());
			orderDetails.put("paymentId", order.getPaymentId());
			orderDetails.put("orderStatus", order.getOrderStatus());
			orderDetails.put("confirmationEmailSent", order.isConfirmationEmailSent());
			orderDetails.put("confirmationNumber", order.getConfirmationNumber());
			orderDetails.put("promoCode", order.getPromoCode());

			List<OrderItems> orderItems = orderItemsRepo.findAllByOrders(order);
			List<Map<String, Object>> orderItemsList = new ArrayList<>();

			for (OrderItems orderItem : orderItems) {
				Map<String, Object> orderItemDetails = new HashMap<>();
				orderItemDetails.put("orderItemId", orderItem.getOrderItemId());
				orderItemDetails.put("quantity", orderItem.getQuantity());
				orderItemDetails.put("price", orderItem.getPrice());

				Books book = bookRepo.findById(orderItem.getBookId()).orElse(null);

				if (book != null) {
					orderItemDetails.put("bookId", book.getBookId());
					orderItemDetails.put("title", book.getTitle());
					orderItemDetails.put("image", book.getImage_data());
					orderItemDetails.put("author", book.getAuthor());
				}

				orderItemsList.add(orderItemDetails);
			}

			orderDetails.put("orderHistoryItems", orderItemsList);

			List<Map<String, Object>> ordersList = ordersMap.getOrDefault(order.getOrderDate(), new ArrayList<>());
			ordersList.add(orderDetails);
			ordersMap.put(order.getOrderDate(), ordersList);
		}

		List<Map<String, Object>> resultList = new ArrayList<>();
		for (String date : ordersMap.keySet()) {
			Map<String, Object> dateEntry = new HashMap<>();
			dateEntry.put("Date", date);
			dateEntry.put("orders", ordersMap.get(date));
			resultList.add(dateEntry);
		}

		return resultList;
	}

	@Override
	public Response reorderBooks(Orders order,HttpServletRequest request) {
		String token = request.getHeader("Authorization").replace("Bearer ", "");
		User user = userRepo.findByEmail(jwtUtils.getUserNameFromJwtToken(token)).get();
		Response response=new Response();
		try{	
			Orders reorder=ordersRepo.findByOrderId(order.getOrderId());
			List<OrderItems> reorderItems=orderItemsRepo.findAllByOrders(reorder);
			ShoppingCart cart=shoppingCartRepo.findByUserId(user.getUserId());
			for(OrderItems item:reorderItems) {	
				CartBooks cartBook=new CartBooks();
				cartBook.setBookId(item.getBookId());
				cartBook.setCartId(cart.getCartId());
				Books book=bookRepo.findByBookId(item.getBookId());	 		
				BookInventory bookInventory=bookInventoryRepo.findByBookId(item.getBookId());	  		  		
		  		if(bookInventory.getQuantity()<item.getQuantity()) {
		  			response.setMessage("Selected Books are out of stock.Please add your books individually to cart");
		  			response.setStatus(false);
		  			return response;
		  		}	
				cartBook.setPrice(book.getSelling_Price());
				cartBook.setQuantity(item.getQuantity());
				cartBook.setUserId(user.getUserId());
				cartBooksRepo.save(cartBook);
				
			}
			response.setMessage("Reorder successful");		
			response.setStatus(true);
		}
		catch(Exception e) {
			response.setMessage("Failed to reorder Books");
			response.setStatus(false);
		}
		return response;
	}

	@Override
	public void deleteUser(Long id) {
		userRepo.deleteByUserId(id);
	}

}
