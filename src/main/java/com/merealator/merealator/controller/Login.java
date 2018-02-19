package com.merealator.merealator.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.provider.token.ConsumerTokenServices;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.merealator.merealator.model.Role;
import com.merealator.merealator.model.User;
import com.merealator.merealator.services.UserDetailsServiceImpl;

@RequestMapping(value="/user")
@RestController
public class Login {

	@Autowired
    ConsumerTokenServices tokenServices;

	@Autowired
    TokenStore tokenStore;
    
    @Autowired
    UserDetailsServiceImpl userDetailsService;
	
//	@PostMapping(value="/login")
//	@ResponseBody
//    public void login(HttpServletRequest request){
//		String authorization = request.getHeader("Authorization");
//        if (authorization != null && authorization.contains("Bearer")) {
//            String tokenId = authorization.substring("Bearer".length() + 1);
//            tokenServices.revokeToken(tokenId);
//        }
//    }
	
	@GetMapping(value="/userdetails/{email}")
	@ResponseBody
	public User userDetails(@PathVariable String email) {
		return (User) userDetailsService.loadUserByUsername(email);
	}
	
    @PreAuthorize("hasAuthority('TRUSTED_CLIENT')")
	@PostMapping(value="/signup")
	@ResponseBody
    public User login(@RequestBody User user){
       return userDetailsService.registerUser(user);
    }
	
}
