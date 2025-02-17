import { useState } from 'react';
import styled from 'styled-components';
import './App.css';
import DynamicBlock from './components/dynamic/DynamicBlock';
import Login from './components/login/Login';
import Registration from './components/registration/Registration';
import BitcoinPrice from './components/bitcoinPrice/BitcoinPrice';

function App() {

  const [image, setImage] = useState('');

  const onClickNotification = () => {
    try {
      Notification.requestPermission();
      new Notification('hello world')
    }
    catch (error) {
      console.log(error)
    }
  }

  const onClickGetImage = async () => {
    try {
      const pickerOptions = {
        types: [
          {
            description: "Images",
            accept: {
              "image/*": [".png", ".jpeg", ".jpg"],
            },
          },
        ],
        excludeAcceptAllOption: true,
        multiple: false,
      };
      // @ts-ignore
      const [fileHandler] = await window.showOpenFilePicker(pickerOptions);
      const file = await fileHandler.getFile();
      const buffer = await file.arrayBuffer();
      const url = URL.createObjectURL(new Blob([buffer]));
      setImage(url);
      console.log(buffer, url);
    }
    catch (error) {
      console.log(error);
    }
  }

  // const SERVER_URL = 'http://localhost:3000';


  return (
    <Application>
      {
        image &&
        <Background>
          <Image
            src={image} />
        </Background>
      }

      <CatImage
        src='images/cat.png' />

      <Title>PWA build 1</Title>

      <BitcoinPrice />

      <DynamicBlock />

      <ButtonsGroup>
        <Button onClick={onClickNotification}>
          Push notif
        </Button>
        <Button onClick={onClickGetImage}>
          Get image
        </Button>
      </ButtonsGroup>

      {
        navigator.credentials
        && <Auth>
          <Registration />
          <Login />
        </Auth>
      }
    </Application>
  )
}

const CatImage = styled.img`
  width: 10rem;
  height: 10rem;
`

const Auth = styled.div`
  display: flex;
  gap: 2rem;
  border: 1px solid black;
  border-radius: 15px;
  padding: 1rem;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  filter: blur(5px);
`

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  
  &::after{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ffffffa9;
  }
`

const Button = styled.button`
  background-color: #bdbdbd;
  border: none;
  padding: 1rem;
  border-radius: 0.5rem;

  transition: 0.1s;

  &:hover{
    transform: scale(1.05);
    background-color: #363636;
    color: white;
    cursor: pointer;
  }

  &:focus{
    outline: none;
  }
`

const ButtonsGroup = styled.div`
  display: flex;
  gap: 1rem;
  border: 1px solid black;
  border-radius: 15px;
  padding: 1rem;
`

const Title = styled.h1`
  font-size: 4rem;
`

const Application = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`

export default App
