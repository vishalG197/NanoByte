package com.masai.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class OpenAIRestTemplateConfig {

	@Value("${openai.api.key}")
	private String openaiApiKey;

	
	/*
	 * Here, we added an interceptor to the base RestTemplate and added the
	 * Authorization header.
	 */
	@Bean
	@Qualifier("openaiRestTemplate")
	public RestTemplate openaiRestTemplate() {
		RestTemplate restTemplate = new RestTemplate();
		restTemplate.getInterceptors().add((request, body, execution) -> {
			request.getHeaders().add("Authorization", "Bearer " + openaiApiKey);
			return execution.execute(request, body);
		});
		return restTemplate;
	}
}