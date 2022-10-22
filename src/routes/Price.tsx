import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const CoinPrice = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.accentColor};
  border-radius: 30px;
  padding: 50px;
  font-size: 20px;
  & > ul > li {
    margin-top: 20px;
  }
  & > ul > li > span {
    font-size: 25px;
  }
`;

interface USD {
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
}

function Price() {
  const priceInfo = useLocation();
  const [USD, setUSD] = useState<USD>();

  useEffect(() => {
    setUSD(priceInfo.state.quotes.USD);
  }, []);

  //   console.log(USD);

  return (
    <>
      <CoinPrice>
        <ul>
          <li>
            현재 시세 : <span>${USD?.price.toLocaleString()}</span>
          </li>
          <li>
            지난 24시간 거래량 :{" "}
            <span>{USD?.volume_24h.toLocaleString()}건</span>
          </li>
          <li>
            지난 24시간 거래 변동률 : <span>{USD?.volume_24h_change_24h}%</span>
          </li>
          <li>
            시가총액 : <span>${USD?.market_cap.toLocaleString()}</span>
          </li>
          <li>
            시가총액 24시간 변동률 :<span> {USD?.market_cap_change_24h}%</span>{" "}
          </li>
          <li>
            최근 30분 변동률 : <span>{USD?.percent_change_30m}%</span>{" "}
          </li>
          <li>
            최근 1시간 변동률 :<span> {USD?.percent_change_1h}%</span>{" "}
          </li>
          <li>
            최근 6시간 변동률 : <span>{USD?.percent_change_6h}%</span>{" "}
          </li>
          <li>
            최근 하루 변동률 : <span>{USD?.percent_change_24h}% </span>
          </li>
          <li>
            최근 일주일 변동률 :<span> {USD?.percent_change_7d}%</span>{" "}
          </li>
          <li>
            최근 한달 변동률 : <span>{USD?.percent_change_30d}% </span>
          </li>
          <li>
            최근 일년 변동률 : <span>{USD?.percent_change_1y}%</span>{" "}
          </li>
        </ul>
      </CoinPrice>
    </>
  );
}
export default Price;
