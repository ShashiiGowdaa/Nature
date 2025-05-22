import { Component, OnInit } from '@angular/core';
import { IFeedback } from '../Feedback';
import { FeedbackService } from '../feedback.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from "../footer/footer.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
  imports: [CommonModule, FormsModule, FooterComponent, RouterModule],
})
export class FeedbackComponent implements OnInit {
  titlebackground: { image: string } = { image: 'assets/img/page-title-bg.webp' };

  feedbacks: IFeedback[] = []; // Store feedback list
  newFeedback: IFeedback = { rating: 0, comment: '' }; // Initialize as an object, not array

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.loadFeedback();
  }

  // Load feedback from the server
  loadFeedback(): void {
    this.feedbackService.getFeedback().subscribe((data) => {
      this.feedbacks = data;
    });
  }

  // Submit new feedback
  submitFeedback(): void {
    if (this.newFeedback.rating > 0 && this.newFeedback.comment.trim() !== '') {
      this.feedbackService.postFeedback(this.newFeedback).subscribe(() => {
        this.loadFeedback(); // Reload feedback list after posting
        this.newFeedback = { rating: 0, comment: '' }; // Reset form
      });
    } else {
      alert('Please provide a valid rating and comment.');
    }
  }
}
