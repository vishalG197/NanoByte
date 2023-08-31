package com.masai.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.masai.component.OpenAIUtil;

@RestController
@RequestMapping("/api/interview")
public class InterviewController {

	@Autowired
	private OpenAIUtil openAIUtil;

	private Map<String, List<String>> sectionToQuestions = new HashMap<>();

	public InterviewController() {
		sectionToQuestions.put("mern", Arrays.asList(
				"Can you please introduce yourself and provide an overview of your experience working with the MERN stack? Highlight any notable projects or challenges you've tackled.",
				"What is MERN stack? Explain the components of MERN.",
				"How does React Router differ from traditional routing?", "What is JSX? How does it differ from HTML?",
				"Explain the concept of state and props in React."));

		sectionToQuestions.put("nodejs", Arrays.asList(
				"To start, could you briefly introduce yourself and give us an overview of your background as a Node.js backend developer?",
				"What is Node.js? How does it differ from traditional server-side technologies?",
				"How does Node.js handle asynchronous operations? Provide an example.",
				"Explain the concept of the event loop in Node.js.",
				"What is the purpose of middleware in an Express.js application?"));

		sectionToQuestions.put("java", Arrays.asList(
				"Let's begin with a brief introduction. Could you share your background as a Java developer with a focus on Spring Boot?",
				"What is Spring Framework? How does Spring Boot simplify application development?",
				"Explain the concept of inversion of control (IoC) in the context of Spring.",
				"What is dependency injection? How is it achieved in Spring?",
				"Describe the annotations @Component, @Service, @Repository, and @Controller in Spring."));
	}

	private Map<String, List<String>> selectedQuestions = new HashMap<>();

	@GetMapping("/question/{section}")
	public ResponseEntity<String> getRandomQuestion(@PathVariable String section) {

		if (sectionToQuestions.containsKey(section)) {
			List<String> questions = sectionToQuestions.get(section);
			if (!selectedQuestions.containsKey(section)) {
				selectedQuestions.put(section, new ArrayList<>(questions));
			}

			List<String> remainingQuestions = selectedQuestions.get(section);

			if (remainingQuestions.isEmpty()) {
				return ResponseEntity.ok("No more questions available for this section.");
			}

			Random random = new Random();
			int randomIndex = random.nextInt(remainingQuestions.size());
			String randomQuestion = remainingQuestions.remove(randomIndex);

			return ResponseEntity.ok(randomQuestion);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@PostMapping("/evaluate")
	public ResponseEntity<String> evaluateResponse(@RequestBody String response) {
		String feedback = openAIUtil.getFeedback(response);
		return ResponseEntity.ok(feedback);
	}
}
