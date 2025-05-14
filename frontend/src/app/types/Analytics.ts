export type TAnalytics = {
  money: string;
  reservations: number;
  rooms: number;
  users: number;
  chartEarnedMonth: TChartEarnedMonth[];
};

export type TChartEarnedMonth = {
  label: string;
  value: number;
};
