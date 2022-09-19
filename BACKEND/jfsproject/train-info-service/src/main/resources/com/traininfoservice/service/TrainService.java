package com.traininfoservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.traininfoservice.model.Train;
import com.traininfoservice.repository.TrainsRepository;

@Service
public class TrainService {
	@Autowired
	TrainsRepository trepo;

	public Optional<Train> findById(String train_no) {
		return trepo.findById(train_no);
	}

	public Train save(Train train) {

		Train t = trepo.save(train);
		return t;
	}

	public List<Train> findAllDetails() {
		return trepo.findAll();
	}

	public void deleteById(String train_no) {
		trepo.deleteById(train_no);
		
	}
//	public Optional<Train> findById1(String train_name) {
//		return trepo.findById(train_name);
//	}

//	public Optional<Train> findByName(String train_name) {
//		// TODO Auto-generated method stub
//		return trepo.findByName(train_name);
//	}

	public Train findByTrainName(String train_name) {
		// TODO Auto-generated method stub
		return trepo.findByTrainName(train_name);
	}

}
