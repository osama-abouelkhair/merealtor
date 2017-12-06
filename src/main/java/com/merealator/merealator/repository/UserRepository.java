package com.merealator.merealator.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.merealator.merealator.model.User;

public interface UserRepository extends MongoRepository<User, Long>{
	User findByEmail(String email);
}
