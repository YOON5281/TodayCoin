import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";
import { type } from "os";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  // const params = useParams();
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );

  // data?.map((a) => console.log(new Date(a.time_close * 1000)));

  return (
    <div>
      {isLoading ? (
        "차트 로딩 중.."
      ) : (
        <ApexCharts
          type="line"
          series={[
            {
              name: "Sales",
              data: data?.map((price) => Number(price.close)) as number[],
            },
          ]}
          options={{
            chart: {
              height: 300,
              width: 300,
              background: "#fff",
              toolbar: { show: false },
            },
            theme: { mode: "dark" },
            xaxis: {
              labels: {
                show: false,
                datetimeFormatter: {
                  month: "MMM 'yy",
                },
              },
              axisTicks: { show: false },
              axisBorder: { show: false },
              type: "datetime",
              categories: data?.map((price) =>
                new Date(price.time_close * 1000).toISOString()
              ),
            },
            yaxis: {
              labels: {
                show: false,
              },
            },

            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["blue"], stops: [0, 50, 100] },
            },
            colors: ["red"],
            tooltip: {
              x: {
                formatter: (value) => `${value.toFixed(2)}`,
              },
              y: {},
            },
            stroke: {
              curve: "smooth",
            },
          }}
        />
      )}
    </div>
  );
}
export default Chart;
