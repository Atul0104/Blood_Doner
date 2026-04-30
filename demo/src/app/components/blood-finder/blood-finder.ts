import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MapService } from '../../services/map.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-blood-finder',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blood-finder.html',
  styleUrls: ['./blood-finder.css']
})
export class BloodFinder implements OnInit, OnDestroy {
  selectedBloodGroup: string = '';
  selectedCity: string = '';
  filteredDonors: any[] = [];
  isLoading = false;
  errorMessage = '';
  showUnavailable = false;
  selectedProfile: any = null;
  currentPage = 1;
  itemsPerPage = 10;

  bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  cities = ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Satara', 'Solapur', 'Thane', 'Akola', 'Amravati'];

  cityCoordinates: { [key: string]: [number, number] } = {
    'Mumbai': [19.0760, 72.8777],
    'Pune': [18.5204, 73.8567],
    'Nagpur': [21.1458, 79.0882],
    'Nashik': [19.9975, 73.7898],
    'Aurangabad': [19.8762, 75.3433],
    'Satara': [17.6750, 73.9833],
    'Solapur': [17.6599, 75.9064],
    'Thane': [19.2183, 72.9781],
    'Akola': [20.7136, 77.0152],
    'Amravati': [20.8530, 77.7539]
  };

  donors: any[] = [];

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.generateDonorData();
    setTimeout(() => {
      this.mapService.initializeMap('bloodFinderMap', [19.0760, 72.8777], 6);
      this.addAllDonorMarkers();
    }, 100);
  }

  ngOnDestroy(): void {
    this.mapService.destroyMap();
  }

  generateDonorData(): void {
    const firstNames = ['Rahul', 'Priya', 'Ankit', 'Neha', 'Rohit', 'Sneha', 'Vikas', 'Amit', 'Kiran', 'Meena', 'Rajesh', 'Anjali', 'Arun', 'Divya', 'Sanjay', 'Pooja', 'Arjun', 'Isha', 'Nikhil', 'Riya'];
    const lastNames = ['Sharma', 'Verma', 'Gupta', 'Singh', 'Kumar', 'Iyer', 'Yadav', 'Patil', 'Joshi', 'Desai', 'Pandey', 'Nair', 'Malhotra', 'Bhat', 'Reddy', 'Rao', 'Khan', 'Ali', 'Das', 'Patel'];
    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
    
    this.donors = [];
    let id = 1;

    for (let i = 0; i < 200; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const city = this.cities[Math.floor(Math.random() * this.cities.length)];
      const coords = this.cityCoordinates[city];
      const bloodGroup = bloodGroups[Math.floor(Math.random() * bloodGroups.length)];
      const age = Math.floor(Math.random() * (65 - 18 + 1)) + 18;
      const isAvailable = Math.random() > 0.2; // 80% available
      const lastDonationDays = Math.floor(Math.random() * 365);
      const weight = Math.floor(Math.random() * (100 - 50 + 1)) + 50;

      this.donors.push({
        id: id++,
        name: `${firstName} ${lastName}`,
        bloodGroup: bloodGroup,
        city: city,
        phone: '+91' + Math.floor(Math.random() * 9000000000 + 1000000000),
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
        latitude: coords[0] + (Math.random() - 0.5) * 0.1,
        longitude: coords[1] + (Math.random() - 0.5) * 0.1,
        age: age,
        weight: weight,
        isAvailable: isAvailable,
        lastDonation: lastDonationDays,
        gender: Math.random() > 0.5 ? 'Male' : 'Female',
        address: `${Math.floor(Math.random() * 1000)} ${['Main St', 'Park Ave', 'Oak Rd', 'Pine Lane', 'Elm Street'][Math.floor(Math.random() * 5)]}, ${city}`,
        alternatePhone: '+91' + Math.floor(Math.random() * 9000000000 + 1000000000),
        totalDonations: Math.floor(Math.random() * 10)
      });
    }
  }

  addAllDonorMarkers(): void {
    const donors = this.showUnavailable ? this.donors.filter(d => !d.isAvailable) : this.donors.filter(d => d.isAvailable);
    this.mapService.addDonorMarkers(donors);
  }

  get paginatedDonors(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredDonors.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredDonors.length / this.itemsPerPage);
  }

  get pageNumbers(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  searchDonors(): void {
    if (!this.selectedBloodGroup && !this.selectedCity) {
      this.errorMessage = 'Please select Blood Group or City';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.currentPage = 1;

    setTimeout(() => {
      this.filteredDonors = this.donors.filter(donor => {
        const matchBlood = !this.selectedBloodGroup || donor.bloodGroup === this.selectedBloodGroup;
        const matchCity = !this.selectedCity || donor.city === this.selectedCity;
        const matchAvailability = !this.showUnavailable || !donor.isAvailable;
        return matchBlood && matchCity && matchAvailability;
      });

      if (this.filteredDonors.length === 0) {
        this.errorMessage = `No ${this.showUnavailable ? 'unavailable' : 'available'} donors found for ${this.selectedBloodGroup || 'any blood group'} in ${this.selectedCity || 'any city'}`;
      }

      this.updateMap();
      this.isLoading = false;
    }, 500);
  }

  updateMap(): void {
    const map = this.mapService.getMap();
    if (!map) return;

    this.mapService.clearMarkers();

    if (this.filteredDonors.length > 0) {
      this.mapService.addDonorMarkers(this.filteredDonors);
      
      const bounds = L.latLngBounds(
        this.filteredDonors.map(d => [d.latitude, d.longitude] as [number, number])
      );
      map.fitBounds(bounds);
    } else {
      this.addAllDonorMarkers();
    }
  }

  resetSearch(): void {
    this.selectedBloodGroup = '';
    this.selectedCity = '';
    this.filteredDonors = [];
    this.errorMessage = '';
    this.currentPage = 1;
    this.selectedProfile = null;
    this.mapService.setCenter(19.0760, 72.8777, 6);
    this.addAllDonorMarkers();
  }

  toggleUnavailable(): void {
    this.showUnavailable = !this.showUnavailable;
    this.selectedBloodGroup = '';
    this.selectedCity = '';
    this.filteredDonors = [];
    this.errorMessage = '';
    this.currentPage = 1;
    this.selectedProfile = null;
    this.resetSearch();
  }

  viewProfile(donor: any): void {
    this.selectedProfile = donor;
  }

  closeProfile(): void {
    this.selectedProfile = null;
  }

  contactDonor(donor: any): void {
    alert(`Calling ${donor.name} at ${donor.phone}`);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  get availableDonorCount(): number {
    return this.donors.filter(d => d.isAvailable).length;
  }

  get unavailableDonorCount(): number {
    return this.donors.filter(d => !d.isAvailable).length;
  }
}
