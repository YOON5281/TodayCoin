import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";

const Container = styled.div`
  padding: 0px 20px;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 0px;
`;
const CoinsList = styled.ul`
  width: 80vw;
  margin: 0 auto;
`;
const Coin = styled.li`
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    transition: color 0.2s ease-in;
    display: flex;
    padding: 20px;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 4rem;
`;
const Loader = styled.h1`
  text-align: center;
  font-size: 40px;
`;

const CoinWrapper = styled.div`
  font-size: 20px;
  & p {
    margin-right: 30px;
    font-size: 22px;
  }
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

// const coins = [
//   {
//     id: "btc-bitcoin",
//     name: "Bitcoin",
//     symbol: "BTC",
//     rank: 1,
//     is_new: false,
//     is_active: true,
//     type: "coin",
//   }
// ];

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<CoinInterface[]>(
    ["allCoins"],
    fetchCoins
  );
  // console.log(data);

  // const [coins, setCoins] = useState<CoinInterface[]>([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch("https://api.coinpaprika.com/v1/coins");
  //     const json = await response.json();
  //     setCoins(json.slice(0, 20));
  //     setLoading(false);
  //   })();
  // }, []);

  // console.log(coins);
  return (
    <Container>
      <Header>
        <Title>오늘의 코인</Title>
      </Header>

      {isLoading === true ? (
        <Loader>로딩중...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 40)?.map((coin) => (
            <Coin key={coin.id}>
              <CoinWrapper>
                <Link to={`/${coin.id}`} state={coin}>
                  <p>{coin.rank}위</p>
                  <Img
                    src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                    alt="coinImg"
                  />
                  {coin.name} &rarr;
                </Link>
              </CoinWrapper>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
export default Coins;
