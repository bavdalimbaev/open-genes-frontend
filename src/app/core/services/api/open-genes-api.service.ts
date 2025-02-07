import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AgeRelatedProcesses,
  AgingMechanisms,
  Gene,
  Genes,
  Phylum,
  ProteinClasses,
  SelectionCriteria,
} from '../../models';
import { TranslateService } from '@ngx-translate/core';
import { AssociatedDiseaseCategories, AssociatedDiseases } from '../../models/open-genes-api/associated-diseases.model';
import { GenesWLifespanResearches } from '../../models/open-genes-api/genes-with-increase-lifespan-researches.model';
import { GenesInHorvathClock } from '../../models/open-genes-api/genes-in-horvath-clock.model';
import { ApiResponse } from '../../models/api-response.model';
import { SearchModel } from '../../models/open-genes-api/search.model';
import { Pagination } from '../../models/settings.model';
import { Diet } from '../../models/open-genes-api/diet.model';
import { ResearchArguments } from '../../models/open-genes-api/researches.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly currentLang: string;

  constructor(private http: HttpClient, private translate: TranslateService) {
    this.currentLang = this.translate.currentLang;

    // API doesn't have Chinese language
    if (this.translate.currentLang === 'zh') {
      this.currentLang = 'en';
    }
  }

  // Legacy API

  getLastEditedGene(): Observable<Genes[]> {
    return this.http.get<Genes[]>(`/api/gene/by-latest`);
  }

  getGenesByFunctionalClusters(list: number[]): Observable<Genes[]> {
    return this.http.get<Genes[]>(`/api/gene/by-functional-cluster/${list}?lang=${this.currentLang}`);
  }

  getGenesByExpressionChange(expression: number): Observable<Genes[]> {
    return this.http.get<Genes[]>(`/api/gene/by-expression-change/${expression}?lang=${this.currentLang}`);
  }

  getGeneByHGNCsymbol(symbol: string): Observable<Gene> {
    return this.http.get<Gene>(`/api/gene/${symbol}?lang=${this.currentLang}`);
  }

  getGenesMatchByString(request: string, param: string = 'input'): Observable<SearchModel> {
    const params = new HttpParams().set(`${param}`, `${request}`);

    return this.http.get<SearchModel>(`/api/gene/suggestions`, { params });
  }

  getGoTermMatchByString(request: string): Observable<Genes[]> {
    return this.http.get<Genes[]>(`/api/gene/by-go-term/${request}`);
  }

  getGenesWLifespanResearches(): Observable<GenesWLifespanResearches[]> {
    return this.http.get<GenesWLifespanResearches[]>(`/api/increase-lifespan?lang=${this.currentLang}`);
  }

  getGenesInHorvathClock(): Observable<GenesInHorvathClock[]> {
    return this.http.get<GenesInHorvathClock[]>(`/api/methylation?lang=${this.currentLang}`);
  }

  getGenesForDiet(pagination?: Pagination): Observable<ApiResponse<Diet>> {
    let params = new HttpParams();

    if (pagination) {
      params = params
        .set('lang', this.translate.currentLang)
        .set('page', pagination?.page)
        .set('pageSize', pagination?.pageSize);
    }

    return this.http.get<ApiResponse<Diet>>(`/api/diet`, { params });
  }

  getGenes(): Observable<Genes[]> {
    return this.http.get<Genes[]>(`/api/gene?lang=${this.currentLang}`);
  }

  // New API
  getGenesV2(pagination?: Pagination): Observable<ApiResponse<Genes>> {
    let params = new HttpParams();

    if (pagination) {
      params = params
        .set('lang', this.translate.currentLang)
        .set('page', pagination?.page)
        .set('pageSize', pagination?.pageSize);
    }
    return this.http.get<ApiResponse<Genes>>(`/api/gene/search`, { params });
  }

  getDiseases(): Observable<AssociatedDiseases[]> {
    return this.http.get<AssociatedDiseases[]>(`/api/disease?lang=${this.currentLang}`);
  }

  getDiseaseCategories(): Observable<AssociatedDiseaseCategories[]> {
    return this.http.get<AssociatedDiseaseCategories[]>(`/api/disease-category?lang=${this.currentLang}`);
  }

  getSelectionCriteria(): Observable<SelectionCriteria[]> {
    return this.http.get<SelectionCriteria[]>(`/api/criteria?lang=${this.currentLang}`);
  }

  getAgeRelatedProcesses(): Observable<AgeRelatedProcesses[]> {
    return this.http.get<AgeRelatedProcesses[]>(`/api/age-related-processes?lang=${this.currentLang}`);
  }

  getAgingMechanisms(): Observable<AgingMechanisms[]> {
    return this.http.get<AgingMechanisms[]>(`/api/aging-mechanisms?lang=${this.currentLang}`);
  }

  getProteinClasses(): Observable<ProteinClasses[]> {
    return this.http.get<ProteinClasses[]>(`/api/protein-class?lang=${this.currentLang}`);
  }

  getPhylum(): Observable<Phylum[]> {
    return this.http.get<Phylum[]>(`/api/phylum?lang=${this.currentLang}`);
  }

  getResearches(research: ResearchArguments, page: number, pageSize?: number): Observable<any> {
    return this.http.get<any[]>(`/api/research/${research}?lang=${this.currentLang}&page=${page}`);
  }
}
