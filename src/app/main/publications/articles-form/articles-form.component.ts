import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Article} from "../../../../models/publication.model";
import {PublicationService} from "../../../../services/publication.service";
import {Tool} from "../../../../models/Tool.model";

@Component({
  selector: 'app-articles-form',
  templateUrl: './articles-form.component.html',
  styleUrls: ['./articles-form.component.scss']
})
export class ArticlesFormComponent implements OnInit {

  currentItemId: string;
  item: Article;
  form: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private articleService: PublicationService,
  ) {
  }

  ngOnInit(): void {
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId) {
      this.articleService.getArticleById(this.currentItemId).then(item => {
        this.item = item;
        this.initForm(item)
      });
    } else {
      this.initForm(null);
    }
  }

  initForm(item: Article) {
    this.form = new FormGroup({

      titre: new FormControl(item?.titre, [Validators.required]),
      lien: new FormControl(item?.lien, [Validators.required]),
      date: new FormControl(item?.date, [Validators.required]),
      type: new FormControl(item?.type, [Validators.required]),
      sourcepdf: new FormControl(item?.sourcepdf, [Validators.required]),

    });
  }


  isFormInEditMode(): boolean {
    return !!this.currentItemId;
  }

  onSubmit(): void {
    console.log(this.form.value);
    const objectToSubmit: Article = {...this.item, ...this.form.value};
    if (this.isFormInEditMode()) {
      this.articleService.updateArticle(this.currentItemId, objectToSubmit).then(() => {
        this.router.navigate(['./articles']);
      });
    } else {
      this.articleService.createArticle(objectToSubmit).then(() => {
        this.router.navigate(['./articles']);
      });
    }
  }


}
