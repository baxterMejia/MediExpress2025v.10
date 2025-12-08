import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../enviroments/environment';

@Injectable({ providedIn: 'root' })
export class CatService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getBreeds(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/cats/breeds`).pipe(
      catchError(error => {
        console.error('Error al obtener razas', error);
        return of([]);
      })
    );
  }

  getImagesByBreed(breedId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/images/imagesbybreedid`, {
      params: { breed_id: breedId }
    }).pipe(
      catchError(error => {
        console.error('Error al obtener imágenes', error);
        return of([]);
      })
    );
  }
}
