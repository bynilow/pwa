import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { BTC_API } from "../../const/const";

interface BitcoinPriceProps {

}

interface Bitcoin {
    symbol: string,
    price: string
}

const BitcoinPrice: FC<BitcoinPriceProps> = () => {

    const [bitcoinPrice, setBitcoinPrice] = useState<Bitcoin>({
        symbol: '',
        price: ''
    })

    const getBitcoinPrice = async () => {
        try {
            const data = await fetch(BTC_API);
            const parsedData = await data.json();
            setBitcoinPrice(parsedData);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getBitcoinPrice();

        const interval = setInterval(() => {
            getBitcoinPrice();
        }, 2000)

        return () => clearInterval(interval)
    }, [])

    return (
        <BitcoinBlock>
            BTC: {
                parseFloat(bitcoinPrice.price)
            } USDT
        </BitcoinBlock>
    );
}

const BitcoinBlock = styled.div`
    font-weight: bold;
    display: flex;
    gap: 1rem;
    border: 1px solid black;
    border-radius: 15px;
    padding: 1rem;
`


export default BitcoinPrice;