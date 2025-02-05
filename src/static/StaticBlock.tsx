import { FC } from "react";
import styled from "styled-components";

interface StaticBlockProps {

}

const StaticBlock: FC<StaticBlockProps> = () => {
    return (
        <Block>
            <Title>
                Static Block
            </Title>
        </Block>
    );
}

const Title = styled.p`
    font-size: 2rem;
    font-weight: bold;
    color: #63d2b7;
`

const Block = styled.div`
    display: flex;
    border: 1px solid black;
    border-radius: 15px;
    padding: 1rem;
`

export default StaticBlock;