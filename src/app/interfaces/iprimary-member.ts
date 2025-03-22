export interface IprimaryMember {
  id: number;
  attributes: {
    FullName: string;
    DOB: string;
    MarriageDate: string;
    Phone1: string;
    Phone2: string;
    Email: string;
    PermanentPrice: number;
    GovID: string;
    HomeNumber: number;
    NumSons: number;
    NumDaughter: number;
    NumWifes: number;
    Address: string;
    AreaName: string;
    Gender: string;
    SocialStatus: string;
    Job: string;
    OtherClubs: string;
    Religion: string;
    FounderYN: boolean;
    OwnerYN: boolean;
    ActiveYN: boolean;
    SeparatedDate: string;
    IsNewlySeparated: boolean;
    FreeMemberYN: boolean;
    MemberShipID: number;
    Phone2Type: string;
    Phone2Name: string;
    FullFreeMemberShipYN: boolean;
    FullPenaltyYN: boolean;
    IsContactedYN: boolean;
    Photo: {
      data: {
        id: number;
        attributes: {
          name: string;
          width: number;
          height: number;
          mime: string;
          url: string;
        };
      };
    };
  };
}
