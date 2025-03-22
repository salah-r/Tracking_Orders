import { Component, OnInit, OnDestroy, Output } from '@angular/core';

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss'],
})
export class FullLayoutComponent implements OnInit, OnDestroy {
  isSidebarExpanded = false;
  isMobileView = false;
  isMenubarVisible = false;

  ngOnInit(): void {
    this.checkScreenWidth();
    window.addEventListener('resize', this.checkScreenWidth.bind(this));
  }

  checkScreenWidth() {
    this.isMobileView = window.innerWidth <= 768;
    if (this.isMobileView) {
      this.isSidebarExpanded = false; // Hide sidebar by default on mobile view
    }
  }

  toggleSidebar() {
    if (this.isMobileView) {
      this.isMenubarVisible = !this.isMenubarVisible;
    } else {
      this.isSidebarExpanded = !this.isSidebarExpanded;
    }
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.checkScreenWidth.bind(this));
  }
}
