// about-us.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Component initialization
  }

  // Function to open location in Google Maps
  openMap(): void {
    // Using the address: Sheetal Complex, Near Sony Automobile, Bombay Motor Circle, Jodhpur
    const address = 'Sheetal+Complex+Near+Sony+Automobile+Bombay+Motor+Circle+Jodhpur+342001+Rajasthan';
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${address}`;
    
    // Open in new tab
    window.open(googleMapsUrl, '_blank');
  }

  // Function to make a phone call
  callPhone(phoneNumber: string): void {
    // Remove spaces from phone number for dialing
    const cleanNumber = phoneNumber.replace(/\s/g, '');
    window.location.href = `tel:${cleanNumber}`;
  }

  // Function to send email
  sendEmail(): void {
    const email = 'makwanainfotech@gmail.com';
    const subject = 'Inquiry - Makwana Infotech';
    const body = 'Hello,\n\nI would like to get more information about your services.\n\nBest regards,';
    
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  // Function to open website
  openWebsite(): void {
    window.open('https://www.makwanainfotech.com', '_blank');
  }
}