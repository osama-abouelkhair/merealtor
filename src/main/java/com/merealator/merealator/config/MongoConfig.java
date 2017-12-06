package com.merealator.merealator.config;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import java.util.ArrayList;
import java.util.List;

@Configuration
@EnableMongoRepositories(basePackages = { "com.merealator.merealator.repository" })
public class MongoConfig extends AbstractMongoConfiguration {


	@Override
	protected String getDatabaseName() {
		return "merealatordb";
	}

	@Override
	public String getMappingBasePackage() {
		return "com.merealator.merealator.model";
	}

	@Override
	public MongoClient mongoClient() {
		return new MongoClient(new MongoClientURI("mongodb://merealator:merealator@localhost:27017/merealatordb?authSource=merealatordb"));

	}

}
