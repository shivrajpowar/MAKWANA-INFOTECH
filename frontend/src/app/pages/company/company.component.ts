import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-company',
  imports: [CommonModule, FormsModule],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent {
  

  searchText: string = '';

  companies = [
    {
      name: 'MAKWANA INFOTECH',
      code: 'Comp0001',
      year: '2021–2022 (1 Year)',
      size: 13
    },
    {
      name: 'TEST COMPANY',
      code: 'Comp0002',
      year: '2021–2022 (1 Year)',
      size: 80
    },
    {
      name: 'COMPANY 2021',
      code: 'Comp0003',
      year: '2021–2022 (2 Years)',
      size: 43
    }
  ];

  // 🔹 Filter method
  get filteredCompanies() {
    return this.companies.filter(company =>
      company.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
