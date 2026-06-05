import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Joke } from '../model/joke.model';

@Injectable({
  providedIn: 'root'
})
export class JokesService {

  private pathService = 'api/joke';

  private subject: BehaviorSubject<Joke | null> = new BehaviorSubject<Joke | null>(null);

  constructor(private httpClient: HttpClient) {
    this.getRandomJoke();
  }

  public getRandomJoke(): void {
    this.httpClient.get<Joke>(this.pathService).subscribe((joke: Joke) => this.subject.next(joke));
  }

  public joke$(): Observable<Joke | null > {
    return this.subject.asObservable();
  }

   public getJokeByCategory(category: string): string {
    if (category === 'dev') {
      return "Pourquoi les développeurs détestent la nature ? Parce qu'il y a trop de bugs.";
    } else if (category === 'network') {
      return "Je raconterais bien une blague sur l'UDP, mais je ne suis pas sûr que tu la reçoives.";
    } else if (category === 'database') {
      return "Un admin BDD rentre dans un bar et demande à deux tables : 'Je peux me joindre à vous ?'";
    } else {
      return "Pas de blague pour cette catégorie.";
    }
  }
}
