import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-shared-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shared-data.component.html',
  styleUrl: './shared-data.component.css',
})
export class SharedDataComponent {}
