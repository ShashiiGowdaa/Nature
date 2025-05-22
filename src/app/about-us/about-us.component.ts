import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-about-us',
  imports: [CommonModule, FooterComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {

  teamMembers = [
    {
      name: 'Joshua Stefan',
      position: 'Farmer',
      image: 'assets/team/team-1.jpg',
      social: {
        facebook: '#',
        twitter: '#',
        linkedin: '#'
      }
    },
    {
      name: 'Sheena Anderson',
      position: 'Marketing',
      image: 'assets/team/team-2.jpg',
      social: {
        facebook: '#',
        twitter: '#',
        linkedin: '#'
      }
    },
    {
      name: 'Evan Smith',
      position: 'Content',
      image: 'assets/team/team-3.jpg',
      social: {
        facebook: '#',
        twitter: '#',
        linkedin: '#'
      }
    },
    {
      name: 'Kaylie Jones',
      position: 'Accountant',
      image: 'assets/team/team-4.jpg',
      social: {
        facebook: '#',
        twitter: '#',
        linkedin: '#'
      }
    }
  ];

}
