import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import quizz_questions from '../../assets/data/quizz.questions.json';

interface ResultData {
  title: string;
  description: string;
  tag: string;
}

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent implements OnInit {
  title: string = '';
  questions: any[] = [];
  questionSelected: any;

  answers: string[] = [];
  selectedResult!: ResultData;

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;

  ngOnInit(): void {
    if (quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title;
      this.questions = quizz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];
      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
    }
  }

  playerChoose(value: string): void {
    this.answers.push(value);
    this.nextQuestion();
  }

  async nextQuestion(): Promise<void> {
    this.questionIndex += 1;

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      const finalAlias: string = await this.checkResult(this.answers);
      this.finished = true;
      this.selectedResult = quizz_questions.results[finalAlias as keyof typeof quizz_questions.results];
    }
  }

  async checkResult(answers: string[]): Promise<string> {
    const result = answers.reduce((previous, current, i, arr) => {
      if (arr.filter(item => item === previous).length > arr.filter(item => item === current).length) {
        return previous;
      } else {
        return current;
      }
    });
    return result;
  }

  restartQuizz(): void {
    this.finished = false;
    this.answers = [];
    this.questionIndex = 0;
    this.questionSelected = this.questions[0];
  }
}
