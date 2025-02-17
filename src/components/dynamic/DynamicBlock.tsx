import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { POSTS_API } from "../../const/const";

interface DynamicBlockProps {

}

const DynamicBlock: FC<DynamicBlockProps> = () => {

    // const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState<any[]>([]);
    const [status, setStatus] = useState({
        isLoading: false,
        isError: false,
    });

    const getPosts = async () => {
        try {
            setStatus({
                isLoading: true,
                isError: false
            });

            const response = await fetch(POSTS_API);
            const parsedPosts = await response.json();
            setPosts(parsedPosts);
            console.log('posts loaded: ', parsedPosts);

            setStatus({
                isLoading: false,
                isError: false
            });
        }
        catch (error) {
            setStatus({
                isLoading: false,
                isError: true
            });
            console.log(error)
        }
    }

    useEffect(() => {
        getPosts();
    }, [])

    return (
        <Block>
            <Title>
                Dynamic from api
            </Title>
            {
                !status.isLoading && !status.isError
                    ? <List>
                        {
                            posts.map((post, ind) => <Post key={ind}>
                                {
                                    post.title
                                }
                            </Post>)
                        }
                    </List>
                    : status.isError
                        ? <p>something got wrong</p>
                        : <p>loading</p>
            }
        </Block>
    );
}

const Post = styled.div`
    border-bottom: 1px solid black;
    font-weight: lighter;
    font-size: 1.5rem;
`

const List = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 8rem;
    overflow-y: auto;
`

const Title = styled.p`
    font-size: 2rem;
    font-weight: bold;
    color: #63d2b7;
`

const Block = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    border-radius: 15px;
    padding: 1rem;
`

export default DynamicBlock;