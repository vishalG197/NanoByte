package com.masai.model;

import java.util.ArrayList;
import java.util.List;

public class ChatRequest {

	private String model;
	private List<Message> messages;
	private int n;
	private double temperature;

	/**
	 * this constructor is used to create a ChatRequest object, which represents a
	 * request for a chat conversation. It initializes the model field, sets up an
	 * initial user message, and prepares the messages list to hold the
	 * conversation's messages. The constructor essentially helps in setting up the
	 * initial state of a ChatRequest object with the provided model and user
	 * prompt.
	 */
	public ChatRequest(String model, String prompt) {
		this.model = model;

		this.messages = new ArrayList<>();
		this.messages.add(new Message("user", prompt));
	}

	public ChatRequest() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ChatRequest(String model, List<Message> messages, int n, double temperature) {
		super();
		this.model = model;
		this.messages = messages;
		this.n = n;
		this.temperature = temperature;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public List<Message> getMessages() {
		return messages;
	}

	public void setMessages(List<Message> messages) {
		this.messages = messages;
	}

	public int getN() {
		return n;
	}

	public void setN(int n) {
		this.n = n;
	}

	public double getTemperature() {
		return temperature;
	}

	public void setTemperature(double temperature) {
		this.temperature = temperature;
	}

}
