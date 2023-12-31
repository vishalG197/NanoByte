package com.masai.model;

import java.util.List;

public class ChatResponse {

	private List<Choice> choices;

	public List<Choice> getChoices() {
		return choices;
	}

	public void setChoices(List<Choice> choices) {
		this.choices = choices;
	}

	public ChatResponse(List<Choice> choices) {
		super();
		this.choices = choices;
	}

	public ChatResponse() {
		super();
		// TODO Auto-generated constructor stub
	}

	public static class Choice {

		private int index;
		private Message message;

		public Choice() {
			super();
			// TODO Auto-generated constructor stub
		}

		public Choice(int index, Message message) {
			super();
			this.index = index;
			this.message = message;
		}

		public int getIndex() {
			return index;
		}

		public void setIndex(int index) {
			this.index = index;
		}

		public Message getMessage() {
			return message;
		}

		public void setMessage(Message message) {
			this.message = message;
		}

	}
}
