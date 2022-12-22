import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';

import { TableColumn, TableButtonAction } from '../../models/custom-grid.model';

@Component({
  selector: 'app-mat-custom-gird',
  templateUrl: './custom-grid.component.html',
  styleUrls: ['./custom-grid.component.css'],
})
export class CustomGridComponent implements OnInit, OnChanges {

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @Output() action: EventEmitter<TableButtonAction> = new EventEmitter<TableButtonAction>()
  @Input() columns: Array<TableColumn> = [];
  @Input() dataset: Array<Customer> = [];
  @ViewChild(MatSort, { static: true }) sort: MatSort = new MatSort();
  
  dataSource: MatTableDataSource<Customer> = new MatTableDataSource<Customer>();
  selection = new SelectionModel<Customer>(true, []);
  displayedColumns: string[] = [];
  value: string = "";
  private router: Router;

  constructor( r: Router) { this.router = r;}
  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource<Customer>(this.dataset);
  }

  ngOnInit() {
    // set checkbox column
    this.displayedColumns.push("select");

    // set table columns
    this.displayedColumns = this.displayedColumns.concat(this.columns.map(x => x.columnDef));    // pre-fix static

    // add action column
    this.displayedColumns.push("action");
    

    // set pagination
    this.dataSource.paginator = this.paginator ?? null;
  }
 

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  add() {
    this.router.navigate(['/add']);
  }

  onTableAction(e: any, customer: Customer): void {
    console.log(e)
    let outPut: TableButtonAction = { name: (<TableButtonAction>e).name, value: customer};
    this.action.emit(outPut)
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
}


