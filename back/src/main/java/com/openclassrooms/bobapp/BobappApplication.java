package com.openclassrooms.bobapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BobappApplication {

	public static void main(String[] args) {
		System.out.println("Hello Bobapp!");
		SpringApplication.run(BobappApplication.class, args);
	}

}
