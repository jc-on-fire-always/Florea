import styled from "styled-components";
import ChatBot from "./Chatbot";
import { X } from "lucide-react"; // For a close icon

const DrawerOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 997;
  display: ${(props) => (props.open ? "block" : "none")};
`;

const Drawer = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 350px;
  max-width: 90vw;
  height: 80vh;
  background: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  z-index: 998;
  border-radius: 1rem 1rem 0 0;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.4);
  transform: ${(props) => (props.open ? "translateY(0)" : "translateY(100%)")};
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const CloseButton = styled.button`
  align-self: flex-end;
  margin: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.text};
  font-size: 1.2rem;
`;

export default function ChatbotDrawer({ isOpen, onClose }) {
  return (
    <>
      <DrawerOverlay open={isOpen} onClick={onClose} />
      <Drawer open={isOpen}>
        <CloseButton onClick={onClose}>
          <X size={20} />
        </CloseButton>
        <ChatBot />
      </Drawer>
    </>
  );
}
