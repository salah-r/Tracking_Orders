import { IprimaryMember } from './iprimary-member';

export interface IsecondaryMember {
  id: number;
  attributes: {
    FullName: string;
    DOB: string;
    Phone1: string;
    MemberType: string;
    Gender: string;
    ActiveYN: boolean;
    DateAdded: string;
    RevokedYN: boolean;
    Address: string;
    AreaName: string;
    Email: string;
    GovID: string;
    Job: string;
    SocialStatus: string;
    NewlyAdded: boolean;
    roya_primary_member: {
      id: number;
      data: IprimaryMember;
    };
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
