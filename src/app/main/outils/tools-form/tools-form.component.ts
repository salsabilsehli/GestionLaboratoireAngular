import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Tool} from "../../../../models/Tool.model";
import {OutilService} from "../../../../services/outil.service";

@Component({
  selector: 'app-tools-form',
  templateUrl: './tools-form.component.html',
  styleUrls: ['./tools-form.component.scss']
})
export class ToolsFormComponent implements OnInit {

  currentItemId: string;
  item: Tool;
  form: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toolService: OutilService,
  ) {
  }

  ngOnInit(): void {
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId) {
      this.toolService.getToolById(this.currentItemId).then(item => {
        this.item = item;
        this.initForm(item)
      });
    } else {
      this.initForm(null);
    }
  }

  initForm(item: Tool) {
    this.form = new FormGroup({

      date: new FormControl(item?.date, [Validators.required]),
      source: new FormControl(item?.source, [Validators.required]),

    });
  }


  isFormInEditMode(): boolean {
    return !!this.currentItemId;
  }

  onSubmit(): void {
    console.log(this.form.value);
    const objectToSubmit: Tool = {...this.item, ...this.form.value};
    if (this.isFormInEditMode()) {
      this.toolService.updateTool(this.currentItemId, objectToSubmit).then(() => {
        this.router.navigate(['./tools']);
      });
    } else {
      this.toolService.createTool(objectToSubmit).then(() => {
        this.router.navigate(['./tools']);
      });
    }
  }


}
