import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import TextUpload from "./pages/text-upload";
import ImageUpload from "./pages/image-upload";
import FileUpload from "./pages/file-upload";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/text" index element={<TextUpload />} />
          <Route path="/image" element={<ImageUpload />} />
          <Route path="/file" element={<FileUpload />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
