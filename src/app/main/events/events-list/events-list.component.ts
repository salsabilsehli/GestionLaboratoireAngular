import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../../@root/components/confirm-dialog/confirm-dialog.component";
import {takeUntil} from "rxjs/operators";
import {EventService} from "../../../../services/event.service";
import {Evenement} from "../../../../models/event.model";

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

  /** Subject that emits when the component has been destroyed. */
    // tslint:disable-next-line:variable-name
  protected _onDestroy = new Subject<void>();
  displayedColumns: string[] = ['id', 'date', 'titre', 'lieu','actions'];

  dataSource: Evenement[] = [];

  constructor(
    private eventService:EventService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.fetchDataSource();
  }
//return all data
  fetchDataSource(): void {
    this.eventService.getAllEvents().then(data => {
      this.dataSource = data;
    });
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  onRemoveEvent(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
      disableClose: false,
    });

    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {
      console.log('removing: ', isDeleteConfirmed);
      if (isDeleteConfirmed) {
        this.eventService.removeEventById(id).then(() => this.fetchDataSource());
      }
    });
  }

}
