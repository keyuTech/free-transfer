import { useState } from "react";
import "./App.css";
import styled from "styled-components";
import axios from "axios";

type ButtonType = "text" | "file" | "picture";

function App() {
  const [type, setType] = useState<ButtonType>("text");

  const handleButtonClick = (type: ButtonType) => {
    setType(type);
  };

  const handleUpload = () => {
    if (type === "text") {
      axios.post("/api/v1/texts", { raw: "123" });
    }
  };

  return (
    <div className="App">
      <h2>随手传</h2>
      <Buttons>
        <Button onClick={() => handleButtonClick("text")}>传文本</Button>
        <Button onClick={() => handleButtonClick("file")}>传文件</Button>
        <Button onClick={() => handleButtonClick("picture")}>传图片</Button>
      </Buttons>
      <Container>
        {type === "text" && <textarea cols={70} rows={20}></textarea>}
        {type === "file" && <div>点击选择文件</div>}
        {type === "picture" && <div>点击选择图片</div>}
      </Container>
      <UploadButton onClick={handleUpload}>上传</UploadButton>
    </div>
  );
}

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.div`
  width: 8rem;
  font-size: 1.4rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 0 2rem;
  line-height: 3rem;
  cursor: pointer;
`;

const Container = styled.div`
  margin-top: 2rem;
`;

const UploadButton = styled.button``;

export default App;
