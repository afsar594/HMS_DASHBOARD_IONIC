import {
  Component,
  ElementRef,
  ViewChild,
  HostListener,
  OnDestroy,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
import { 
  IonContent,
  IonHeader,
  IonToolbar,
   
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
   
} from '@ionic/angular/standalone';
// import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ApiService } from '../api-service';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
    imports: [
        CommonModule,      // for ngFor, ngIf, etc.
    DatePipe,          // for {{ date | date }}
     IonContent,
    IonHeader,
    IonToolbar,
     
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
     ],
 })
export class Tab3Page implements OnDestroy {
voidTransactions: any
  @ViewChild('avgChart') avgChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('revenueChart') revenueChartRef!: ElementRef<HTMLCanvasElement>;
  guests: any[] = [];

  avgChart!: Chart;
  revenueChart!: Chart;
  roomGraphicalData: any;
  cards: any

  ngAfterViewInit() {
    this.loadAvgRateChart();
    this.loadRevenueChart();
    // ensure charts resize after initial layout
    setTimeout(() => this.resizeCharts(), 300);
  }

  loadAvgRateChart() {
    this.avgChart = new Chart(this.avgChartRef.nativeElement, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Avg Rate',
            data: [3200, 3400, 3100, 3600, 3800, 4000, 3900],
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99,102,241,0.2)',
            tension: 0.4,
            fill: true,
            pointRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            ticks: {
              callback: (value) => '₹' + value,
            },
          },
        },
      },
    });
  }


  loadRevenueChart() {
    this.revenueChart = new Chart(this.revenueChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Cash', 'Card', 'UPI', 'Online'],
        datasets: [
          {
            label: 'Revenue',
            data: [120000, 98000, 45000, 76000],
            backgroundColor: ['#22c55e', '#3b82f6', '#a855f7', '#f59e0b'],
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => '₹' + value,
            },
          },
        },
      },
    });
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.resizeCharts();
  }

  resizeCharts() {
    try {
      if (this.avgChart) this.avgChart.resize();
      if (this.revenueChart) this.revenueChart.resize();
    } catch (e) {
      // ignore
    }
  }

  kpis = [
    { title: 'Out.Bal', value: 0 },
    { title: 'Day Rooms', value: 0 },
    { title: 'Exp.Rev', value: 0 },
    { title: 'Day Rev', value: 0 },
    { title: 'Avg.Rate', value: 0 },
    { title: 'Avg.Rate All', value: 0 },
  ];

  filters = [
    'Vacant Rooms',
    'Occupied Rooms',
    'Out Of Order',
    'House Use Rooms',
    'Reserved Rooms',
    'Dirty Rooms',
    'Due Out',
    'Todays Checkins',
    'Group By Room Type',
  ];

  headers = [
    'Room_No',
    'Status',
    'Name',
    'Date_Time',
    'NP',
    'ND',
    'Tariff',
    'Amt',
    'Bal',
    'Re_No',
    'Nationality',
    'C/O',
  ];
  constructor(private api: ApiService) {}
  ngOnInit() {
   this.voidTransactions = [
  { room: 101, description: 'Mini Bar Charge', amount: 45, voidNo: 'V-1001' },
  { room: 204, description: 'Room Service', amount: 120, voidNo: 'V-1002' },
  { room: 305, description: 'Laundry Service', amount: 30, voidNo: 'V-1003' }
];
  this.GetRoomGraphicalReport();
     this.GetCurrentGuests();
    this.GetTodayVoidTransactions();
  }
  GetCurrentGuests() {
    this.api.GetCurrentGuests().subscribe(
      (res) => {
        if (res.isSuccess && res.data) {
          this.guests = res.data; // populate table with API response
          console.log('guest', this.guests);
        } else {
          this.guests = [];
        }
      },
      (err) => {
        console.error('API Error', err);
        this.guests = [];
      },
    );
  }
  GetTodayVoidTransactions() {
    this.api.GetTodayVoidTransactions().subscribe((res) => {
      console.log('response of void transection', res);
    });
  }

  getCardIcon(title: string): string {
    const icons: { [key: string]: string } = {
      Vacant: '🔓',
      Occupid: '🛏️',
      'Total Pax': '👥',
      'Today Checkout': '🚪',
      'Zxp Arrivals': '✈️',
    };
    return icons[title] || '📊';
  }

  ngOnDestroy(): void {
    try {
      if (this.avgChart) this.avgChart.destroy();
      if (this.revenueChart) this.revenueChart.destroy();
    } catch (e) {}
  }


GetRoomGraphicalReport() {

  this.api.GetRoomGraphicalReport().subscribe({
    next: (res: any) => {

      this.roomGraphicalData = res.data;
      const summary = this.roomGraphicalData.summary;

      // 🔹 Update KPI values from summary
      this.kpis = [
        { title: 'Out.Bal', value: summary.outBalance },
        { title: 'Day Rooms', value: summary.dayUseRooms },
        { title: 'Exp.Rev', value: summary.expectedRevenue },
        { title: 'Day Rev', value: summary.dayRevenue },
        { title: 'Avg.Rate', value: summary.avgRate },
        { title: 'Avg.Rate All', value: summary.avgRateAll },
      ];
this.cards = [
  { title: 'Vacant', color: 'light', value: summary?.vacantRooms },
  { title: 'Occupid', color: 'light', value: summary?.occupiedRooms },
  { title: 'Total Pax', color: 'light', value: 0 },
  { title: 'Today Checkout', color: 'light', value: summary?.todaysCheckouts  },
  { title: 'Exp Arrivals', color: 'light', value: 0  },
];
      console.log(this.kpis);

    },
    error: (err) => {
      console.error('Room Graphical Report Error:', err);
    }
  });
}
getOccColor(percentage: number | undefined): string {
  if (percentage === undefined) return 'gray'; // default color

  if (percentage >= 75) return 'red';      // high occupancy → red
  if (percentage >= 50) return 'orange';   // medium → orange
  return 'green';                           // low → green
}
}
