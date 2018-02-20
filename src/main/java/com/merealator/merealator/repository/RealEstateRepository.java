package com.merealator.merealator.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.merealator.merealator.model.Realestate;

public interface RealestateRepository extends MongoRepository<Realestate, Long> {

    //Supports native JSON query string
    @Query("{title:'?0'}")
    Realestate findByTitle(String title);

    @Query("{title: { $regex: ?0 } })")
    List<Realestate> findByRegExTitle(String title);

}