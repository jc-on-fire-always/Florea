import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { matchPerfumes } from "../utils";
import perfumesData from "../assets/data/perfumes.js";

// Container for the full chat interface
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

// Message area (scrollable)
const MessageArea = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
`;

// Message bubble
const Message = styled.div`
  align-self: ${(props) => (props.type === "user" ? "flex-end" : "flex-start")};
  background-color: ${(props) =>
    props.type === "user" ? "#000000" : "#2c3e50"};
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  max-width: 80%;
  white-space: pre-wrap;
  font-size: 0.95rem;
`;

// Input bar wrapper
const InputBar = styled.div`
  display: flex;
  padding: 1rem;
  border-top: 1px solid ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.body};
`;

// Input field
const Input = styled.input`
  flex-grow: 1;
  padding: 0.75rem;
  border: 1px solid #666;
  border-radius: 8px;
  background-color: transparent;
  color: ${(props) => props.theme.text};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #aaa;
  }
`;

// Send button
const Button = styled.button`
  margin-left: 0.75rem;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.2rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;

export default function ChatBot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [perfumes, setPerfumes] = useState([]);

  useEffect(() => {
    setPerfumes(perfumesData);
    setMessages([
      {
        type: "bot",
        text: "👋 Welcome! I can help you find the perfect perfume.\n\nYou can describe your preferences like:\n- Gender (e.g., male, female, unisex)\n- Season (e.g., summer, winter)\n- Occasion (e.g., casual, formal, date night)\n- Notes (e.g., woody, citrus, floral)\n\nTry something like:\n👉 'Suggest a perfume for a summer evening for men with woody notes.'",
      },
    ]);
  }, []);

  const parsePreferences = (input) => {
    const lowerInput = input.toLowerCase();
    const gender = /male|female|unisex/.exec(lowerInput)?.[0];
    const season = /spring|summer|fall|winter/.exec(lowerInput)?.[0];
    const occasion = /casual|evening|party|daytime/.exec(lowerInput)?.[0];
    const knownNotes = [
      "citrus",
      "musk",
      "rose",
      "amber",
      "woody",
      "vanilla",
      "mint",
      "jasmine",
      "lavender",
      "cedar",
      "sandalwood",
      "patchouli",
      "vetiver",
      "tea",
      "herbs",
      "floral",
    ];
    const notes = knownNotes.filter((note) => lowerInput.includes(note));
    return { gender, season, occasion, notes };
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { type: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const prefs = parsePreferences(input);
    const results = matchPerfumes(prefs, perfumes);

    let botReply;
    if (results.length === 0) {
      botReply = {
        type: "bot",
        text: "Sorry, I couldn’t find a matching perfume. Want to try again?",
      };
    } else {
      botReply = {
        type: "bot",
        text:
          "Here is what I recommend:\n" +
          results
            .slice(0, 3)
            .map((p) => `✨ ${p.name}`)
            .join("\n"),
      };
    }

    setMessages((prev) => [...prev, botReply]);
    setInput("");
  };

  return (
    <Wrapper>
      <MessageArea>
        {messages.map((msg, idx) => (
          <Message key={idx} type={msg.type}>
            {msg.text}
          </Message>
        ))}
      </MessageArea>
      <InputBar>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Describe your preferences..."
        />
        <Button onClick={handleSend}>Send</Button>
      </InputBar>
    </Wrapper>
  );
}
