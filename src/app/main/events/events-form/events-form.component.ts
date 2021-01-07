import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {EventService} from "../../../../services/event.service";
import {Evenement} from "../../../../models/event.model";

@Component({
  selector: 'app-events-form',
  templateUrl: './events-form.component.html',
  styleUrls: ['./events-form.component.scss']
})
export class EventsFormComponent implements OnInit {
  currentItemId: string;
  item: Evenement;
  form: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
  ) {
  }

  ngOnInit(): void {
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId) {
      this.eventService.getEventById(this.currentItemId).then(item => {
        this.item = item;
        this.initForm(item)
      });
    } else {
      this.initForm(null);
    }
  }

  initForm(item: Evenement) {
    this.form = new FormGroup({

      date: new FormControl(item?.date, [Validators.required]),
      lieu: new FormControl(item?.lieu, [Validators.required]),
      titre: new FormControl(item?.titre, [Validators.required]),

    });
  }


  isFormInEditMode(): boolean {
    return !!this.currentItemId;
  }

  onSubmit(): void {
    console.log(this.form.value);
    const objectToSubmit: Evenement = {...this.item, ...this.form.value};
    if (this.isFormInEditMode()) {
      this.eventService.updateEvent(this.currentItemId, objectToSubmit).then(() => {
        this.router.navigate(['./events']);
      });
    } else {
      this.eventService.createEvent(objectToSubmit).then(() => {
        this.router.navigate(['./events']);
      });
    }
  }

}
