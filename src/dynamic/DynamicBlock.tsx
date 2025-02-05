import { FC, useEffect, useState } from "react";
import styled from "styled-components";

interface DynamicBlockProps {

}

const DynamicBlock: FC<DynamicBlockProps> = () => {

    // const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState<any[]>([]);

    const getPosts = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
            const posts = await response.json();
            setPosts(posts);
        }
        catch (error) {
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
            <List>
                {
                    posts.map(post => <Post>
                        {
                            post.title
                        }
                    </Post>)
                }
            </List>
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