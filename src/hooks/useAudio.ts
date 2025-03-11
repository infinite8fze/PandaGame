import { useState, useCallback, useRef, useEffect } from "react";

// Define the SpeechRecognition type
interface Window {
  webkitSpeechRecognition: any;
  SpeechRecognition: any;
}

declare const window: Window;

// Default responses based on room context
const defaultResponses = {
  school: [
    "Welcome to our magical school! What would you like to learn today?",
    "The school is my favorite place to learn new things. What would you like to know about?",
    "Did you see that floating spell book? Magic is in the air!",
    "Learning is always more fun with a little bit of magic!",
  ],
  kitchen: [
    "Something smells delicious! I'm cooking up a magical feast.",
    "Would you like to help me stir this magical potion... I mean, soup!",
    "Watch out for the steam! It's not just regular steam, it's magical steam.",
    "The kitchen is where all the magical ingredients come together.",
  ],
  bathroom: [
    "Look at all these magical bubbles floating around!",
    "The water here has special magical properties, perfect for bubble baths.",
    "Even magical creatures need to stay clean!",
    "Watch the bubbles dance in the air, isn't it magical?",
  ],
  playroom: [
    "This is where all the fun magical games happen!",
    "Look at that floating toy! Magic makes playtime extra special.",
    "Want to play a magical game together?",
    "The toys here come to life with a little bit of magic!",
  ],
  default: [
    "I'm here to help make everything magical!",
    "Magic is everywhere around us!",
    "Let's create some magical moments together!",
    "What magical adventure shall we go on next?",
  ],
};

// Check if speech recognition is supported
const isSpeechRecognitionSupported = () => {
  return "webkitSpeechRecognition" in window || "SpeechRecognition" in window;
};

// Check if speech synthesis is supported
const isSpeechSynthesisSupported = () => {
  return "speechSynthesis" in window;
};

// Add natural pauses to text
const addNaturalPauses = (text: string): string => {
  return text
    .replace(/\./g, "... ")
    .replace(/\!/g, "!... ")
    .replace(/\?/g, "?... ")
    .replace(/,/g, ", ")
    .trim();
};

