package com.merealator.merealator.model;

import java.time.LocalDateTime;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "realestate")
public class RealEstate {

	public RealEstate() {
		
	}
	
	public RealEstate(String title, LocalDateTime dateTime) {
		this.title = title;
		this.dateTime = dateTime;
	}
	
    //private long id;
    @Field private String id;

    @Indexed(unique = true)
    private String title;

    private LocalDateTime dateTime;
    
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public LocalDateTime getDateTime() {
		return dateTime;
	}

	public void setDateTime(LocalDateTime dateTime) {
		this.dateTime = dateTime;
	}

}

