import axios from "axios";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

export type ButtonType = "text" | "file" | "image";

const Home: React.FC = () => {
  const [type, setType] = useState<ButtonType>("text");

  const handleButtonClick = (type: ButtonType) => {
    setType(type);
  };

  return (
    <Container>
      <h2>随手传</h2>
      <Buttons>
        <ButtonLink to={"/text"}>
          <Button onClick={() => handleButtonClick("text")}>传文本</Button>
        </ButtonLink>
        <ButtonLink to={"/image"}>
          <Button onClick={() => handleButtonClick("image")}>传图片</Button>
        </ButtonLink>
        <ButtonLink to={"/file"}>
          <Button onClick={() => handleButtonClick("file")}>传文件</Button>
        </ButtonLink>
      </Buttons>
      <Outlet />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
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

const ButtonLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export default Home;
