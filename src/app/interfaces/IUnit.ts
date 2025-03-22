export interface IUnit {
  id: 1;
  attributes: {
    UnitName: string;
    UnitNumber: string;

    roya_primary_member: {
      data: {
        id: number;
        attributes: {
          FullName: string;
          DOB: string;
          Phone1: string;
          PermanentPrice: number;
          NumSons: number;
          NumDaughter: number;
          NumWifes: number;
          Address: string;

          FounderYN: boolean;
          OwnerYN: boolean;
          Gender: string;
          Religion: string;
          AreaName: string;
          HomeNumber: string;
          Phone2: string;
          Email: string;
          GovID: number;
          Job: string;
          SocialStatus: string;
          OtherClubs: string;
          FirstSubscription: string;
          ActiveYN: boolean;
          FreeMemberYN: boolean;
        };
      };
    };
  };
}
