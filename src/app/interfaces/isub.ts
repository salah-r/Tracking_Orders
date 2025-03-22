export interface Isub {
  id: number;
  attributes: {
    SubType: string;
    Price: number;
    FounderYN: boolean;
    OwnerYN: boolean;
    Year: number;
    MemberType: string;
  };
}
