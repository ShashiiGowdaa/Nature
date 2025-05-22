import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFeedback } from './Feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private feedbackUrl: string = 'http://localhost:5000/feedback'
  constructor( private httpClient: HttpClient) {}

  getFeedback():Observable<IFeedback[]>{
    return this.httpClient.get<IFeedback[]>(this.feedbackUrl)
  }

  postFeedback(feedbackData: IFeedback):Observable<IFeedback[]>{
    return this.httpClient.post<IFeedback[]>(this.feedbackUrl, feedbackData)
  }

}
