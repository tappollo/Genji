import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  display: flex;
  background-color: #f8f8f8;
  align-items: center;
  justify-content: center;
`;

const AnimationArea = styled.div`
  display: flex;
  position: relative;
  align-items: center;
`;

const Image = styled.img`
  width: 391px;
  height: 662px;
  opacity: 1;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  opacity: 1;
  margin-left: -20px;
`;

const Title = styled.span`
  display: flex;
  font-size: 20px;
  color: #333333;
  font-family: Arial, Helvetica, sans-serif;
`;

const Subtitle = styled.span`
  margin-top: 2px;
  font-size: 17px;
  color: #888888;
  font-family: Arial, Helvetica, sans-serif;
`;

const Contact = styled.span`
  margin-top: 10px;
  font-size: 13px;
  color: #DDDDDD;
  font-family: Arial, Helvetica, sans-serif;
`;

const AppStore = styled.img.attrs({
  src: require('./appstore.svg')
})`
  margin-top: 10px;
  width: 120px;
  height: 40px;
`;

class App extends Component {
  render() {
    return (
      <Container>
        <AnimationArea>
          <Image src={require("./phone.png")} />
          <Content>
            <Title>Genji</Title>
            <Subtitle>Github trending repo app</Subtitle>
            <AppStore />
            <Contact>Contact: zhigang1992@gmail.com</Contact>
          </Content>
        </AnimationArea>
      </Container>
    );
  }
}

export default App;
