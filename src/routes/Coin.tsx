import { useEffect, useState } from "react";
import { Link, useLocation, useMatch, useParams } from "react-router-dom";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import Chart from "./Chart";
import Price from "./Price";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { useQuery } from "@tanstack/react-query";

const Container = styled.div`
  padding: 0px 20px;
  width: 90%;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 3rem;
  text-align: center;
  margin-top: 30px;
`;
const Loader = styled.h1`
  margin-top: 30px;
  text-align: center;
  font-size: 3rem;
`;

const Box = styled.div`
  width: 100%;
  height: 100px;
  background-color: #fff;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  color: ${(props) => props.theme.accentColor};
`;

const Rank = styled.div`
  width: 33%;
  text-align: center;
  font-size: 1.5rem;
`;
const Symbol = styled.div`
  width: 33%;
  text-align: center;
  font-size: 1.5rem;
`;
const OpenSource = styled.div`
  width: 33%;
  text-align: center;
  font-size: 1.5rem;
`;

const MiddleText = styled.p`
  font-size: 1.5rem;
  margin: 5% 0;
  color: ${(props) => props.theme.accentColor};
  background-color: rgba(255, 255, 255, 0.3);
  line-height: 2.5rem;
  border-radius: 10px;
  padding: 10px;
`;
const Img = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 10px;
  margin-top: 30px;
`;
const TotalSupply = styled.div`
  width: 50%;
  text-align: left;
  font-size: 1.5rem;
  text-align: center;
`;
const MaxSupply = styled.div`
  width: 50%;
  text-align: right;
  font-size: 1.5rem;
  text-align: center;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 50px 0;
  gap: 30px;
`;
const Tab = styled.div<{ isActive: boolean }>`
  text-align: center;
  font-size: 1.2rem;
  font-weight: 400;
  background-color: #fff;
  padding: 15px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.textColor : props.theme.accentColor};
  background-color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
`;

interface RouteState {
  state: {
    name: string;
  };
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams() as { coinId: string };
  // const [loading, setLoading] = useState(true);
  // const { state } = useLocation() as RouteState;
  // const [info, setInfo] = useState<InfoData>();
  // const [priceInfo, setPriceInfo] = useState<PriceData>();
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  const { isLoading: infoLoading, data: infoData } = useQuery(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    { refetchInterval: 10000 }
  );

  // useEffect(() => {
  // (async () => {
  //   const infoData = await (
  //     await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //   ).json();
  //   setInfo(infoData);

  //   // console.log(infoData);
  //   // console.log(Object.keys(infoData).join());
  //   // console.log(
  //   //   Object.values(infoData)
  //   //     .map((v) => typeof v)
  //   //     .join()
  //   // );

  //     const priceData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //     ).json();
  //     setPriceInfo(priceData);
  //     setLoading(false);

  //     // console.log(Object.keys(priceData).join());
  //     // console.log(
  //     //   Object.values(priceData)
  //     //     .map((v) => typeof v)
  //     //     .join()
  //     // );
  //   })();
  // }, [coinId]);

  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      {loading === true ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Header>
            <Img
              src={`https://coinicons-api.vercel.app/api/icon/${infoData?.symbol.toLowerCase()}`}
              alt="coinImg"
            />
            {/* <Title>코인 "{state ? state.name : "Loading"}"</Title> */}
            <Title>코인 "{infoData?.name}"</Title>
            {/* {state ?.name || "Loading"} */}
          </Header>
          <Box>
            <Rank>
              랭크 :{" "}
              <span style={{ fontWeight: "bold" }}>{infoData?.rank}</span>위
            </Rank>
            <Symbol>
              심볼 :{" "}
              <span style={{ fontWeight: "bold" }}>{infoData?.symbol}</span>
            </Symbol>
            <OpenSource>
              가격 :{" "}
              <span style={{ fontWeight: "bold" }}>
                ${tickersData?.quotes.USD.price}
              </span>
            </OpenSource>
          </Box>
          <MiddleText>{infoData?.description}</MiddleText>
          <Box>
            <TotalSupply>
              총 공급 갯수 : {tickersData?.total_supply} 개
            </TotalSupply>
            <MaxSupply>
              최대 공급 갯수 :
              {tickersData?.max_supply !== 0
                ? " " + tickersData?.max_supply + "개"
                : " 없음"}{" "}
            </MaxSupply>
          </Box>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to="chart">차트</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to="price" state={tickersData}>
                가격
              </Link>
            </Tab>
          </Tabs>

          <Routes>
            <Route path="chart" element={<Chart coinId={coinId} />}></Route>
            <Route path="price" element={<Price />}></Route>
          </Routes>
        </>
      )}
    </Container>
  );
}
export default Coin;
