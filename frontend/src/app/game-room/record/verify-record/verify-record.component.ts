import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-verify-record',
  templateUrl: './verify-record.component.html',
  styleUrls: ['./verify-record.component.css']
})
export class VerifyRecordComponent implements OnInit {
  records: any[] = [];
  selectedRecord: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getRecords();
  }

  getRecords(): void {
    this.http.get<any[]>('http://localhost:8080/record/').subscribe(
        response => {
          this.records = response;
        },
        error => {
          console.error('Error getting records:', error);
        }
    );
  }

  verifyRecord(): void {
    if (this.selectedRecord) {
      this.selectedRecord.isVerify = true;

      this.http.put('url_del_backend/records/' + this.selectedRecord.id, this.selectedRecord).subscribe(
          () => {
            console.log('Record verificato.');
          },
          error => {
            console.error('Error verifying record:', error);
            // Eh, mo qua ti voglio vedere a gestire l'errore.
          }
      );
    }
  }
}

