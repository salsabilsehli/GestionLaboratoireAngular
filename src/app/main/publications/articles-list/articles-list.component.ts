import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {MemberService} from "../../../../services/member.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../../@root/components/confirm-dialog/confirm-dialog.component";
import {takeUntil} from "rxjs/operators";
import {Article} from "../../../../models/publication.model";
import {PublicationService} from "../../../../services/publication.service";

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {

  /** Subject that emits when the component has been destroyed. */
    // tslint:disable-next-line:variable-name
  protected _onDestroy = new Subject<void>();
  displayedColumns: string[] = ['id', 'date', 'titre', 'type', 'lien', 'sourcepdf','actions'];

  dataSource: Article[] = [];

  constructor(
    private articleService:PublicationService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.fetchDataSource();
  }
//return all data
  fetchDataSource(): void {
    this.articleService.getAllArticles().then(data => {
      this.dataSource = data;
    });
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  onRemoveArticle(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
      disableClose: false,
    });

    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {
      console.log('removing: ', isDeleteConfirmed);
      if (isDeleteConfirmed) {
        this.articleService.removeArticleById(id).then(() => this.fetchDataSource());
      }
    });
  }


}
