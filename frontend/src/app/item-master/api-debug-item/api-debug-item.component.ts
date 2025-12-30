import { Component } from '@angular/core';
import { AccountMasterService } from '../../services/account-master.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemMasterService } from '../../services/item-master.service';

@Component({
  selector: 'app-api-debug-item',
  imports: [CommonModule,FormsModule],
  templateUrl: './api-debug-item.component.html',
  styleUrl: './api-debug-item.component.css'
})
export class ApiDebugItemComponent {
   masterCode: string = '1323'; // Default or dynamic value
    xmlResponse: string = '';
  
    constructor(private busyApi: ItemMasterService) {}
  
    fetchMasterXML() {
      this.busyApi.getMasterXMLItemMaster(this.masterCode).subscribe({
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
