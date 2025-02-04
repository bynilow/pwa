import { useEffect, useState } from 'react'
import styled from 'styled-components'
import './App.css'

function App() {

  const [image, setImage] = useState('');
  const [isSignIn, setIsSignIn] = useState(false);

  const [usernameReg, setUsernameReg] = useState('');
  const [username, setUsername] = useState('');
  const [rawId, setRawId] = useState<any>('');

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

  const registerSW = async () => {
    try {
      navigator.serviceWorker.register('/sw.js');
    }
    catch (error) {
      console.log(error)
    }
  }

  const SERVER_URL = 'http://localhost:3000';

  const onLogin = async () => {
    try {
      const data = await navigator.credentials.get({
        publicKey: {
          challenge: new Uint8Array([0, 1, 2, 3, 4, 5, 6]),
          allowCredentials: [
            { type: 'public-key', id: rawId }
          ]
        }
      })

      if (data) {
        setIsSignIn(true);
      }
    }
    catch (error) {
      console.log(error)
    }

  }

  const onSignUp = async () => {
    try {
      const data = await navigator.credentials.create({
        publicKey: {
          challenge: new Uint8Array([0, 1, 2, 3, 4, 5, 6]),
          rp: {
            name: 'PWA'
          },
          user: {
            id: new Uint8Array(16),
            name: username,
            displayName: username
          },
          pubKeyCredParams: [
            { type: 'public-key', alg: -7 },
            { type: 'public-key', alg: -8 },
            { type: 'public-key', alg: -257 }
          ]
        }
      });

      setRawId(data?.id || '');
    }
    catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    if (navigator.serviceWorker) {
      registerSW();
    }
  }, [])

  return (
    <Application>
      {
        image &&
        <Background>
          <Image
            src={image} />
        </Background>
      }
      <Title>PWA</Title>
      <ButtonsGroup>
        <Button onClick={onClickNotification}>
          Push notif
        </Button>
        <Button onClick={onClickGetImage}>
          Get image
        </Button>
      </ButtonsGroup>

      <Auth>
        <Form>
          <UserNameInput
            value={username}
            onChange={e => setUsername(e.target.value)} />
          <ButtonsAuth>
            <Button
              onClick={onSignUp}>
              Registration
            </Button>
            <Button
              onClick={onLogin}>
              Login
            </Button>
          </ButtonsAuth>
        </Form>
        {
          isSignIn &&
          <div>
            secret info
          </div>
        }
      </Auth>
    </Application>
  )
}

const ButtonsAuth = styled.div`
  display: flex;
  justify-content: space-between;
`

const Auth = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const UserNameInput = styled.input`
  padding: 0.5rem;
`

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  gap: 5rem;
`

export default App
