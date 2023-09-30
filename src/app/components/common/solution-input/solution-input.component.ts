import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CheckedSolutionInputModel} from '../../../models/checked-solution-input-model';

@Component({
             selector: 'app-solution-input',
             templateUrl: './solution-input.component.html',
             styleUrls: ['./solution-input.component.scss'],
           })
export class SolutionInputComponent {
  @Output() public newSolutionEvent = new EventEmitter<CheckedSolutionInputModel>();
  @Input() public solutionOptions: string[];
  myForm: FormGroup;
  solutionFound: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
                                           textInput: ['', [Validators.required, Validators.pattern('^[áéíóöőúüűÁÉÍÓÖŐÚÜŰa-zA-Z0-9 ]*.{3,}$')]],
                                         });
  }

  onSubmit() {
    if (this.myForm.valid) {
      const inputValue = this.myForm.get('textInput').value;
      this.myForm.reset();
      let checkedSolutionInput: CheckedSolutionInputModel = this.checkSolution(inputValue);
      this.newSolutionEvent.emit(checkedSolutionInput);
    }
  }

  private checkSolution(input: string): CheckedSolutionInputModel {
    const checkedSolution: CheckedSolutionInputModel = {
      solution: input,
      correct: false
    }
    if (this.solutionOptions.includes(input.toLowerCase())) {
      checkedSolution.correct = true;
      this.solutionFound = true;
    }
    return checkedSolution;
  }


}
