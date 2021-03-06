import { Component, NgZone, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { isNumber } from 'util';
import { Category } from '../../classes/category';
import { DailyMaterialsUse } from '../../classes/daily-materials-use';
import { DailyUse } from '../../classes/daily-use';
import { DailyUseService } from '../../services/daily-use.service';
import { DailyUsesService } from '../../services/daily-uses.service';
import { MaterialsService } from '../../services/materials.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-daily-use-form',
  templateUrl: './daily-use-form.component.html',
  styleUrls: ['./daily-use-form.component.scss']
})
export class DailyUseFormComponent implements OnInit {
  form: FormGroup;
  dailyUse: DailyUse;
  materialsInputs: FormArray;
  category: Category;
  // materials: Material[];
  subscriptions: Subscription[] = [];
  loading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private dailyUsesService: DailyUsesService,
    private service: DailyUseService,
    private materialsService: MaterialsService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private zone: NgZone
  ) {
    this.dailyUse = new DailyUse();
    
    this.form = formBuilder.group({
      total: [null],
      created_at: [null, Validators.required],
      materials: formBuilder.array([])
    });
    this.materialsInputs = <FormArray>this.form.controls.materials;
  }

  ngOnInit() {
    this.subscriptions.push(
      this.materialsService.materials.subscribe(materials => {
        materials.forEach(material => {
          this.dailyUse.materials.push(new DailyMaterialsUse({
            material_id: material.id,
            material: material
          }))
          this.materialsInputs.push(this.formBuilder.group({
            material_id: [material.id, Validators.required],
            nominal: [null],
          }));
        });
        this.form.patchValue(this.dailyUse);
        this.form.controls.created_at.setValue(moment().toDate());
        this.form.markAsPristine();
      })
    );

    this.route.params.subscribe(params => {
      this.loading = true;
      while (this.materialsInputs.length > 0) this.materialsInputs.removeAt(0);
      this.form.reset();

      if (params.id) {
        this.service.getDailyUse(params.id).then(dailyUse => {
          dailyUse.materials.forEach(material => {
            this.materialsInputs.push(this.formBuilder.group({
              id: [material.id],
              material_id: [material.material_id, Validators.required],
              nominal: [material.nominal],
            }));
          });
          this.form.patchValue(dailyUse);
          if (isNumber(this.form.value.created_at)) {
            this.form.controls.created_at.setValue(moment(this.form.value.created_at).toDate());
          }
          this.dailyUse = dailyUse;
          this.form.markAsPristine();
          this.loading = false;
        });
      } else {
        this.materialsService.getMaterials();
        this.dailyUse = new DailyUse();
        this.loading = false;
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  get total(): number {
    let value: number = 0;
    this.materialsInputs.controls.forEach(material => value += parseInt(material.value.nominal) || 0);
    this.form.controls.total.setValue(value);
    return value;
  }

  submit() {
    (
      this.dailyUse.id ?
      this.service.updateDailyUse(this.dailyUse.id, this.form.value) :
      this.service.createDailyUse(this.form.value)
    )
      .tap(result => {
        this.service.getDailyUse(this.dailyUse.id || result.id).then(() => {
          this.zone.run(() => {
            this.notificationService.setNotification('Pengeluaran harian berhasil disimpan.', 'success');
            this.dailyUsesService.getDailyUses();
            this.router.navigate(['..'], { relativeTo: this.route });
          });
        });
      });
  }

}
