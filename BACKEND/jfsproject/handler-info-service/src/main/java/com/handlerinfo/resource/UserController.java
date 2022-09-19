package com.handlerinfo.resource;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

import com.handlerinfo.configuration.RConfiguration;
import com.handlerinfo.model.Booking;
import com.handlerinfo.model.Train;
import com.handlerinfo.model.UserModel;
import com.handlerinfo.service.UserServices;


@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
	@Autowired
	private RestTemplate resttemplate;
	@Autowired
	private UserServices uservice;
	@Autowired
	private WebClient.Builder webClientBuilder;
	 @Autowired
	    private RabbitTemplate template;

	//insert user based on roles(user/admin)
	 @PostMapping("/{i}")
		public UserModel insertUser(@RequestBody UserModel user) {

			
				System.out.println("Data saved !!");
				if(user.getRoles().equalsIgnoreCase("user")) {
					user.setRoles("ROLE_USER");
				}
				else if(user.getRoles().equalsIgnoreCase("admin")) {
					user.setRoles("ROLE_ADMIN");
				}
				else {
					user.setRoles("roles cannot defined properly");
				}
				user.setId(UUID.randomUUID().toString());
				UserModel u = uservice.save(user);

				System.out.println(u);
				return u;
		}
	 
	 //Get user details by id

	@GetMapping("/ga/{id}")
	public UserModel getAllUserDetailById(@PathVariable("id") String id) {
		Optional<UserModel> op = uservice.findById(id);
		UserModel t = op.get();
		if (op.isPresent()) {

			return t;
		} else {
			return null;
		}
	}
	
	//get user details by emailid
	@GetMapping("/getAll/{emailId}")
	public UserModel getAllUserDetailByEmailId(@PathVariable("emailId") String emailId) {
		UserModel op = uservice.findByemailId(emailId);
		
		
		return op;
		
	}
	
	//get user by username
	@GetMapping("/getusername/{username}")
	public UserModel getAllUserDetailByUserName(@PathVariable("username") String username) {
		UserModel op = uservice.findByUserName(username);
		
		
		return op;
		
	}
	
	//Get all user details
	@GetMapping("/g")
	public List<UserModel> getAllUserDetails() {
		List<UserModel> list = new ArrayList();
		uservice.findAllDetails().forEach(list::add);
		return list;
	}

//	//Update User Details
	@PutMapping("/updateUserDetails")
	public UserModel updateUserDetails(@RequestBody UserModel user) {
		return uservice.save(user);
	}
//	
	
	//Update booking 
	
	@PutMapping("/updateBooking")
	public void updateBooking( @RequestBody Booking book) {
		resttemplate.put("http://localhost:8041/bookingdetails/updateBooking", book, Booking.class);

	}
	
	//delete booking by id
	@DeleteMapping("/delete/booking/{id}")
	public void DeleteBooking(@PathVariable String id) {
		resttemplate.delete("http://localhost:8041/bookingdetails/d/" + id);
	}

	
	//get list of trains
	@GetMapping("/t")
	public List<Train> getTrainInfo() {
		List<Train> train = webClientBuilder.build().get().uri("http://localhost:8031/traindetails/g").retrieve()
				.bodyToMono(List.class).block();
		return train;

	}

	
	
	@PostMapping("/b/i")
	public Booking insertBookingInfo(@RequestBody Booking book) {

		Booking b = resttemplate.postForObject("http://localhost:8041/bookingdetails/i", book, Booking.class);
      
		return b;
	}
	@DeleteMapping("/d/delete/{id}")
	public void deleteBookingById(@PathVariable("id")  String id) {
		resttemplate.delete("http://localhost:8041/bookingdetails/d/{id}", id);
	
	}

	
}