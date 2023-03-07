import { FormEvent } from "react";
import styled from "styled-components";

const FileUpload: React.FC = () => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>点击选择文件</div>
      <input type={"file"} multiple />
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

export default FileUpload;
