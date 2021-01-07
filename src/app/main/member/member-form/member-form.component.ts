import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Member} from "../../../../models/memeber.model";
import {MemberService} from "../../../../services/member.service";


@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss']
})
export class MemberFormComponent implements OnInit {
  currentItemId: string;
  item: Member;
  form: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private memberService: MemberService,
  ) {
  }

  ngOnInit(): void {
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId) {
      this.memberService.getMemberById(this.currentItemId).then(item => {
        this.item = item;
        this.initForm(item)
      });
    } else {
      this.initForm(null);
    }
  }

  initForm(item: Member) {
    this.form = new FormGroup({

      cin: new FormControl(item?.cin, [Validators.required]),
      nom: new FormControl(item?.nom, [Validators.required]),
      prenom: new FormControl(item?.prenom, [Validators.required]),
      photo: new FormControl(item?.photo, [Validators.required]),
      date: new FormControl(item?.date, [Validators.required]),
      cv: new FormControl(item?.cv, [Validators.required]),
      typembr: new FormControl(item?.typembr, [Validators.required]),
    });
  }


  isFormInEditMode(): boolean {
    return !!this.currentItemId;
  }
  selectedOption: string;

  isMemberEtud(): boolean{
    return this.selectedOption==="etudiant";
  }
  typeMember = [

    { id: "enseignant", name: "enseignant" },
    { id: "etudiant", name: "etudiant" },
  ];
  onSubmit(): void {
    console.log(this.form.value);
    const objectToSubmit: Member = {...this.item, ...this.form.value};
    if (this.isFormInEditMode()) {
      if (this.isMemberEtud()){
        this.memberService.updateEtud(this.currentItemId, objectToSubmit).then(() => {
          this.router.navigate(['./members']);
        });
      }
      else {
        this.memberService.updateEns(this.currentItemId, objectToSubmit).then(() => {
          this.router.navigate(['./members']);
        });
      }

    } else {
      if (this.isMemberEtud()){  this.memberService.createEtud(objectToSubmit).then(() => {
        this.router.navigate(['./members']);
      });}
      else {
        this.memberService.createEns(objectToSubmit).then(() => {
          this.router.navigate(['./members']);
        });
      }

    }
  }



}
