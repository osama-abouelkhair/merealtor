package com.merealator.merealator.services;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.merealator.merealator.model.Role;
import com.merealator.merealator.model.User;
import com.merealator.merealator.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user = userRepository.findByEmail(email);

		if (user == null) {
			throw new UsernameNotFoundException(email);
		}
		return user;
	}

	//@PreAuthorize("permitAll()")
	public User registerUser(User user) {
		user.setId(String.valueOf(new Random().nextLong()));
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.grantAuthority(new Role("ROLE_USER"));
		return userRepository.save(user);
	}

}
