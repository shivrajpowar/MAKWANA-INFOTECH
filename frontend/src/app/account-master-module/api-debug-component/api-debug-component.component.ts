import { Component } from '@angular/core';
import { AccountMasterService } from '../../services/account-master.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-api-debug-component',
  imports: [CommonModule,FormsModule],
  templateUrl: './api-debug-component.component.html',
  styleUrl: './api-debug-component.component.css'
})
export class ApiDebugComponentComponent {
 masterCode: string = '1304'; // Default or dynamic value
  xmlResponse: string = '';

  constructor(private busyApi: AccountMasterService) {}

  fetchMasterXML() {
    this.busyApi.getMasterXML(this.masterCode).subscribe({
      next: (response) => {
        this.xmlResponse = response;
        console.log('API Response:', response);
      },
      error: (error) => {
        console.error('API Error:', error);
      }
    });
}
}
