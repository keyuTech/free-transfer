import { ChangeEvent, FormEvent } from "react";
import styled from "styled-components";

const ImageUpload: React.FC = () => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.target);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>点击选择图片</div>
      <input
        type={"file"}
        name={"image"}
        accept={"image/gif,image/jpeg,image/jpg,image/png,image/svg"}
        multiple
        onChange={handleChange}
      />
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

export default ImageUpload;
