export interface IPayment {
  id: number;
  attributes: {
    Amount: number;
    DateTime: string;
    roya_primary_member: {
      data: {
        id: number;
      };
    };
  };
}
