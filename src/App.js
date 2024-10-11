import React, { useState } from "react";
import RouterService from "./pages/router/RouterService";
import "./App.css";

const App = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => setShowSidebar(!showSidebar);
  return (
    <div>
      <RouterService toggleSidebar={toggleSidebar} showSidebar={showSidebar} />
    </div>
  );
};

export default App;
