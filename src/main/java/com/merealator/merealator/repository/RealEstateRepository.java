package com.merealator.merealator.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.merealator.merealator.model.RealEstate;

public interface RealEstateRepository extends MongoRepository<RealEstate, Long> {

    //Supports native JSON query string
    @Query("{title:'?0'}")
    RealEstate findByTitle(String title);

    @Query("{title: { $regex: ?0 } })")
    List<RealEstate> findByRegExTitle(String title);

}