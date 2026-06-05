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

    public getJokeByLanguage(language: string): string {
    switch (language.toLowerCase()) {
      case 'java':
        return "Pourquoi les développeurs Java portent-ils des lunettes ? Parce qu'ils ne voient pas bien sans leurs objets.";
      case 'javascript':
        return "JavaScript : où '0' == 0 est vrai, mais '0' === 0 est faux. Cherche pas, c'est magique.";
      case 'python':
        return "Un développeur Python ne crie jamais, il indente.";
      case 'c':
        return "J'ai une excellente blague sur le C, mais elle n'a aucune classe.";
      default:
        return "Je ne connais pas ce langage, il a sûrement été inventé ce matin par un framework JS.";
    }
  }

  public getJokeByRole(role: string): string {
    if (role === 'frontend') {
      return "Pourquoi le dev front-end a-t-il toujours froid ? Parce qu'il oublie de fermer ses balises.";
    } else if (role === 'backend') {
      return "Le dev back-end ne ment jamais, il dit juste : 'Chez moi ça marche'.";
    } else if (role === 'devops') {
      return "Un DevOps ne pleure pas, il déploie ses larmes en production via un pipeline CI/CD.";
    } else {
      return "Rôle inconnu, tu dois être le chef de projet.";
    }
  }

  public getDailyStatusJoke(dayOfWeek: number): string {
    if (dayOfWeek === 1) {
      return "Lundi : Le café ne compile même pas.";
    } else if (dayOfWeek === 5) {
      return "Vendredi : Ne jamais, au grand jamais, faire de mise en production.";
    }
    return "Journée classique : on cherche le point-virgule manquant.";
  }
}
