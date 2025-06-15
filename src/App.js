import "locomotive-scroll/dist/locomotive-scroll.css";
import { AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import Loader from "./components/Loader";
import ChatbotDrawer from "./components/ChatbotDrawer";
import ScrollTriggerProxy from "./components/ScrollTriggerProxy";
import { FaComments } from "react-icons/fa";
import About from "./sections/About";
import { FaGoogle } from "react-icons/fa";
import Footer from "./sections/Footer";
import Home from "./sections/Home";
import Marquee from "./sections/Marquee";
import NewArrival from "./sections/NewArrival";
import Shop from "./sections/Shop";
import GlobalStyles from "./styles/GlobalStyles";
import { dark } from "./styles/Themes";
import { auth } from "./firebase";
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const ChatButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: #000000;
  color: white;
  padding: 1rem;
  border-radius: 50%;
  font-size: 1.5rem;
  border: none;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  &:hover {
    background: #222222;
  }
`;
function Login() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; // Restore on unmount
    };
  }, []);
  const googleProvider = new GoogleAuthProvider();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Signed in user:", user.displayName, user.email);
    } catch (error) {
      console.error("Google sign-in error", error);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        overflow: "hidden",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
        color: "#fff",
        padding: "1rem",
        textAlign: "center",
      }}
    >
      <h2
        style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.5rem" }}
      >
        Welcome to Floréa
      </h2>
      <p style={{ fontSize: "1.1rem", color: "#ccc", marginBottom: "1.5rem" }}>
        Please sign in with Google to continue
      </p>
      <button
        onClick={handleLogin}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          backgroundColor: "#808080",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          fontWeight: "500",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          cursor: "pointer",
          transition: "background-color 0.3s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#b3b3b3")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#808080")}
      >
        <FaGoogle color="white" />
        Sign in with Google
      </button>
    </div>
  );
}

function App() {
  const containerRef = useRef(null);
  const [Loaded, setLoaded] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [user, setUser] = useState(null); // <- Track user

  // Listen for auth changes
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 3000);
  }, []);

  if (!user) {
    return <Login />;
  }

  return (
    user && (
      <>
        <GlobalStyles />
        <ThemeProvider theme={dark}>
          <LocomotiveScrollProvider
            options={{
              smooth: true,
              // ... all available Locomotive Scroll instance options
              smartphone: {
                smooth: true,
              },
              tablet: {
                smooth: true,
              },
            }}
            watch={
              [
                //..all the dependencies you want to watch to update the scroll.
                //  Basicaly, you would want to watch page/location changes
                //  For exemple, on Next.js you would want to watch properties like `router.asPath` (you may want to add more criterias if the instance should be update on locations with query parameters)
              ]
            }
            containerRef={containerRef}
          >
            <AnimatePresence>{Loaded ? null : <Loader />}</AnimatePresence>
            <main className="App" data-scroll-container ref={containerRef}>
              <ScrollTriggerProxy />
              <AnimatePresence>
                {Loaded ? null : <Loader />}

                <Home key="home" />
                <About key="about" />
                <Shop key="Shop" />
                <Marquee key="marquee" />
                <NewArrival key="new arrival" />
                <Footer key="Footer" />
              </AnimatePresence>
            </main>
          </LocomotiveScrollProvider>

          {!isChatOpen && Loaded && (
            <ChatButton onClick={() => setIsChatOpen(true)} title="Chat">
              <FaComments />
            </ChatButton>
          )}

          <ChatbotDrawer
            isOpen={isChatOpen}
            onClose={() => setIsChatOpen(false)}
          />
        </ThemeProvider>
      </>
    )
  );
}

export default App;
