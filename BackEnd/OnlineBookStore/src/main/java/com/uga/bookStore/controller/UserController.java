package com.uga.bookStore.controller;
          
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.token.TokenService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.uga.bookStore.Exceptions.AccountAlreadyExistsException;
import com.uga.bookStore.Exceptions.EditProfileException;
import com.uga.bookStore.Exceptions.InvalidOTPException;
import com.uga.bookStore.Exceptions.PaymentCardLimitException;
import com.uga.bookStore.model.Books;
import com.uga.bookStore.model.CartBooks;
import com.uga.bookStore.model.CheckoutReq;
import com.uga.bookStore.model.FilterBooksReq;
import com.uga.bookStore.model.GetBooksReq;
import com.uga.bookStore.Exceptions.PromoCodeAlreadyExistsException;
import com.uga.bookStore.Exceptions.PromoNotFoundException;
import com.uga.bookStore.model.JwtResponse;
import com.uga.bookStore.model.Login;
import com.uga.bookStore.model.Orders;
import com.uga.bookStore.model.PaymentCard;
import com.uga.bookStore.model.Promotions;
import com.uga.bookStore.model.Response;
import com.uga.bookStore.model.ShippingAddress;
import com.uga.bookStore.model.User;
import com.uga.bookStore.repo.UserRepo;
import com.uga.bookStore.response.Filter_Response;
import com.uga.bookStore.security.JwtUtils;
import com.uga.bookStore.service.CheckoutService;
import com.uga.bookStore.service.FilterBooksService;
import com.uga.bookStore.service.UserService;
import com.uga.bookStore.service.UserServiceImpl;

import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins= "*")
public class UserController {
    private final UserService userService;
    
    
    @Autowired
    public FilterBooksService filterBooksService;
   
    
	@Autowired
	private UserServiceImpl userServiceImpl;
	
	@Autowired
	private CheckoutService checkoutService;
	@Autowired
	UserRepo userRepo;

	@Autowired
	JwtUtils jwtUtils;

	@Autowired
	AuthenticationManager authenticationManager;
	
	

   
    
    @PostMapping("/getBooks")
    public Filter_Response getBooks(@RequestBody GetBooksReq getBooksReq) {
    	Filter_Response getBook = filterBooksService.getBooks(getBooksReq);
        return getBook;
    }
    
    @PostMapping("/filterBook")
	public Filter_Response filterBooks(@RequestBody FilterBooksReq filterBooksreq) {
		Filter_Response filterBook = filterBooksService.filterBook(filterBooksreq);
        return filterBook;
	}
	
    @Autowired
    public UserController(UserServiceImpl userServiceImpl, CheckoutService checkoutService ) {
        this.userService = null;
		this.userServiceImpl = userServiceImpl;
		this.checkoutService= checkoutService;
    }

	
	@PostMapping("/verifyUser")
	public Response verifyUser(@RequestBody User user) {
		return userServiceImpl.verifyUser(user);
	}
	@PostMapping("/checkOut")
	public Response checkOut(@RequestBody CheckoutReq checkoutReq,HttpServletRequest request,Map<String, Object> model) {
		return checkoutService.verifyCheckout(checkoutReq,request,model);
	}

	public ResponseEntity<List<User>> getAllUsers() {
		List<User> users = userServiceImpl.getAllUsers();
		return ResponseEntity.ok(users);
	}

