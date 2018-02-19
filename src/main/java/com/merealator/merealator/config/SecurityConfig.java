package com.merealator.merealator.config;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;
import org.springframework.boot.autoconfigure.security.SecurityProperties;


import com.merealator.merealator.services.UserDetailsServiceImpl;


@Configuration
@EnableWebSecurity
//@EnableGlobalMethodSecurity(prePostEnabled = true)
//@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
//@Order(SecurityProperties.BASIC_AUTH_ORDER - 2)
public class SecurityConfig extends WebSecurityConfigurerAdapter {


	@Value("${security.encoding-strength}")
	private Integer encodingStrength;

	@Value("${security.security-realm}")
	private String securityRealm;

	@Autowired
	private UserDetailsService userDetailsService;
	
	@Autowired
    private PasswordEncoder passwordEncoder;
	
	@Bean
	public BCryptPasswordEncoder passwordEncoder(){
	   return new BCryptPasswordEncoder();
	}

	
	@Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder( passwordEncoder );
        provider.setUserDetailsService( userDetailsService() );
        return provider;
    }
	
	@Bean
	public UserDetailsService userDetailsService() {
		return new UserDetailsServiceImpl();
	}
	
	@Bean
	@Override
	protected AuthenticationManager authenticationManager() throws Exception {
		return super.authenticationManager();
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService)
		        .passwordEncoder(passwordEncoder);
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		/*http
		.formLogin().disable() // disable form authentication
        .anonymous().disable() // disable anonymous user
        .httpBasic()
        .and()
        // restricting access to authenticated users
        .authorizeRequests().antMatchers("/user/**").permitAll()
        .antMatchers("/realestate/**").access("hasAnyRole('USER')") 
        .and()
        .authorizeRequests().anyRequest().authenticated();	
        
		http
			.csrf().disable()
			.authorizeRequests()
        .antMatchers("/user/**").permitAll()
        // restricting access to authenticated users
        .anyRequest().authenticated()
        .and().formLogin().disable() // disable form authentication
        .httpBasic();
        */
		//--------------------
		/* http
         .formLogin().disable() // disable form authentication
         //.anonymous().disable() // disable anonymous user
         .httpBasic().and()
         // restricting access to authenticated users
         .authorizeRequests()
         .antMatchers("/user/**").permitAll()
         .anyRequest().authenticated()
		 .and()
         .httpBasic();
         */
		 http
         .csrf().disable()
         .authorizeRequests()
         .antMatchers(HttpMethod.OPTIONS).permitAll()
         .antMatchers( HttpMethod.GET, "/","/public/**", "/resources/**"
	        				,"/resources/static/**", "/*.html", "/**/*.html", "/**/*.css", "/**/*.js").permitAll()
         .antMatchers("/user/signup").permitAll()
         .and()
             .httpBasic();
	}


}
