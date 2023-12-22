package com.uga.bookStore.service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.uga.bookStore.Exceptions.AccountAlreadyExistsException;
import com.uga.bookStore.Exceptions.EditProfileException;
import com.uga.bookStore.Exceptions.InvalidOTPException;
import com.uga.bookStore.Exceptions.PaymentCardLimitException;
import com.uga.bookStore.Exceptions.PromoCodeAlreadyExistsException;
import com.uga.bookStore.constants.AppConstants;
import com.uga.bookStore.model.BookInventory;
import com.uga.bookStore.model.Books;
import com.uga.bookStore.model.CartBooks;
import com.uga.bookStore.model.CheckoutBooks;
import com.uga.bookStore.model.CheckoutReq;
import com.uga.bookStore.model.LoginRequest;
import com.uga.bookStore.model.Orders;
import com.uga.bookStore.model.PaymentCard;
import com.uga.bookStore.model.Promotions;
import com.uga.bookStore.model.Response;
import com.uga.bookStore.model.ShippingAddress;
import com.uga.bookStore.model.ShoppingCart;
import com.uga.bookStore.model.User;
import com.uga.bookStore.repo.BookInventoryRepo;
import com.uga.bookStore.repo.BookRepo;
import com.uga.bookStore.repo.CartBooksRepo;
import com.uga.bookStore.repo.OrderItemsRepo;
import com.uga.bookStore.repo.OrdersRepo;
import com.uga.bookStore.repo.PaymentRepo;
import com.uga.bookStore.repo.PromotionsRepo;
import com.uga.bookStore.repo.ShippingAddressRepo;
import com.uga.bookStore.repo.ShoppingCartRepo;
import com.uga.bookStore.repo.UserRepo;
import com.uga.bookStore.security.JwtUtils;
import com.uga.bookStore.model.OrderItems;

import jakarta.servlet.http.HttpServletRequest;
@Service
public class CheckoutService {
	private final ShoppingCartRepo cartRepo;
	private final UserRepo userRepo;
	private final CartBooksRepo cartBooksRepo;
	private final OrdersRepo ordersRepo;
	private final OrderItemsRepo orderItemsRepo;
	private	final BookInventoryRepo bookInventoryRepo;	
    LocalDate currentDate = LocalDate.now();
    Date date = Date.from(currentDate.atStartOfDay(ZoneId.systemDefault()).toInstant());

	private final BookRepo bookRepo;
	private final ShippingAddressRepo shippingAddressRepo;
	private final PaymentRepo paymentRepo;
	
	
	@Autowired
	private UserRepo userDAO;

	@Autowired
	private PromotionsRepo promoDAO;


	@Autowired
	JwtUtils jwtUtils;

	

