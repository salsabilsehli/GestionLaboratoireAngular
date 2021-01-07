import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {takeUntil} from 'rxjs/operators';
import {Member} from "../../../../models/memeber.model";
import {MemberService} from "../../../../services/member.service";
import {ConfirmDialogComponent} from "../../../../@root/components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit, OnDestroy {
  /** Subject that emits when the component has been destroyed. */
    // tslint:disable-next-line:variable-name
  protected _onDestroy = new Subject<void>();
  displayedColumns: string[] = ['cin', 'name', 'photo', 'date', 'cv', 'typembr','actions'];

  dataSource: Member[] = [];

  constructor(
    private memberService:MemberService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.fetchDataSource();
    console.log('dataSource', this.dataSource);
  }
//return all data
  fetchDataSource(): void {
    this.memberService.getAllMembers().then(data => {
      this.dataSource = data;
    });
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  onRemoveAccount(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
      disableClose: false,
    });

    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {
      console.log('removing: ', isDeleteConfirmed);
      if (isDeleteConfirmed) {
        this.memberService.removeMemberById(id).then(() => this.fetchDataSource());
      }
    });
  }

}
