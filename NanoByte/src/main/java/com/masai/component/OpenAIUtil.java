package com.masai.component;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class OpenAIUtil {

	@Value("${openai.api.key}")
	private String apiKey;

	/** OpenAI API endpoint */
	private static final String OPENAI_API_URL = "https://api.openai.com/v1/engines/davinci-codex/completions";

	public String getFeedback(String response) {

		/** Prepare headers */
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "Bearer " + apiKey);
		headers.set("Content-Type", "application/json");

		/** Prepare request body */
		Map<String, Object> requestBody = new HashMap<>();
		requestBody.put("prompt", response);
		requestBody.put("max_tokens", 50); // Adjust max tokens as needed

		/** Create the request entity */
		HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

		/** Make the API call */
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<Map> responseEntity = restTemplate.exchange(OPENAI_API_URL, HttpMethod.POST, requestEntity,
				Map.class);

		/** Extract feedback from the response */
		@SuppressWarnings("unchecked")
		Map<String, Object> responseBody = responseEntity.getBody();
		String feedback = responseBody.get("choices").toString();

		return feedback;
	}

	public String generatePromptForSection(String section) {
	    // Define prompts for each section based on your requirements
	    if ("mern".equals(section)) {
	        return "Generate a MERN-related interview question.";
	    } else if ("nodejs".equals(section)) {
	        return "Generate a Node.js backend-related interview question.";
	    } else if ("java".equals(section)) {
	        return "Generate a Java Spring Boot-related interview question.";
	    } else {
	        return "Invalid section.";
	    }
	}

	public String generateQuestionFromPrompt(String prompt) {
	    return "Generated interview question based on the prompt: " + prompt;
	}

}
