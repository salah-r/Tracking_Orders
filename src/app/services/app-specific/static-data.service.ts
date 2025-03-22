import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StaticDataService {
  // Static Member type In Secondary Member (صلة القرابة )
  staticMemberData = [
    'Spouse',
    'Son',
    'Daughter',
    'Father',
    'Mother',
    'InlawsFather',
    'InlawsMother',
  ];

  // Static Data In Subscriptions (صلة القرابة )
  staticSubType = ['Permanent', 'Yearly'];
  staticMemberType = [
    'Primary',
    'Daughter',
    'Spouse',
    'Son',
    'Father',
    'Mother',
    'InlawsFather',
    'InlawsMother',
  ];

  staticPhone2TypeList = ['درجة اولى', 'اخرى'];
}
