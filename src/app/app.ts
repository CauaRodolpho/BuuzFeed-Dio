import { Component } from '@angular/core';
import { QuizzComponent } from './components/quizz/quizz.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [QuizzComponent],
  template: `<app-quizz></app-quizz>`
})
export class AppComponent {}
