import { TestBed } from '@angular/core/testing';

import { JokesService } from './jokes.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('JokesService', () => {
  let service: JokesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JokesService]
    });
    service = TestBed.get(JokesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('devrait récupérer une blague et mettre à jour l\'Observable', () => {
    // 1. On vide d'abord la requête automatique lancée par le constructeur
    httpMock.expectOne('api/joke').flush({});

    // 2. On appelle explicitement la méthode à tester
    service.getRandomJoke();

    // 3. On intercepte la nouvelle requête HTTP
    const req = httpMock.expectOne('api/joke');
    expect(req.request.method).toBe('GET');

    // 4. On simule le retour du backend avec notre fausse blague
    req.flush(mockJoke);

    // 5. On vérifie que la méthode joke$() renvoie bien la blague mise à jour
    service.joke$().subscribe((joke) => {
      expect(joke).toEqual(mockJoke);
    });
    
  });
