import { Component, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { UserRoles } from '../constants';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  imports: [NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.setUserRole(
      '829ZQcLbtfYHyM763JeRfwtZRRY2',
      UserRoles.ADMIN
    );
  }
}
