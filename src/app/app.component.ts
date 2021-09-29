import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { CheckboxRenderer } from './checkbox-renderer.component';

@Component({
  selector: 'my-app',
  template: `
    <ag-grid-angular
      #agGrid
      style="width: 100vw; height: 100vh;"
      id="myGrid"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [rowData]="rowData"
      [frameworkComponents]="frameworkComponents"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  `,
})
export class AppComponent {
  private gridApi;
  private gridColumnApi;

  private columnDefs;
  private defaultColDef;
  private rowData: [];

  constructor(private http: HttpClient) {
    this.columnDefs = [
      { field: 'Field', rowDrag: true },
      {
        headerName: 'Imported',
        field: 'imported',
        cellRenderer: 'checkboxRenderer',
        width: 100,
      },
      {
        headerName: 'Format',
        field: 'format',
      },
    ];
    this.defaultColDef = {};
    this.frameworkComponents = {
      checkboxRenderer: CheckboxRenderer,
    };
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get(
        'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinnersSmall.json'
      )
      .subscribe((data) => {
        data = data.map((d) => ({
          ...d,
          registered: Math.random() < 0.5,
        }));
        this.rowData = [
          { Field: 'Campaign Number' },
          {
            Field: 'External reference',
            imported: true,
            format: 'up to 20 characters',
          },
          { Field: 'Sales Area Code', imported: true, format: '2 characters' },
          { Field: 'Break Date', imported: true, format: 'yyyymmdd' },
          { Field: 'Break Time', format: 'hhmmss' },
          { Field: 'Length', imported: true, format: 'seconds' },
          { Field: 'Sequence', imported: true, format: 'up to 127' },
          {
            Field: 'Industry Code',
            imported: true,
            format: 'up to 15 characters',
          },
          { Field: 'Copy Code', format: 'number' },
          { Field: 'Protected Copy', imported: true, format: 'true or false' },
          { Field: 'Spot Number', imported: true, format: '' },
          { Field: 'Tolerance', imported: true, format: 'hhmm' },
        ];
      });
  }
}
