import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export type ButtonType = "text" | "file" | "image";

const Home: React.FC = () => {
  useEffect(() => {
    const getAddresses = async () => {
      return await axios.get("http://localhost:8080/api/v1/addresses");
    };
    getAddresses().then(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);
  return (
    <Container>
      <h2>随手传</h2>
      <Buttons>
        <ButtonLink to={"/"}>
          <Button>传文本</Button>
        </ButtonLink>
        <ButtonLink to={"/image"}>
          <Button>传图片</Button>
        </ButtonLink>
        <ButtonLink to={"/file"}>
          <Button>传文件</Button>
        </ButtonLink>
      </Buttons>
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
