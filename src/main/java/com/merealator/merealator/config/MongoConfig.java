package com.merealator.merealator.config;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import java.util.ArrayList;
import java.util.List;


@Configuration
@PropertySource("classpath:application-${spring.profiles.active}.properties")
@EnableMongoRepositories(basePackages = { "com.merealator.merealator.repository" })
public class MongoConfig extends AbstractMongoConfiguration {

	@Value("${spring.data.mongodb.uri}")
	private String uri;
	
	@Value("${spring.data.mongodb.databaseName}")
	private String databaseName;

	@Override
	protected String getDatabaseName() {
		return databaseName;
	}

	@Override
	public String getMappingBasePackage() {
		return "com.merealator.merealator.model";
	}

	@Override
	public MongoClient mongoClient() {
		return new MongoClient(new MongoClientURI(uri));
	}

}
