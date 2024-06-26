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
  solutionForm: FormGroup;
  solutionFound: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.solutionForm = this.formBuilder.group({
                                           textInput: ['', [Validators.required]],
                                         });
  }

  onSubmit() {
    if (this.solutionForm.valid) {
      const inputValue = this.solutionForm.get('textInput').value;
      this.solutionForm.reset();
      let checkedSolutionInput: CheckedSolutionInputModel = this.checkSolution(inputValue);
      this.newSolutionEvent.emit(checkedSolutionInput);
    }
  }

  private checkSolution(input: string): CheckedSolutionInputModel {
    const checkedSolution: CheckedSolutionInputModel = {
      solution: input,
      correct: false
    }
    if (this.solutionOptions.includes(input.toLowerCase().trim())) {
      checkedSolution.correct = true;
      this.solutionFound = true;
    }
    return checkedSolution;
  }


}
