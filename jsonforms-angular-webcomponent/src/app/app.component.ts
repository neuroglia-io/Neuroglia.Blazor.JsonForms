import { createAjv, JsonFormsRendererRegistryEntry, JsonSchema } from '@jsonforms/core';
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  OnInit,
  SimpleChange,
} from '@angular/core';
import { JsonFormsAngularService, JsonForms } from '@jsonforms/angular';
import { angularMaterialRenderers } from '@jsonforms/angular-material';
import { Options } from 'ajv';

const stringType = typeof "";

@Component({
  selector: 'app-ng-jsonforms',
  template: `<jsonforms-outlet *ngIf="schema"></jsonforms-outlet>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [JsonFormsAngularService]
})
export class AppComponent extends JsonForms implements OnChanges, OnInit {

  @Input() options: Options = {
    schemaId: 'id',
    allErrors: true
  };
  @Input() override renderers: JsonFormsRendererRegistryEntry[] = angularMaterialRenderers;

  constructor(
    jsonformsService: JsonFormsAngularService
  ) {
    super(jsonformsService);
  }
  
  override ngOnInit(): void {
    this.ajv = createAjv(this.options);
    if (!!this.schema) super.ngOnInit();
  }
  
  override ngOnChanges(changes: SimpleChanges): void {
    Object.entries(changes).forEach(([prop, entry]) => {
      if (entry.currentValue !== entry.previousValue) {
        if (typeof(entry.currentValue) === stringType) {
          try {
            entry.currentValue = JSON.parse(entry.currentValue);
            if (prop !== 'options') {
              (this as any)[prop] = entry.currentValue;
            }
          }
          catch {
            // ignore if the string cannot be deserialzed
          }
        }
        if (prop === 'options') {
          changes['ajv'] = new SimpleChange(
            this.ajv,
            createAjv(entry.currentValue),
            false
          );
          this.ajv = changes['ajv'].currentValue;
        }
      }
    });
    if (!!changes['schema']?.firstChange) {
      super.ngOnInit();
    }
    super.ngOnChanges(changes);
  }

}
