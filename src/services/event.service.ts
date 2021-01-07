import {Injectable} from '@angular/core';
import {GLOBAL} from '../app/app-config';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Evenement} from "../models/event.model";

@Injectable({
    providedIn: 'root'
  }

)
export class EventService{

  private path = `${environment.gatewayEndpoint}/evenement-service`;
  // @ts-ignore
  //public placeholderMembers: Event[] = GLOBAL._DB.members;
//httpClient pour avoir la liste de la bd
  constructor(
    private httpClient: HttpClient,
  ) {
  }
  getAllEvents(): Promise<Evenement[]> {
    return this.httpClient.get<Evenement[]>(`${this.path}/evenements`).toPromise();
    // return new Promise(resolve => resolve(this.placeholderMembers));
  }

  getEventById(id: string): Promise<Evenement> {
    return this.httpClient.get<Evenement>(`${this.path}/evenements/${id}`).toPromise();
    // return new Promise(resolve => resolve(
    //   this.placeholderMembers.filter(item => item.id === id)[0] ?? null
    // ));
  }

  /**
   * create a new member or update an old member.
   * a new member doesn't have an id
   */
  saveEvent(event: any): Promise<Evenement> {
    // return this.httpClient.post<Member>('linkToRestApi', member).toPromise();
    const eventToSave = {
      id: event.id ?? Math.ceil(Math.random() * 10000).toString(),
      createdDate: event.createdDate ?? new Date().toISOString(), ...event
    };
  //  this.placeholderEvents = [memberToSave, ...this.placeholderMembers.filter(item => item.id !== member.id)];

    return new Promise(resolve => resolve(eventToSave));
  }

  createEvent(event: Evenement): Promise<Evenement> {
    return this.httpClient.post<Evenement>(`${this.path}/evenements`, event).toPromise();
  }

  updateEvent(id: string, event: Evenement): Promise<Evenement> {
    return this.httpClient.put<Evenement>(`${this.path}/evenements/${id}`, event).toPromise();
  }

  removeEventById(id: string): Promise<void> {
    return this.httpClient.delete<void>(`${this.path}/evenements/${id}`).toPromise();
    //this.placeholderMembers = this.placeholderMembers.filter(item => item.id !== id);
    //return new Promise(resolve => resolve());
  }

}
