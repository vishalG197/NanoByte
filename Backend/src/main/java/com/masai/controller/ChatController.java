package com.masai.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.masai.model.ChatRequest;
import com.masai.model.ChatResponse;

@RestController
public class ChatController {

	@Qualifier("openaiRestTemplate")
	@Autowired
	private RestTemplate restTemplate;

	@Value("${openai.model}")
	private String model;

	@Value("${openai.api.url}")
	private String apiUrl;

	@GetMapping("/chat")
	public String chat(@RequestParam String prompt) {

		/** create a request */
		ChatRequest request = new ChatRequest(model, prompt);
		request.setN(1); // Set the value of 'n'

		/** call the API */
		ChatResponse response = restTemplate.postForObject(apiUrl, request, ChatResponse.class);

		if (response == null || response.getChoices() == null || response.getChoices().isEmpty()) {
			return "No response";
		}

		/** return the first response */
		return response.getChoices().get(0).getMessage().getContent();
	}

}