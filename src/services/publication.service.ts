import {Injectable} from '@angular/core';
import {GLOBAL} from '../app/app-config';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Member} from "../models/memeber.model";
import {Article} from "../models/publication.model";

@Injectable({
    providedIn: 'root'
  }

)
export class PublicationService{

  private path = `${environment.gatewayEndpoint}/publication-service`;
  // @ts-ignore
  //public placeholderMembers: Member[] = GLOBAL._DB.members;
//httpClient pour avoir la liste de la bd
  constructor(
    private httpClient: HttpClient,
  ) {
  }
  getAllArticles(): Promise<Article[]> {
    return this.httpClient.get<Article[]>(`${this.path}/publications`).toPromise();
    // return new Promise(resolve => resolve(this.placeholderMembers));
  }

  getArticleById(id: string): Promise<Article> {
    return this.httpClient.get<Article>(`${this.path}/publications/${id}`).toPromise();
    // return new Promise(resolve => resolve(
    //   this.placeholderMembers.filter(item => item.id === id)[0] ?? null
    // ));
  }

  /**
   * create a new member or update an old member.
   * a new member doesn't have an id
   */
  saveArticle(article: any): Promise<Article> {
    // return this.httpClient.post<Member>('linkToRestApi', member).toPromise();
    const articleToSave = {
      id: article.id ?? Math.ceil(Math.random() * 10000).toString(),
      createdDate: article.createdDate ?? new Date().toISOString(), ...article
    };
  //  this.placeholderMembers = [articleToSave, ...this.placeholderMembers.filter(item => item.id !== member.id)];

    return new Promise(resolve => resolve(articleToSave));
  }

  createArticle(article: Article): Promise<Article> {
    return this.httpClient.post<Article>(`${this.path}/publications`, article).toPromise();
  }

  updateArticle(id: string, article: Article): Promise<Article> {
    return this.httpClient.put<Article>(`${this.path}/publications/${id}`, article).toPromise();
  }

  removeArticleById(id: string): Promise<void> {
    return this.httpClient.delete<void>(`${this.path}/publications/${id}`).toPromise();
    //this.placeholderMembers = this.placeholderMembers.filter(item => item.id !== id);
    //return new Promise(resolve => resolve());
  }

}
