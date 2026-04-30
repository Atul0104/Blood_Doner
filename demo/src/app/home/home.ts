import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  imports: [CommonModule,RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HOME {

  
cards = [
  {
    title: 'It takes only an hour',
    subtitle: 'Donate blood save lives!'
  },
  {
    title: 'You will get free refreshments after donation',
    subtitle: 'Donation of blood is safe and healthy'
  },
  {
    title: 'It costs nothing',
    subtitle: 'Give blood and stay healthy'
  },
  {
    title: 'There is nothing better than saving a life',
    subtitle: 'Every blood donor is a hero'
  }
];
response: any;
onSubmit(event: Event) {
    event.preventDefault();

    Swal.fire({
      title: 'Thank you!',
      text: 'Your donation request has been submitted.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

bloodData: Record<string, { take: string; give: string }> = {
  "A+": { take: "O+ O- A+ A-", give: "A+ AB+" },
  "O+": { take: "O+ O-", give: "O+ A+ B+ AB+" },
  "B+": { take: "O+ O- B+ B-", give: "B+ AB+" },
  "AB+": { take: "Everyone", give: "AB+" },
  "A-": { take: "O- A-", give: "A+ A- AB+ AB-" },
  "O-": { take: "O-", give: "Everyone" },
  "B-": { take: "O- B-", give: "B+ B- AB+ AB-" },
  "AB-": { take: "O- A- B- AB-", give: "AB+ AB-" }
};


  // default selection
  selectedType: string = "A+";

  get takeFrom(): string {
    return this.bloodData[this.selectedType].take;
  }

  get giveTo(): string {
    return this.bloodData[this.selectedType].give;
  }

  selectType(type: string) {
    this.selectedType = type;
  }


  
}



