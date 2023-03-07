import axios from "axios";
import { FormEvent, useState } from "react";
import styled from "styled-components";

const TextUpload: React.FC = () => {
  const [text, setText] = useState<string>();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) return;
    await axios.post("/api/v1/texts", { raw: text });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <textarea
        cols={70}
        rows={20}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <SubmitButton>
        <Button type={"submit"}>上传</Button>
      </SubmitButton>
    </Form>
  );
};

const Form = styled.form``;

const SubmitButton = styled.div`
  margin-top: 2rem;
`;

const Button = styled.button``;

export default TextUpload;