	@GetMapping("/{id}")
	public ResponseEntity<User> getUserById(@PathVariable Long id) {
		Optional<User> user = userServiceImpl.getUserById(id);
		return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@PostMapping("/register")
	public Response registerUser(@Validated @RequestBody User userRegister, HttpServletRequest request, Map<String, Object> model)
			throws PaymentCardLimitException, AccountAlreadyExistsException {
		Response response = new Response();
		response = userServiceImpl.registerUser(userRegister, request, model);
		return response;
	}

	@PostMapping("/signin")
	public ResponseEntity<?> signin(@Valid @RequestBody Login loginRequest) {
		User user = userRepo.findByEmail(loginRequest.getUserName()).get();
		if (user == null) {
			return new ResponseEntity<>("Email not present in the system. Please register with your email", HttpStatus.INTERNAL_SERVER_ERROR);
		}
		else if(user != null  && user.getAccountStatusId() == 2) {
			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
			String encryptedPassword = encoder.encode(loginRequest.getPassword());
			
			final Authentication authentication = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(loginRequest.getUserName(), loginRequest.getPassword()));
			SecurityContextHolder.getContext().setAuthentication(authentication);
			String jwt = jwtUtils.generateJwtToken(authentication);
			User userDetails = (User) authentication.getPrincipal();
			List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
					.collect(Collectors.toList());
			return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUserId(), userDetails.getFirstName(),
					userDetails.getLastName(), userDetails.getUsername(), roles));

		} else {
			return new ResponseEntity<>("Login Failed. Eemail account is not yet verified in system. Please verify your account", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/forgotPassword")
	public Response forgotPassword(@RequestBody User user, HttpServletRequest request, Map<String, Object> model) {

		return userServiceImpl.forgotPassword(user, request, model);
	}

	@PostMapping("/verifyForgotPasswordOTP")
	public Response verifyForgotPasswordOTP(@RequestBody User user, HttpServletRequest request)
			throws InvalidOTPException {
		return userServiceImpl.verifyForgotPasswordOTP(user, request);
	}

	@PostMapping("/addPaymentCard")
	public ResponseEntity<?> addPaymentCard(@RequestBody List<PaymentCard> paymentCards, HttpServletRequest request)
			throws PaymentCardLimitException {
		return new ResponseEntity<>(userServiceImpl.addPaymentCard(paymentCards, request), HttpStatus.OK);
	}

	@GetMapping("/getPaymentCards")
	public ResponseEntity<?> getPaymentCards(HttpServletRequest request) {
		return new ResponseEntity<>(userServiceImpl.getPaymentCards(request), HttpStatus.OK);
	}
	
	
	@PostMapping("/deleteCards")
	public ResponseEntity<?> deletePaymentCards(@RequestBody PaymentCard paymentCard, HttpServletRequest request) {
		return new ResponseEntity<>(userServiceImpl.deletePaymentCards(paymentCard,request), HttpStatus.OK);
	}
	
	@PostMapping("/addShippingAddress")
	public ResponseEntity<?> addShippingAddress(@RequestBody List<ShippingAddress> shippingAddress, HttpServletRequest request)
			throws PaymentCardLimitException {
		return new ResponseEntity<>(userServiceImpl.addShippingAddress(shippingAddress, request), HttpStatus.OK);
	}
	
	@GetMapping("/getShippingAddress")
	public ResponseEntity<?> getShippingAddress(HttpServletRequest request) {
		return new ResponseEntity<>(userServiceImpl.getShippingAddresses(request), HttpStatus.OK);
	}	
	
	@PostMapping("/deleteShippingAddress")
	public ResponseEntity<?> deleteShippingAddress(@RequestBody ShippingAddress shippingAddress, HttpServletRequest request) {
		return new ResponseEntity<>(userServiceImpl.deleteShippingAddress(shippingAddress,request), HttpStatus.OK);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user, HttpServletRequest request) {
		User updatedUser = userServiceImpl.updateUser(id, user, request);
		if (updatedUser != null) {
			return ResponseEntity.ok(updatedUser);
		}
		return ResponseEntity.notFound().build();
	}
    @PostMapping("/addToCart")
    public ResponseEntity<?> addToCart(@RequestBody Books books, HttpServletRequest request) {
        return new ResponseEntity<>(userServiceImpl.addToCart(books, request),HttpStatus.OK);
    }
    
    @PostMapping("/deleteFromCart")
    public ResponseEntity<?> deleteFromCart(@RequestBody Books books, HttpServletRequest request) {
        return new ResponseEntity<>(userServiceImpl.deleteFromCart(books, request),HttpStatus.OK);
    }
    
    @PostMapping("/updateCart")
    public ResponseEntity<?> updateCart(@RequestBody CartBooks cartBooks, HttpServletRequest request) {
        return new ResponseEntity<>(userServiceImpl.updateCart(cartBooks, request),HttpStatus.OK);
    }
    @GetMapping("/getCartBooks")
	public ResponseEntity<?> getCartBooks(HttpServletRequest request) {
		return new ResponseEntity<>(userServiceImpl.getCartBooks(request), HttpStatus.OK);
	}
    @DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
		userServiceImpl.deleteUser(id);
		return ResponseEntity.noContent().build();
	}    
	
	@PutMapping("/editProfile")
	public Response editProfile(@RequestBody User user, HttpServletRequest request, Map<String, Object> model)
			throws EditProfileException {
		return userServiceImpl.editProfile(user, request, model);
	}
	
	@GetMapping("/getOrderHistory")
	public ResponseEntity<?> getorderHistory(HttpServletRequest request){
		return new ResponseEntity<>(userServiceImpl.getOrderHistory(request), HttpStatus.OK);
	}
 
	@PostMapping("/verifyPromo")
	public Response verifyPromo(@RequestBody Promotions validPromo, HttpServletRequest request, Map<String, Object> model)
				throws PromoNotFoundException, PromoCodeAlreadyExistsException {
			Response response = new Response();
			response = checkoutService.verifyPromo(validPromo, request, model);
			return response;
	}
	@PostMapping("/reorderBook")
	public Response reorderBooks(@RequestBody Orders order, HttpServletRequest request)		{
			Response response = new Response();
			response = userServiceImpl.reorderBooks(order, request);
			return response;
	}
}
