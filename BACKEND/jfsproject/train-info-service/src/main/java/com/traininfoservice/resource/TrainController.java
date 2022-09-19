package com.traininfoservice.resource;

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

import com.traininfoservice.model.Train;
import com.traininfoservice.repository.TrainsRepository;
import com.traininfoservice.service.TrainService;

@RestController
@CrossOrigin()
@RequestMapping("/traindetails")
public class TrainController {

	@Autowired
	private TrainService tservice;
	
	//Insert Train 

	@PostMapping("/{i}")
	public Train insertTrain(@RequestBody Train train) {

		System.out.println("Data saved !!");

		Train t = tservice.save(train);

		System.out.println(t);
		return t;

	}

	
	//Get train details by train no
	@GetMapping("/ga/{train_no}")
	public Train getAllTrainDetailById(@PathVariable("train_no") String train_no) {
		Optional<Train> op = tservice.findById(train_no);
		Train t = op.get();
		if (op.isPresent()) {

			return t;
		} else {
			return null;
		}
	}

	//Get train details by id
	@GetMapping("/getAllTrainDetails/{id}")
	public Train getAllTrainDetailBy(@PathVariable("id") String id) {
		Optional<Train> op = tservice.findById1(id);
		Train t = op.get();
		if (op.isPresent()) {

			return t;
		} else {
			return null;
		}
	}


	//Get all train details
	@GetMapping("/g")
	public List<Train> getAllTrainDetails() {
		List<Train> list = new ArrayList();
		tservice.findAllDetails().forEach(list::add);
		return list;
	}
	
	//Update by train no

	@PutMapping("/u/{train_no}")
	public Train UpdateTrainDetailsById(@PathVariable("train_no") String train_no, @RequestBody Train train) {
		Optional<Train> op = tservice.findById(train_no);
		if (op.isPresent()) {
			Train t = op.get();
			t.setPrice(train.getPrice());

			tservice.save(t);
			return t;
		} else {
			return null;
		}
	}

	//Update train details
	@PutMapping("/u")
	public Train UpdateTrainDetailsById(@RequestBody Train train) {
		return tservice.save(train);

	}
	
	//delete by train number
	@DeleteMapping("/d/{train_no}")
	public ResponseEntity<String> deleteTrainDetailsById(@PathVariable("train_no") String train_no) {
		Optional<Train> op = tservice.findById(train_no);
		if (op.isPresent()) {
			Train t = op.get();

			tservice.deleteById(train_no);
			return new ResponseEntity<String>("Deleted successfully", HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("Train_no not found", HttpStatus.NOT_FOUND);
		}
	}

	//Get search train details by train_name
	@GetMapping("/s/{train_name}")
	public Train searchByTrainName(@PathVariable("train_name") String train_name) {
		Train op = tservice.findByTrainName(train_name);

		return op;
	}
}