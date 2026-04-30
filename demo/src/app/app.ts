import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { Navbar } from "./navbar/navbar";
import { Footer } from "./footer/footer";
import { ViewportScroller } from '@angular/common';
import { Chatbot } from "./chatbot/chatbot";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,  // <-- This is required for standalone components
  imports: [RouterOutlet, RouterModule, Navbar, Footer, FormsModule, HttpClientModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']   // <-- Fixed typo
})
export class App {
  showChat = false;

  ToggleChat() {
    this.showChat = !this.showChat;
  }

  protected readonly title = signal('demo');

  constructor(private router: Router, private viewPortScroller: ViewportScroller) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.viewPortScroller.scrollToPosition([0, 0]);
      }
    });
  }
}