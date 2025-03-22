export interface IMonthlyDelaysPenalty {
  id: number;
  attributes: {
    Year: number;
    Month: number;
    Percent: number;
  };
}
