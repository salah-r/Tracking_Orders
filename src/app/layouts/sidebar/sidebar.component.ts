import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() isSidebarExpanded = false; // Receive sidebar state from parent

  ngOnInit(): void {
    // Any other initialization logic can go here
  }

  toggleSidebar() {
    // Emit an event to the parent to toggle the sidebar state
    this.isSidebarExpanded = !this.isSidebarExpanded;
  }
}
