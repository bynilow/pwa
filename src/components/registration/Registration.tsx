import { FC, FormEvent, useState } from "react";
import styled from "styled-components";
import { sendNotification } from "../../functions/setNotifications";

interface RegistrationProps {

}

const Registration: FC<RegistrationProps> = () => {

    const [username, setUsername] = useState('');

    const onSignUp = async (event: FormEvent) => {
        event.preventDefault();

        try {
            const options: CredentialCreationOptions = {
                publicKey: {
                    challenge: new Uint8Array(22),
                    rp: {
                        name: 'PWA',
                        id: window.location.hostname
                    },
                    user: {
                        id: new Uint8Array(22),
                        name: username,
                        displayName: username
                    },
                    pubKeyCredParams: [
                        { type: 'public-key', alg: -7 },
                        { type: "public-key", alg: -257 }
                    ],
                    timeout: 60000,
                    authenticatorSelection: { residentKey: "preferred", requireResidentKey: false, userVerification: "preferred" },
                    attestation: "none",
                    extensions: { credProps: true }
                }
            };

            const data = await navigator.credentials.create(options);
            console.log('created creds: ', data)
            ///@ts-ignore
            let users = window.users;
            if (users) {
                ///@ts-ignore
                window.users.push({ username, data });
            } else {
                ///@ts-ignore
                window.users = [{ username, data }];
            }

            sendNotification('registration success!');
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <Form
            onSubmit={onSignUp}>
            <UserNameInput
                value={username}
                onChange={e => setUsername(e.target.value)} />
            <Button
                type='submit'>
                Registration
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

export default Registration;