	public Response verifyPromo(Promotions newPromo, HttpServletRequest request, Map<String, Object> model)
			throws PromoCodeAlreadyExistsException {
		Response response = new Response();
		Promotions promoData = promoDAO.findByPromoCode(newPromo.getPromoCode());

		if (promoData != null) {
            Date currentDate = new Date();
            if (currentDate.after(promoData.getStartDate()) && currentDate.before(promoData.getExpiryDate())) {
               
            	response.setStatus(true); 
                response.setMessage("Promo code is valid."); 
                response.setPercentage(promoData.getPercentage());
            } 
            else {
            	response.setStatus(false);
                response.setMessage("Promo code is Expired"); 
            }
        } 
		else {
			response.setStatus(false); 
	        response.setMessage("Promo code not found."); 
        }
		return response;
	}


	
	@Autowired
	public CheckoutService(ShoppingCartRepo cartRepo, CartBooksRepo cartBooksRepo, OrdersRepo ordersRepo,UserRepo userRepo
			,BookRepo bookRepo,ShippingAddressRepo shippingAddressRepo, PaymentRepo paymentRepo,OrderItemsRepo orderItemsRepo,BookInventoryRepo bookInventoryRepo) {
		this.cartRepo=cartRepo;
		this.cartBooksRepo=cartBooksRepo;
		this.ordersRepo=ordersRepo;
		this.userRepo=userRepo;
		this.bookRepo=bookRepo;
		this.shippingAddressRepo=shippingAddressRepo;
		this.paymentRepo=paymentRepo;
		this.orderItemsRepo=orderItemsRepo;
		this.bookInventoryRepo=bookInventoryRepo;
	}
	@Autowired
	private EmailService emailService;
	public Response verifyCheckout(CheckoutReq checkoutReq, HttpServletRequest request, Map<String, Object> model) {
		//get cartId from shopping_cart by using userId
		ShoppingCart shoppingCart=cartRepo.findByUserId(checkoutReq.getUserId());
		
		Optional<User> userObject = userRepo.findByUserId((long) checkoutReq.getUserId());
		List<CartBooks> cart_books=cartBooksRepo.findByCartId(shoppingCart.getCartId());
		List<CheckoutBooks> selected_books = new ArrayList<CheckoutBooks>();
		String promoCode=checkoutReq.getPromoCode();
		for(CartBooks c: cart_books) 
		{
		
			
			Books book=bookRepo.findByBookId(c.getBookId());
			
			
//			 CartBooks cart=cartBooksRepo.findByCartId(shoppingCart.getCartId());
			
			 CheckoutBooks checkoutBooks= new CheckoutBooks();
			 checkoutBooks.setAuthor(book.getAuthor());
			 checkoutBooks.setCategory(book.getCategory());
			 checkoutBooks.setDescription(book.getDescription());
			 checkoutBooks.setImage_data(book.getImage_data());
			 checkoutBooks.setQuantity(c.getQuantity());
			 checkoutBooks.setSelling_Price(book.getSelling_Price());
			 checkoutBooks.setTitle(book.getTitle());
			 checkoutBooks.setTotal_book(book.getSelling_Price()*c.getQuantity());
			selected_books.add(checkoutBooks);
			
			
		}
		float total=0;
	
		for(CartBooks cart:cart_books) {
			if(cart.getPrice()>0) {
				total+=cart.getPrice()*cart.getQuantity();
			}
		}
//		
//		if(!promoCode.isEmpty()) {
//			Promotions promo=promoDAO.findByPromoCode(promoCode);
//			total=total-(total/promo.getPercentage());
//		}
		
		Orders order=new Orders();
		order.setAddressId(checkoutReq.getShippingAddressId());
		order.setPaymentId(checkoutReq.getPaymentCardId());
		order.setUserId(checkoutReq.getUserId());
		 LocalDate dateObj = LocalDate.now();
	        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy");
	        String date = dateObj.format(formatter);
		order.setOrderDate(date);
		order.setTotalAmount(total);
		order.setOrderStatus("Order Placed");
		
		String token = request.getHeader("Authorization").replace("Bearer ", "");
		Optional<User> Userreq = userRepo.findByEmail(jwtUtils.getUserNameFromJwtToken(token));
		User UserToUpdate = Userreq.get();
		ShippingAddress shippingAddress=shippingAddressRepo.findByAddressId(checkoutReq.getShippingAddressId()); 
		List<ShippingAddress> shippingAddresses=new ArrayList<ShippingAddress>();
		shippingAddresses.add(shippingAddress);
		PaymentCard paymentCard=paymentRepo.findByPaymentId(checkoutReq.getPaymentCardId());
		paymentCard.setCardNumber(paymentCard.getCardNumber().substring(paymentCard.getCardNumber().length()-4));
		List<PaymentCard> paymentCards=new ArrayList<PaymentCard>();
		paymentCards.add(paymentCard);
		int min = 10000000; // Minimum 8-digit number (10^7)
        int max = 99999999; // Maximum 8-digit number (10^8 - 1)

        Random random = new Random();
        int randomNumber = random.nextInt(max - min + 1) + min;
        order.setConfirmationNumber(randomNumber);
		order.setConfirmationEmailSent(true);
		
		Response response=new Response();
		String verifyURL = "http://localhost:8080/users/checkOut";
		
		model.put("URL", verifyURL);
		model.put("name", userObject.get().getFirstName() + " " + userObject.get().getLastName());
		model.put("confirmationNo", Integer.toString(order.getConfirmationNumber()));
		model.put("total",total);
		model.put("books", selected_books);
		model.put("address", shippingAddresses);
		model.put("card", paymentCards);
		response = emailService.sendCheckOut(Userreq.get().getEmail(),
				"Checkout: Order Confirmation", model);
		ordersRepo.save(order);
		int orderId=order.getOrderId();
		for(CartBooks cart:cart_books) {
			OrderItems orderItem=new OrderItems();
			orderItem.setBookId(cart.getBookId());
			orderItem.setPrice(cart.getPrice());
			orderItem.setQuantity(cart.getQuantity());
			orderItem.setOrders(order);
		//	orderItemsRepo.save(orderItem);
			cartBooksRepo.delete(cart);
			BookInventory bookInventory=bookInventoryRepo.findByBookId(cart.getBookId());
			bookInventory.setQuantity(bookInventory.getQuantity()-cart.getQuantity());
			bookInventoryRepo.save(bookInventory);
		}
		response.setMessage("Order Placed. CheckOut Successful");
		response.setStatus(Boolean.TRUE);
		return response;
	}
}
