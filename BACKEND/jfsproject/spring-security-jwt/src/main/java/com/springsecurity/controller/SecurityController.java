package com.springsecurity.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springsecurity.jwtutil.JwtUtil;
import com.springsecurity.models.AuthenticationRequest;
import com.springsecurity.models.AuthenticationResponse;
import com.springsecurity.models.Booking;
import com.springsecurity.models.Ticket;
import com.springsecurity.models.TicketStore;
import com.springsecurity.models.Train;
import com.springsecurity.models.UserModel;
import com.springsecurity.security.MyUserDetailsService;
import com.springsecurity.service.AdminService;
import com.springsecurity.service.UserServices;

@RestController
@RequestMapping("/security")
@CrossOrigin("*")
public class SecurityController {

	@Autowired
	AdminService aservice;

	@Autowired
	UserServices uservice;

	@Autowired
	private PasswordEncoder getPassWordEncoder;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtUtil jwtTokenUtil;

	@Autowired
	private MyUserDetailsService userDetailsService;

	// Create User based on roles(User/Admin)
	@PostMapping("/createUser")
	public UserModel createUser(@RequestBody UserModel user) {

		String pass = getPassWordEncoder.encode(user.getPassword());
		user.setPassword(pass);
		System.out.println(user);
		UserModel u = uservice.insertUser(user);
		return u;

	}

	// Get user details by id from UserModel using RestTemplate
	@GetMapping("user/ga/{id}")
	public UserModel allUserDetailById(@PathVariable("id") String id) {
		UserModel u = uservice.getAllUserDetailById(id);
		return u;

	}

	// Get user ddtails by emailId fetched from UserModel using RestTemplate
	@GetMapping("/user/getbyEmailid/{emailId}")
	public UserModel findByEmailIdById(@PathVariable("emailId") String emailId) {

		System.out.println("hi..." + emailId);
		UserModel op = uservice.findByEmailid(emailId);

		return op;

	}

	// Get user details by username fetched from UserModel using RestTemplate
	@GetMapping("/user/getbyusername/{username}")
	public UserModel findByUserName(@PathVariable("username") String username) {

		System.out.println("hi..." + username);
		UserModel op = uservice.findByUserName(username);

		return op;

	}

	// Get all user details fetched from UserModel using RestTemplate
	@GetMapping("user/g")
	public List<UserModel> allUserDetails() {
		List<UserModel> u = uservice.findAllDetails();
		return u;

	}

	// Get all train information fetched from Traininfo using Resttemplate
	@GetMapping("user/t")
	public List<Train> allTrainInfo() {
		List<Train> t = uservice.getTrainInfo();
		return t;
	}

	// Insert booking information
	@PostMapping("user/b/i")
	public Booking BookingInfo(@RequestBody Booking bk) {
		Booking book = uservice.insertBookingInfo(bk);
		return book;

	}

	// Get all booking information by emailId fetched from Bookinginfo using Resttemplate
	@GetMapping("/user/getAllBookingbyemailId/{emailId}")
	public Booking getAllBookingbyemailId(@PathVariable("emailId") String emailId) {
		Booking t = uservice.getAllBookingbyemailId(emailId);
		return t;
	}
	
	//Update UserDetails 

	@PutMapping("user/updateUserDetails")
	public void updateUserDetails(@RequestBody UserModel user) {
		uservice.updateUserDetails(user);
	}
	
	//Update Booking

	@PutMapping("user/updateBooking")
	public void updateBooking(@RequestBody Booking book) {
		uservice.updateBooking(book);
	}
	
	//Delete booking

	@DeleteMapping("user/delete/booking/{id}")
	public void deleteBooking(@PathVariable("id") String id) {
		uservice.deleteBooking(id);
	}
	
	//Insert Admin
	@PostMapping("/admin/i")
	public UserModel insertAdmininUserModel(@RequestBody UserModel admin) {
		String pass = getPassWordEncoder.encode(admin.getPassword());
		admin.setPassword(pass);
		System.out.println(admin);
		UserModel u = uservice.insertUser(admin);
		return u;
	}

	
	//Get all AdminDetails
	@GetMapping("admin/g")
	public List<UserModel> allAdminDetails() {
		List<UserModel> l = aservice.getAllAdminlDetails();
		return l;

	}
	
	//Get All Booking from Admin side
	@GetMapping("admin/t")
	public List<Booking> getAllBookingDetails() {
		List<Booking> l = aservice.getAllBookingDetails();
		return l;

	}

	
	//Insert train information
	@PostMapping("admin/p/t")
	public Train createTrainInfo(@RequestBody Train train) {
		Train tr = aservice.insertTrain(train);
		return tr;

	}

	
	//Method for authentication using jwt token

	@PostMapping("/authenticate")
	public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest)
			throws Exception {
		System.out.println("I AM HERE");

		try {
			System.out.println("try");
			authenticationManager.authenticate(

					new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),
							authenticationRequest.getPassword()));
		} catch (BadCredentialsException e) {
			throw new Exception("Incorrect username or password", e);
		}

		final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());

		final String jwt = jwtTokenUtil.generateToken(userDetails);
		System.out.println("done ......");

		return ResponseEntity.ok(new AuthenticationResponse(jwt));
	}

}
