import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Villain } from '../Model/Domain/villano';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class villainDAO {
  private villainesUrl = 'api/villains';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  /////////// CREATE methods ///////////

  addVillain(Villain: Villain): Observable<Villain> {
    return this.http.post<Villain>(this.villainesUrl, Villain, this.httpOptions);
  }

  /////////// READ methods ///////////

  getVillaines(): Observable<Villain[]> {
    return this.http.get<Villain[]>(this.villainesUrl);
  }

  getVillainNo404<Data>(id: number): Observable<Villain> {
    const url = `${this.villainesUrl}/?id=${id}`;
    return this.http.get<Villain>(url);
  }

  getVillain(id: number): Observable<Villain> {
    const url = `${this.villainesUrl}/${id}`;
    return this.http.get<Villain>(url);
  }

  searchVillaines(term: string): Observable<Villain[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Villain[]>(`${this.villainesUrl}/?name=${term}`);
  }

  /////////// UPDATE methods ///////////

  updateVillain(Villain: Villain): Observable<any> {
    return this.http.put(this.villainesUrl, Villain, this.httpOptions);
  }
  /////////// DELETE methods ///////////

  deleteVillain(id: number): Observable<Villain> {
    const url = `${this.villainesUrl}/${id}`;

    return this.http.delete<Villain>(url, this.httpOptions);
  }
}