export function useAudio(currentRoom: string = "school") {
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastMessage, setLastMessage] = useState<string>("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognition = useRef<any>(null);
  const [isSupported, setIsSupported] = useState(
    isSpeechRecognitionSupported()
  );
  const [selectedVoice, setSelectedVoice] =
    useState<SpeechSynthesisVoice | null>(null);
  const currentUtterance = useRef<SpeechSynthesisUtterance | null>(null);
  const messageTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const speechQueue = useRef<string[]>([]);
  const isStoppingIntentionally = useRef(false);

  // Initialize and select the best voice for children
  useEffect(() => {
    const initVoice = () => {
      if (!isSpeechSynthesisSupported()) return;

      const voices = window.speechSynthesis.getVoices();
      const bestVoice =
        voices.find(
          (voice) => voice.name.includes("Zira") && voice.lang.startsWith("en")
        ) ||
        voices.find(
          (voice) =>
            voice.lang.startsWith("en") && voice.name.includes("Female")
        ) ||
        voices.find((voice) => voice.lang.startsWith("en")) ||
        voices[0];

      setSelectedVoice(bestVoice || null);
    };

    if (window.speechSynthesis.getVoices().length) {
      initVoice();
    } else {
      window.speechSynthesis.onvoiceschanged = initVoice;
    }

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
      stopSpeaking();
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
      if (recognition.current) {
        recognition.current.abort();
      }
      setLastMessage("");
    };
  }, []);

  const getRandomResponse = (room: string) => {
    const responses = defaultResponses[room] || defaultResponses.default;
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  };

  const stopSpeaking = () => {
    isStoppingIntentionally.current = true;
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    if (currentUtterance.current) {
      currentUtterance.current = null;
    }
    setIsSpeaking(false);
    speechQueue.current = [];
    // Reset the flag after a short delay
    setTimeout(() => {
      isStoppingIntentionally.current = false;
    }, 100);
  };

  const speakText = (text: string) => {
    if (!isSpeechSynthesisSupported()) {
      console.warn("Speech synthesis not supported");
      return;
    }

    speechQueue.current.push(text);
    setIsSpeaking(true);

    const processNextInQueue = () => {
      if (speechQueue.current.length === 0) {
        setIsSpeaking(false);
        return;
      }

      const textToSpeak = speechQueue.current.shift()!;

      try {
        const processedText = addNaturalPauses(textToSpeak);
        const utterance = new SpeechSynthesisUtterance(processedText);
        currentUtterance.current = utterance;

        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }

        utterance.rate = 0.85;
        utterance.pitch = 1.1;
        utterance.volume = 0.95;

        utterance.onboundary = (event) => {
          if (event.name === "word") {
            utterance.pitch = 1.1 + (Math.random() * 0.1 - 0.05);
          }
        };

        utterance.onerror = (event: SpeechSynthesisErrorEvent) => {
          // Only log errors if they're not from intentional interruption
          if (
            !isStoppingIntentionally.current &&
            event.error !== "interrupted"
          ) {
            console.error("Speech synthesis error:", event);
          }
          currentUtterance.current = null;
          setIsSpeaking(false);
          processNextInQueue();
        };

        utterance.onend = () => {
          currentUtterance.current = null;
          if (messageTimeoutRef.current) {
            clearTimeout(messageTimeoutRef.current);
          }
          messageTimeoutRef.current = setTimeout(() => {
            setLastMessage("");
          }, 1000);

          processNextInQueue();
        };

        window.speechSynthesis.speak(utterance);
      } catch (error) {
        console.error("Speech synthesis error:", error);
        currentUtterance.current = null;
        setIsSpeaking(false);
        processNextInQueue();
      }
    };

    if (!window.speechSynthesis.speaking) {
      processNextInQueue();
    }
  };

  const startRecording = useCallback(async () => {
    console.log("start recording");
    // setIsRecording(true);
    if (!isSupported) {
      return;
    }

    // Stop any ongoing speech when the user starts talking
    stopSpeaking();
    if (recognition.current) {
      recognition.current.abort();
      recognition.current = null;
    }

    try {
      const SpeechRecognition =
        window.webkitSpeechRecognition || window.SpeechRecognition;
      recognition.current = new SpeechRecognition();

      recognition.current.lang = "en-US";
      recognition.current.continuous = false;
      recognition.current.interimResults = false;

      recognition.current.onresult = async (event: any) => {
        const transcript = event.results[0][0].transcript;
        console.log("Recognized text:", transcript);
        setIsLoading(true);

        try {
          const response = await fetch(
            "https://panda.kidodo.games/api/v1/toki/response",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ question: transcript }),
            }
          );

          if (!response.ok) {
            throw new Error("API request failed");
          }

          const jsonResponse = await response.json();
          const responseText = jsonResponse.data;
          setLastMessage(responseText);
          speakText(responseText);
        } catch (apiError) {
          console.error("API Error:", apiError);
          const defaultResponse = getRandomResponse(currentRoom);
          setLastMessage(defaultResponse);
          speakText(defaultResponse);
        } finally {
          setIsLoading(false);
        }
      };

      recognition.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        const errorMessage =
          event.error === "network"
            ? "Oops! I had a little trouble hearing you. Let's try again!"
            : "I didn't quite catch that. Can you say it again?";

        setLastMessage(errorMessage);
        // setIsRecording(false);
        recognition.current = null;

        const defaultResponse = getRandomResponse(currentRoom);
        setTimeout(() => {
          setLastMessage(defaultResponse);
          speakText(defaultResponse);
        }, 2000);
      };

      recognition.current.onend = () => {
        setIsRecording(false);
        recognition.current = null;
      };

      recognition.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
      setLastMessage("I can't hear you right now. Let's try again!");
      setIsRecording(false);
      recognition.current = null;
    }
  }, [currentRoom, isSupported, selectedVoice]);
  const stopRecording = useCallback(() => {
    if (recognition.current) {

      recognition.current.stop();
      recognition.current = null;
      setIsRecording(false);
    }
  }, []);

  return {
    isRecording,
    isLoading,
    isSpeaking,
    startRecording,
    stopRecording,
    lastMessage,
    isSupported,
  };
}
