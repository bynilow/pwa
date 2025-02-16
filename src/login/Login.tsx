import { FC, FormEvent, useState } from "react";
import styled from "styled-components";
import { IUser } from "../models/IUser";

interface LoginProps {

}

const Login: FC<LoginProps> = () => {

    const [username, setUsername] = useState('');

    const onLogin = async (event: FormEvent) => {
        event.preventDefault();

        const parsedUsers: IUser[] = JSON.parse(localStorage.users);
        const foundedUser = parsedUsers.find(user => user.username === username);
        if (foundedUser && foundedUser.data) {
            try {
                const encodedStringId = new TextEncoder().encode(foundedUser.data.id);
                const data = await navigator.credentials.get({
                    publicKey: {
                        challenge: new Uint8Array(16),
                        allowCredentials: [{
                            type: 'public-key',
                            id: encodedStringId
                        }],
                    }
                })
                console.log(data)

                // const data = await navigator.credentials.get({
                //     publicKey: {
                //         challenge: new Uint8Array([0, 1, 2, 3, 4, 5, 6]),
                //         allowCredentials: [
                //             { type: 'public-key', id: sessionStorage.credId }
                //         ]
                //     }
                // })
                // if (data) {
                //     new Notification('new login');
                // }
            }
            catch (error) {
                console.log(error)
                new Notification('login failed')
            }
        } else {
            new Notification('user not found')
        }


    }

    return (
        <Form
            onSubmit={onLogin}>
            <UserNameInput
                value={username}
                onChange={e => setUsername(e.target.value)} />
            <Button
                type='submit'>
                Login
            </Button>
        </Form>
    );
}

const UserNameInput = styled.input`
  padding: 0.5rem;
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

const Form = styled.form`
    display: flex;
  flex-direction: column;
  gap: 1rem;
`

export default Login;