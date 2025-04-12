import { RevokeToken } from './../../interfaces/login-credentials';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() isSidebarExpanded = false; // Receive sidebar state
  @Output() toggle = new EventEmitter<void>(); // Emit toggle event
  revokeToken: RevokeToken;
  constructor(private AuthService: AuthService, private Router: Router) {

  }
  isMobileView = false;
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  onLinkClick() {
    this.isDropdownOpen = false;
  }

  ngOnInit(): void {
    this.checkScreenWidth();
    window.addEventListener('resize', this.checkScreenWidth.bind(this));
  }

  checkScreenWidth() {
    this.isMobileView = window.innerWidth < 768;
  }

  toggleSidebar() {
    this.toggle.emit(); // Emit toggle event to parent
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.checkScreenWidth.bind(this));
  }

  logOut() {
    if (localStorage.getItem("auth_token") && localStorage.getItem("refreshToken")) {
      this.revokeToken.token = localStorage.getItem("auth_token");
      this.revokeToken.refreshToken = localStorage.getItem("refreshToken");
      this.AuthService.Logout(this.revokeToken).subscribe(
        {
          next: (res) => {
            localStorage.clear();
            this.Router.navigate(['/']);
          }
        }
      );

    }
  }
}
