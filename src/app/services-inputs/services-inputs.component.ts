import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-services-inputs',
  templateUrl: './services-inputs.component.html',
  styleUrls: ['./services-inputs.component.scss']
})
export class ServicesInputsComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() id: number;

  notDeletedAccount: number = null;
  deletedCount: number = 0;

  services: FormArray;

  loading: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.countServices();
    this.services = <FormArray>this.form.controls.services;
  }

  addService() {
    (<FormArray>this.form.controls.services).push(
      this.formBuilder.group({
        id: [null],
        name: [null, Validators.required],
        price: [null, Validators.required],
        note: [null],
        deleted: [null]
      })
    );
    this.countServices();
    console.log(this.form);
  }

  removeService(i: number) {
    let services: FormArray = <FormArray>this.form.controls.services;

    if (this.id) {
      const controls = (<FormGroup>services.controls[i]).controls;
      controls.deleted.setValue(true);

      // Update validation rules
      controls.name.clearValidators();
      controls.name.updateValueAndValidity();
      controls.price.clearValidators();
      controls.price.updateValueAndValidity();
    } else {
      services.removeAt(i);
    }

    this.countServices()
  }

  restoreService(i: number) {
    const controls = (<FormGroup>this.services.controls[i]).controls;
    controls.deleted.setValue(null);

    // Update validation rules
    controls.name.setValidators(Validators.required);
    controls.name.updateValueAndValidity();
    controls.price.setValidators(Validators.required);
    controls.price.updateValueAndValidity();

    this.countServices();
  }

  countServices() {
    this.deletedCount = 0;
    const controls = (<FormArray>this.form.controls.services).controls;
    controls.forEach(group => this.deletedCount += group.value.deleted ? 1 : 0);
    this.notDeletedAccount = controls.length - this.deletedCount;
  }

}
