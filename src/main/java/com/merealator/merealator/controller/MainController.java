package com.merealator.merealator.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.merealator.merealator.model.Realestate;
import com.merealator.merealator.repository.RealestateRepository;

@RestController
@RequestMapping(value="/merealtor/realestate")
public class MainController {

	@Autowired
	private RealestateRepository realestateRepository;

	@RequestMapping("/{title}")
    public Realestate getRecognition(@PathVariable("title") String title){
        return realestateRepository.findByTitle(title);
    }
	
	@RequestMapping
	//@PreAuthorize("hasRole('ROLE_USER')")
	public List<Realestate> findAll() {
		
		List<Realestate> realEstates = realestateRepository.findAll();
		
		return realEstates;

	}
	
	@PostMapping
    public ResponseEntity<String> addRealEstate(@RequestBody Realestate realEstate){
        realestateRepository.save(realEstate);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    //This is of course a very naive implementation! We are assuming unique names...
    @DeleteMapping("/{title}")
    public ResponseEntity<String> deleteRealEstate(@PathVariable  String title){
        Realestate realEstate = realestateRepository.findByTitle(title);
        if(realEstate != null) {
        	realestateRepository.delete(realEstate);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

}
