import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../supabase.service'
import { Tables } from '../constants';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrl: './data-grid.component.css',
  standalone: true,
  imports :[CommonModule, TableModule]
})
export class DataGridComponent implements OnInit {
  data: any[] = [];
  cols: Array<{ field: string; header: string }> = [
    { field: 'timestamp', header: 'Timestamp' },
    { field: 'cloudCoverHigh', header: 'Cloud cover high' },
    { field: 'cloudCoverLow', header: 'Cloud cover low' },
    { field: 'cloudCoverMedium', header: 'Cloud cover medium' },
    { field: 'cloudCoverTotal', header: 'Cloud cover total' },
    { field: 'meanSeaLevelPressure', header: 'Mean sea level pressure' },
    { field: 'precipitationTotal', header: 'Precipitation total' },
    { field: 'radiationUV', header: 'Radiation UV' },
    { field: 'relativeHumidity', header: 'Relative humidity' },
    { field: 'sunshineDuration', header: 'Sunshine duration' },
    { field: 'temperature', header: 'Temperature' },
    { field: 'windGust', header: 'Wind gust' },
  ];

  sortField: string = 'timestamp';
  sortOrder: number = 1;

  constructor(private supabaseService: SupabaseService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  async ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.sortField = params['sortField'] || 'timestamp';
      this.sortOrder = params['sortOrder'] === '-1' ? -1 : 1;
    });
    try {
      this.data = await this.supabaseService.getAllData(Tables.baselFull);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  onSort(event: any) {
    this.router.navigate([], {
      queryParams: {
        sortField: event.field,
        sortOrder: event.order,
      },
      queryParamsHandling: 'merge',
    });
  }
  formatCellValue(field: string, value: any): string {
    if (field === 'timestamp') {
      return this.formatTimestamp(value);
    } else if (field === 'temperature') {
      return `${value} °C`;
    }
    return value;
  }
  formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString('en-EN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const formattedTime = date.toLocaleTimeString('en-En', {
      hour: '2-digit',
      minute: '2-digit',
    });
    return `${formattedDate} (${formattedTime})`;
  }
}
