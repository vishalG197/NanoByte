package com.masai.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.masai.model.ChatRequest;
import com.masai.model.ChatResponse;

@RestController
@CrossOrigin
public class ChatController {

	@Qualifier("openaiRestTemplate")
	@Autowired
	private RestTemplate restTemplate;

	@Value("${openai.model}")
	private String model;

	@Value("${openai.api.url}")
	private String apiUrl;

	private Map<String, List<String>> selectedQuestions = new HashMap<>();

	private List<Map<String, String>> QuestionsAndAnswers = new ArrayList<Map<String, String>>();

	private Map<String, List<String>> sectionToQuestions = new HashMap<>();

	public ChatController() {
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
	
	@GetMapping("/login")
		public String loginHandler() {
		return "Welcome";
	}
	

	@GetMapping("/questions/{section}")
	public ResponseEntity<String> getRandomQuestion(@PathVariable String section) {

		if (sectionToQuestions.containsKey(section)) {
			List<String> questions = sectionToQuestions.get(section);

			if (!selectedQuestions.containsKey(section)) {
				selectedQuestions.put(section, new ArrayList<>(questions));
			}

			List<String> remainingQuestions = selectedQuestions.get(section);

			if (remainingQuestions.isEmpty()) {
				// All questions have been asked, so prepare a chat prompt with questions and
				// answers

				return ResponseEntity.ok("There are no more questions. Click evaluate for results.");
			} else {

				Random random = new Random();
				int randomIndex = random.nextInt(remainingQuestions.size());
				String randomQuestion = remainingQuestions.remove(randomIndex);
				// Store the selected question in the QuestionsAndAnswers list
				Map<String, String> questionAndAnswer = new HashMap<>();
				questionAndAnswer.put("question", randomQuestion);
				questionAndAnswer.put("answer", ""); // Initialize the answer as an empty string
				QuestionsAndAnswers.add(questionAndAnswer);

				// questions.forEach(System.out::println);
				// System.out.println("-----------------------------------------------------------------------------");
				// remainingQuestions.forEach(System.out::println);
				// System.out.println("-----------------------------------------------------------------------------");
				// questionAndAnswer.forEach((t, u) -> System.out.println(t + ":" + u));
				// System.out.println("-----------------------------------------------------------------------------");

				return ResponseEntity.ok(randomQuestion);
			}

		}
		return ResponseEntity.notFound().build();

	}

	@PostMapping("/answer")
	public ResponseEntity<String> evaluateResponse(@RequestBody String response) {
		// Check if there are questions available for evaluation
		if (!QuestionsAndAnswers.isEmpty()) {
			// Get the latest question and answer pair
			Map<String, String> latestQuestionAndAnswer = QuestionsAndAnswers.get(QuestionsAndAnswers.size() - 1);

			// Update the answer with the response received
			latestQuestionAndAnswer.put("answer", response);

			// Here, you can send the question and answer to the chat endpoint for
			// evaluation
			StringBuilder question = new StringBuilder(latestQuestionAndAnswer.get("question"));
			StringBuilder answer = new StringBuilder(latestQuestionAndAnswer.get("answer"));

			// You can return the evaluation result as a response
			return ResponseEntity.ok(chat((question.append(" : ").append(answer)).toString()));
		} else {
			return ResponseEntity.badRequest().body("No questions available for evaluation.");
		}
	}

	@GetMapping("/evaluate")
	public ResponseEntity<String> getScore() {
		StringBuilder promptBuilder = new StringBuilder();
		promptBuilder.append("Here are the questions and answers:\n");

		for (Map<String, String> questionAndAnswer : QuestionsAndAnswers) {
			String question = questionAndAnswer.get("question");
			String answer = questionAndAnswer.get("answer");
			promptBuilder.append("Question: ").append(question).append("\n");
			promptBuilder.append("My Answer: ").append(answer).append("\n\n");
		}

		promptBuilder.append(
				"judge me based on the answers on the scale of 10, If I didn't provide logical explaination just write You have not provided a logical Explaintion for that particular question and always give marks from 1-10");

		return ResponseEntity.ok(chat(promptBuilder.toString()));
	}

}
