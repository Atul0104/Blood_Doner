import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { Chatbot } from "../chatbot/chatbot";
import { UserAuth } from '../services/user-auth';

declare var bootstrap: any;

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, Chatbot],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
messages: any;

  closeNavbar() {
    const navCollapse = document.getElementById('navbarScroll');
    if (navCollapse) {
      const bsCollapse = new bootstrap.Collapse(navCollapse, { toggle: false });
      bsCollapse.hide();
    }
  }
  showChat = false;

toggleChat() {
  this.showChat = !this.showChat;
} 
menuOpen = false;

constructor(public auth: UserAuth) {}

toggleMenu() {
  this.menuOpen = !this.menuOpen;
}

logout() {
  this.auth.logout();
  this.menuOpen = false;
}
}
  