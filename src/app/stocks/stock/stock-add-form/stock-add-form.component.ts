import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-stock-add-form',
  templateUrl: './stock-add-form.component.html',
  styleUrls: ['./stock-add-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockAddFormComponent {
  form!: FormGroup;
  @Output() newStock: EventEmitter<string>;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      symbol: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(5)],
      ],
    });

    this.newStock = new EventEmitter<string>();
  }

  get symbol() {
    return this.form.get('symbol') as FormControl;
  }

  trackNewStock() {
    if (!this.symbol || !this.form.valid) return;

    const value = this.form.controls['symbol'].value as string;
    this.newStock.emit(value.toUpperCase());
    this.form.reset();
  }
}
