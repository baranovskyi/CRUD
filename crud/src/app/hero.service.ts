import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';



@Injectable({ providedIn: 'root' })
export class HeroService {

  
  private heroesUrl = 'http://localhost:3000/all-heroes'; 
  private heroIdUrl = 'http://localhost:3000/heroId';
  private saveHeroUrl = 'http://localhost:3000/save';
  private deleteUrl = 'http://localhost:3000/heroes/';
  private updateUrl = 'http://localhost:3000/update'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

    getAllHeroes () {
      return this.http.get(this.heroesUrl);
    }

  /** GET heroes from the server */
  getHeroes (): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }
/** Update hero */
  updateHero (hero: Hero) {
    return this.http.put(this.updateUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero._id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }


    /** DELETE: delete the hero from the server */
    deleteHero (_id: string) {
      return this.http.delete(this.deleteUrl  + _id);
    }

  /** POST: add a new hero to the database */
    addHero (name: string) {
      return this.http.post(this.saveHeroUrl, {"name": name}, this.httpOptions)
    } 

  /** GET hero by id. Return `undefined` when id not found */


  /** GET hero by id. Will 404 if id not found */
  getHero(_id: string)  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let parametres = new URLSearchParams();
    parametres.set('_id', _id)
    return this.http.get(this.heroIdUrl+ '?_id='+_id)
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    
  }
}