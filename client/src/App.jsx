import SessionRoom from "./pages/SessionRoom";

function App() {

  const sessionId = "test-session";

  return (
    <div>
      <h1>Podcast Meeting Test</h1>

      <SessionRoom sessionId={sessionId} />
    </div>
  );
}

export default App;