package com.bookinginfoservice.resource;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

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

import com.bookinginfoservice.model.Booking;
import com.bookinginfoservice.model.Train;
import com.bookinginfoservice.service.BookingService;


@RestController
@RequestMapping("/bookingdetails")
@CrossOrigin("*")
public class BookingController {

	@Autowired
	private BookingService bservice;
	
	@Autowired
	private RestTemplate restt;

	
	//Insert Booking
	@PostMapping("/{i}")
	public Booking insertBooking(@RequestBody Booking book) {
		
		String name = book.getTrain_name();
		Train t = restt.getForObject("http://localhost:8031/traindetails/s/"+ name,Train.class);
		System.out.println("jaggu");
		book.setTrain_no(t.getTrain_no());
		book.setDestination(t.getTo_destination());
		book.setStart_from(t.getStart_from());
		
		System.out.println("Data saved !!");
		book.setId(UUID.randomUUID().toString());
		Booking b = bservice.save(book);

		System.out.println(b);
		return b;

	}

	//get all booking details by id
	@GetMapping("/ga/{id}")
	public Booking getAllBookingDetailById(@PathVariable("id") String id) {
		Optional<Booking> op = bservice.findById(id);
		Booking b = op.get();
		if (op.isPresent()) {

			return b;
		} else {
			return null;
		}
	}
	
	
	//get all booking details by emailid
	@GetMapping("/getAllBooking/{emailId}")
	public Booking getAllBookingByEmailId(@PathVariable("emailId") String emailId) {
		Booking op = bservice.findByemailId(emailId);
		
		
		return op;
		
	}
	
	//get all booking details 
	
	@GetMapping("/g")
	public List<Booking> getAllBookingDetails() {
		List<Booking> list = new ArrayList();
		bservice.findAllDetails().forEach(list::add);
		return list;
	}


	//Update Booking
	@PutMapping("/updateBooking")
	public Booking updateBooking(@RequestBody Booking b) {
		return bservice.save(b);
	}
	
	
	//Delete Booking by id
	@DeleteMapping("/d/{id}")
	public ResponseEntity<String> deleteBookingDetailsById(@PathVariable("id") String id) {
		Optional<Booking> op = bservice.findById(id);
		if (op.isPresent()) {
			Booking b = op.get();

			bservice.deleteById(id);
			return new ResponseEntity<String>("Deleted successfully", HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("Booking_id not found", HttpStatus.NOT_FOUND);
		}

	}

}