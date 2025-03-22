import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
  sidebarVisible: boolean = false;

  items!: MenuItem[];

  position: string = 'top';

  positionOptions = [
      {
          label: 'Bottom',
          value: 'bottom'
      },
      {
          label: 'Top',
          value: 'top'
      },
      {
          label: 'Left',
          value: 'left'
      },
      {
          label: 'Right',
          value: 'right'
      }
  ];

  ngOnInit() {
    this.items = [
        {
            label: 'Finder',
            icon: 'https://primefaces.org/cdn/primeng/images/dock/finder.svg'
        },
        {
            label: 'App Store',
            icon: 'https://primefaces.org/cdn/primeng/images/dock/appstore.svg'
        },
        {
            label: 'Photos',
            icon: 'https://primefaces.org/cdn/primeng/images/dock/photos.svg'
        },
        {
            label: 'Trash',
            icon: 'https://primefaces.org/cdn/primeng/images/dock/trash.png'
        }
    ];
  }
}
