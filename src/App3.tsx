import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.bgColor};
`;

const Form = styled.form`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 300px;
  height: 30px;
  padding: 0;
`;

const Button = styled.button`
  width: 100px;
  height: 30px;
  background-color: ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.textColor};
  margin-left: 10px;
`;

function App() {
  const [value, setValue] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    // console.log(event.currentTarget.value); //타입 스크립트에서는 currenttarget을 이용
    // setValue(event.currentTarget.value);
    console.log(event);
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("hello", value);
  };

  const [themeMode, setThememode] = useState(lightTheme);
  const [themeText, setThemetext] = useState("다크모드");

  const themeModeClick = () => {
    themeMode === lightTheme
      ? setThememode(darkTheme)
      : setThememode(lightTheme);
    themeMode === lightTheme
      ? setThemetext("화이트모드")
      : setThemetext("다크모드");
  };

  return (
    <ThemeProvider theme={themeMode}>
      <Container>
        <Button onClick={themeModeClick}>{themeText}</Button>
        <Form onSubmit={onSubmit}>
          <Input
            value={value}
            onChange={onChange}
            type="text"
            placeholder="username"
          />
          <Button>로그인</Button>
        </Form>
      </Container>
    </ThemeProvider>
  );
}

export default App;
