import "./App.css";
import React, { useEffect, useState } from "react";
function App() {

  const [dialogPages, setDialogPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const APIkay = ""
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "system", content: "This is a memory test, try to remember messenge  of user" },
  ]);
  const [isCharacterCreated, setIsCharacterCreated] = useState(false);
  const [characterInfo, setCharacterInfo] = useState({
    name: "",
    age: "",
    background: "",
  });

  async function handleCharacterSubmit(event) {
    event.preventDefault();
    if (!characterInfo.name.trim()) return;

    setIsCharacterCreated(true);

    const systemMessage = {
      role: "system",
      content: `You are the narrator of a Persona-style RPG, you must stay in character and demonstrate your world and character knowledges, but you won't talk as user at any point. The player character is named ${characterInfo.name}, age ${characterInfo.age || "unknown"}, ${characterInfo.background || "of mysterious origins"}. start with the user wakeing up in the velvet room, where they spend some time with Igor and Margaret and then wake up in the real world in the morning. Divide your answer into complete segments of 31 words or less and separate them with line breaks.`,
    };
      
    setMessages([systemMessage]);
    setIsTyping(true);
    setDialogPages(["...The story is beginning..."]);
    setCurrentPage(0);

    const aiReply = await getAIResponse([systemMessage]);
    const pages = splitIntoPages(aiReply, 31);

    setDialogPages(pages);
    setCurrentPage(0);
    setIsTyping(false);
    setMessages((prev) => [...prev, { role: "assistant", content: aiReply }]);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!userInput.trim() || isTyping) return;

    const newMessages = [
      ...messages,
      { role: "user", content: userInput },
    ];

    setMessages(newMessages);
    setUserInput("");
    setIsTyping(true);
    setDialogPages(["...The oracle is thinking..."]);
    setCurrentPage(0);

    const aiReply = await getAIResponse(newMessages);
    const pages = splitIntoPages(aiReply, 31);
    setDialogPages(pages);
    setCurrentPage(0);
    setIsTyping(false);

    setMessages([...newMessages, { role: "assistant", content: aiReply }]);
  }

  function splitIntoPages(text, wordsPerPage) {
    const words = text.split(/\s+/);
    const pages = [];
    for (let i = 0; i < words.length; i += wordsPerPage) {
      pages.push(words.slice(i, i + wordsPerPage).join(" "));
    }
    return pages;
  }
    

  async function getAIResponse(prompt) {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${APIkay}`,
        },
        body: JSON.stringify({
          model: "tngtech/deepseek-r1t2-chimera:free@preset/velvet-room",
          messages: prompt,
        }),
      });

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error fetching AI response:", error);
      return "⚠️ The oracle is silent...";
    }
  }

  
  function handleNextPage() {
    if (currentPage < dialogPages.length - 1) {
      setCurrentPage((prev) => prev + 1);
    } else {
      setDialogPages([]);
      setCurrentPage(0);
    }
  }

  const currentText = dialogPages.length > 0 ? dialogPages[currentPage] : "Now your turn.";

  return (
    <div className="App">
      <audio autoPlay loop>
        <source src="/val.mp3" type="audio/mpeg"/>
      </audio>

      <video autoPlay loop muted playsInline className="background-video">
        <source src="/VelvetRoom.mp4" type="video/mp4"/>
      </video>
  
      {!isCharacterCreated && (
        <div className="character-modal">
          <div className="modal-content">
            <h2>Create Your Character</h2>
            <form onSubmit={handleCharacterSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={characterInfo.name}
                onChange={(e) =>
                  setCharacterInfo({ ...characterInfo, name: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Age"
                value={characterInfo.age}
                onChange={(e) =>
                  setCharacterInfo({ ...characterInfo, age: e.target.value })
                }
              />
              <textarea
                placeholder="Background / Short description"
                value={characterInfo.background}
                onChange={(e) =>
                  setCharacterInfo({ ...characterInfo, background: e.target.value })
                }
              />
              <button type="submit">Begin Story</button>
            </form>
          </div>
        </div>
      )}

      {isCharacterCreated && (
      <>
        <div className="dialog-box">
          <img src="/Igor.png" className="dialog-image"/>
          <p className="dialog-text">{currentText}</p>
        </div>

        {dialogPages.length > 0 && !isTyping ? (
          <button onClick={handleNextPage} className="next-button">
            {currentPage < dialogPages.length - 1 ? "Next ▸" : "End"}
          </button>
        ) : (

        <form onSubmit={handleSubmit} className="input-area">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message..."
              className="input-field"
            />
            <button type="submit" className="submit-button" disabled={isTyping}>
              Send
            </button>
          </form>
            )}
        </>
      )}
    </div>
  );
}

export default App;
