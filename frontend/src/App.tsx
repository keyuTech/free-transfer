import "./App.css";
import TextUpload from "./components/text-upload";
import ImageUpload from "./components/image-upload";
import FileUpload from "./components/file-upload";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    const getAddress = async () => {
      return await axios.get("/api/v1/addresses");
    };
    getAddress().then(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);
  return (
    <div className="App">
      <h2>随手传</h2>
      <Router>
        <div>
          <Nav>
            <NavList>
              <NavItem>
                <NavLink to="/text">传文本</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/image">传图片</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/file">传文件</NavLink>
              </NavItem>
            </NavList>
          </Nav>

          <Switch>
            <Route path="/text">
              <TextUpload />
            </Route>
            <Route path="/image">
              <ImageUpload />
            </Route>
            <Route path="/file">
              <FileUpload />
            </Route>
            <Route path="/">
              <TextUpload />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

const Nav = styled.nav``;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavItem = styled.li``;

const NavLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: inherit;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  line-height: 4rem;
  width: 8rem;
  cursor: pointer;
`;
export default App;
