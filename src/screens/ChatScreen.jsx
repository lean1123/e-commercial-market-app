import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { chatSession } from "../configurations/AIModel"; // Import chatSession directly

// Function to create a prompt with the entire conversation history
const createPrompt = (messages) => {
  let conversationHistory = messages
    .map((message) => `${message.sender}: ${message.text}`)
    .join("\n");

  const prompt = `
  You are an AI chatbot for an e-commerce app specializing in clothing size recommendations. 
  Answer customer queries in a helpful and friendly tone. 
  Bilingual English and Vietnamese.
  If the customer asks in Vietnamese, you should answer in Vietnamese.
  If the customer asks in English, you should answer in English.

  
  Your responsibilities include:
  1. Extracting customer details like height and weight from their messages.
  2. Providing size recommendations based on height and weight.
  3. Don't ask for product details, assume the customer is asking for a general size recommendation.
  4. If type of product is shoes, ask for foot length.

  
  Previous conversation:
  ${conversationHistory}
  
  Customer: ${messages[messages.length - 1].text}
  `;
  return prompt;
};

export default function ChatScreen() {
  const [messages, setMessages] = useState([]); // Chat history
  const [input, setInput] = useState(""); // User input
  const [loading, setLoading] = useState(false); // Loading state

  // Function to handle sending a message
  const sendMessage = async () => {
    if (!input.trim() || loading) return; // Ignore empty input or ongoing request

    const userMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]); // Add user message to chat
    setInput(""); // Clear input field
    setLoading(true); // Start loading

    if (input.toLowerCase() === "/clear") {
      // Clear chat history
      setMessages([]);
      setLoading(false);
      return;
    }

    try {
      const prompt = createPrompt([...messages, userMessage]); // Pass entire conversation history
      const result = await chatSession.sendMessage(prompt); // Call chatSession here
      const botMessage = { sender: "bot", text: result.response.text() };

      setMessages((prevMessages) => [...prevMessages, botMessage]); // Add bot response to chat
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        sender: "bot",
        text: "Sorry, something went wrong.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Render a single chat message
  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "user" ? styles.userMessage : styles.botMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.chatList}
      />
      {loading && (
        <ActivityIndicator size="large" color="#0078d7" style={styles.loader} />
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type your message..."
          value={input}
          onChangeText={setInput}
          editable={!loading} // Disable input while loading
        />
        <TouchableOpacity
          style={[styles.sendButton, loading && styles.disabledButton]}
          onPress={sendMessage}
          disabled={loading} // Disable button while loading
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  chatList: { padding: 10 },
  messageContainer: {
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    maxWidth: "80%",
  },
  userMessage: { alignSelf: "flex-end", backgroundColor: "#0078d7" },
  botMessage: { alignSelf: "flex-start", backgroundColor: "#0078d7" },
  messageText: { color: "#fff" },
  loader: { marginVertical: 10, alignSelf: "center" },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#0078d7",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  sendButtonText: { color: "#fff", fontWeight: "bold" },
});
