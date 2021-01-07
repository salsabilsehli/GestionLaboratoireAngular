import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../../@root/components/confirm-dialog/confirm-dialog.component";
import {takeUntil} from "rxjs/operators";
import {OutilService} from "../../../../services/outil.service";
import {Tool} from "../../../../models/Tool.model";

@Component({
  selector: 'app-tools-list',
  templateUrl: './tools-list.component.html',
  styleUrls: ['./tools-list.component.scss']
})
export class ToolsListComponent implements OnInit {

  /** Subject that emits when the component has been destroyed. */
    // tslint:disable-next-line:variable-name
  protected _onDestroy = new Subject<void>();
  displayedColumns: string[] = ['id', 'date', 'source','actions'];

  dataSource: Tool[] = [];

  constructor(
    private toolService:OutilService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.fetchDataSource();
  }
//return all data
  fetchDataSource(): void {
    this.toolService.getAllTools().then(data => {
      this.dataSource = data;
    });
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  onRemoveTool(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
      disableClose: false,
    });

    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {
      console.log('removing: ', isDeleteConfirmed);
      if (isDeleteConfirmed) {
        this.toolService.removeToolById(id).then(() => this.fetchDataSource());
      }
    });
  }

}
