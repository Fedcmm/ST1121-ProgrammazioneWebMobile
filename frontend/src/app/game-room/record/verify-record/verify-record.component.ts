import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Record} from "../../../../model/Record";

@Component({
    selector: 'app-verify-record',
    templateUrl: './verify-record.component.html',
    styleUrls: ['./verify-record.component.css']
})
export class VerifyRecordComponent implements OnInit {
    records: Record[] = [];
    selectedRecord: Record | undefined;


    constructor(private http: HttpClient) {
    }


    ngOnInit() {
        this.getRecords();
    }

    getRecords(): void {
        this.http.get('http://localhost:8080/record/').subscribe({
                next: (response: any) => {
                    this.records = response;
                },
                error: (error: any) => {
                    console.error('Error getting records:', error);
                }
            });
    }

    verifyRecord(): void {
        if (this.selectedRecord) {
            this.selectedRecord.isVerified = true;

            // Commented because of error in "this.selectedRecord.id"
            /*this.http.put('url_del_backend/records/' + this.selectedRecord.id, this.selectedRecord)
                .subscribe({
                    next: () => {
                        console.log('Record verificato.');
                    },
                    error: error => {
                        console.error('Error verifying record:', error);
                        // Eh, mo qua ti voglio vedere a gestire l'errore.
                    }
                });*/
        }
    }
}

