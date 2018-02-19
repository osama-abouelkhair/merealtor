package com.merealator.merealator.config;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.web.util.matcher.RequestMatcher;

@Configuration
@EnableResourceServer
// @EnableGlobalMethodSecurity(prePostEnabled=true)
// @Order(3)
public class ResourceConfig extends ResourceServerConfigurerAdapter {

	@Value("${security.jwt.resource-ids}")
	private String resourceId;

	// The DefaultTokenServices bean provided at the AuthorizationConfig
	@Autowired
	private DefaultTokenServices tokenServices;

	// The TokenStore bean provided at the AuthorizationConfig
	@Autowired
	private TokenStore tokenStore;

	// To allow the rResourceServerConfigurerAdapter to understand the token,
	// it must share the same characteristics with
	// AuthorizationServerConfigurerAdapter.
	// So, we must wire it up the beans in the ResourceServerSecurityConfigurer.
	@Override
	public void configure(ResourceServerSecurityConfigurer resources) {
		resources.resourceId(resourceId).tokenServices(tokenServices).tokenStore(tokenStore);
	}

	@Override
	public void configure(HttpSecurity http) throws Exception {
		http
				.anonymous().and()
				.csrf().disable()
				.authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS).permitAll()
				.antMatchers(HttpMethod.GET, "/", "/public/**", "/resources/**", "/resources/static/**", "/*.html",
						"/**/*.html", "/**/*.css", "/**/*.js", "/**/*.png").permitAll()		
				.antMatchers("/user/signup").hasAuthority("ROLE_TRUSTED_CLIENT")
				.antMatchers(HttpMethod.GET, "/user/userdetails").hasRole("USER")
				.antMatchers("/**").authenticated();
		
	}

	private static class OAuthRequestedMatcher implements RequestMatcher {
		public boolean matches(HttpServletRequest request) {
			// Determine if the resource called is "/api/**"
			String path = request.getServletPath();
			// if ( path.length() >= 5 ) {
			// path = path.substring(0, 5);
			boolean isApi = path.equals("/realestate");
			return isApi;
			// }
			// else {
			// return false;
			// }
		}
	}
}