import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ResumeDetailPage from "./pages/ResumeDetailPage";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/resumes/:id"
          element={<ResumeDetailPage />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;