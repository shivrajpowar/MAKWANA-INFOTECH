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
    masterCode = '1304';
  isTesting = false;
  isLoading = false;
  testResult: any;
  error = '';
  accountData: any;
  rawResponse = '';

  constructor(private accountService: AccountMasterService) {}

  testConnection() {
    this.isTesting = true;
    this.error = '';
    this.testResult = null;
    this.rawResponse = '';
    
    this.accountService.testApiConnection(this.masterCode).subscribe({
      next: (result) => {
        this.isTesting = false;
        this.testResult = result;
        this.rawResponse = result.responsePreview;
        console.log('Test Result:', result);
      },
      error: (err) => {
        this.isTesting = false;
        this.error = err.message;
        console.error('Test Error:', err);
      }
    });
  }

  getAccount() {
    this.isLoading = true;
    this.error = '';
    this.accountData = null;
    this.rawResponse = '';
    
    this.accountService.getAccountByCode(this.masterCode).subscribe({
      next: (account) => {
        this.isLoading = false;
        this.accountData = account;
        console.log('Account Data:', account);
      },
      error: (err) => {
        this.isLoading = false;
        this.error = err.message;
        console.error('Get Account Error:', err);
      }
    });
  }

  checkCors() {
    // Test CORS by making a simple fetch request
    fetch('http://103.174.86.37:982', {
      method: 'GET',
      headers: {
        'SC': '9',
        'MasterCode': '1304',
        'UserName': 'm',
        'Pwd': 'm',
        'Accept': 'application/xml'
      },
      mode: 'cors'
    })
    .then(response => response.text())
    .then(text => {
      console.log('CORS Test Response:', text.substring(0, 200));
      this.rawResponse = text.substring(0, 500) + '...';
      alert(`CORS Test: Success - Response length: ${text.length} chars`);
    })
    .catch(error => {
      console.error('CORS Test Error:', error);
      this.error = 'CORS Error: ' + error.message;
      alert('CORS Error: ' + error.message);
    });
  }

  clearResults() {
    this.testResult = null;
    this.accountData = null;
    this.error = '';
    this.rawResponse = '';
  }

  copyToClipboard() {
    const jsonString = JSON.stringify(this.accountData, null, 2);
    navigator.clipboard.writeText(jsonString).then(() => {
      alert('JSON copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }

  copyRawResponse() {
    if (this.rawResponse) {
      navigator.clipboard.writeText(this.rawResponse).then(() => {
        alert('Raw response copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    }
  }

}
