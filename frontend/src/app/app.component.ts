import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    title = 'frontend';

    constructor(
        private responsive: BreakpointObserver
    ){ }
    ngOnInit(): void {
        this.responsive.observe(Breakpoints.HandsetLandscape);
    }
}
