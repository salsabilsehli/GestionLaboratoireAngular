import {Injectable} from '@angular/core';
import {GLOBAL} from '../app/app-config';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Member} from "../models/memeber.model";

@Injectable({
    providedIn: 'root'
  }

)
export class MemberService{

  private path = `${environment.gatewayEndpoint}/membre-service`;
  // @ts-ignore
  public placeholderMembers: Member[] = GLOBAL._DB.members;
//httpClient pour avoir la liste de la bd
  constructor(
    private httpClient: HttpClient,
  ) {
  }
  getAllMembers(): Promise<Member[]> {
    return this.httpClient.get<Member[]>(`${this.path}/membres`).toPromise();
    // return new Promise(resolve => resolve(this.placeholderMembers));
  }

  getMemberById(id: string): Promise<Member> {
    return this.httpClient.get<Member>(`${this.path}/fullmember/${id}`).toPromise();
    // return new Promise(resolve => resolve(
    //   this.placeholderMembers.filter(item => item.id === id)[0] ?? null
    // ));
  }

  /**
   * create a new member or update an old member.
   * a new member doesn't have an id
   */
  saveMember(member: any): Promise<Member> {
    // return this.httpClient.post<Member>('linkToRestApi', member).toPromise();
    const memberToSave = {
      id: member.id ?? Math.ceil(Math.random() * 10000).toString(),
      createdDate: member.createdDate ?? new Date().toISOString(), ...member
    };
    this.placeholderMembers = [memberToSave, ...this.placeholderMembers.filter(item => item.id !== member.id)];

    return new Promise(resolve => resolve(memberToSave));
  }

  createEtud(member: Member): Promise<Member> {
    return this.httpClient.post<Member>(`${this.path}/membres/etudiant`, member).toPromise();
  }

  updateEtud(id: string, member: Member): Promise<Member> {
    return this.httpClient.put<Member>(`${this.path}/membres/etudiant/${id}`, member).toPromise();
  }
  createEns(member: Member): Promise<Member> {
    return this.httpClient.post<Member>(`${this.path}/membres/enseignant`, member).toPromise();
  }

  updateEns(id: string, member: Member): Promise<Member> {
    return this.httpClient.put<Member>(`${this.path}/membres/enseignant/${id}`, member).toPromise();
  }
  removeMemberById(id: string): Promise<void> {
    return this.httpClient.delete<void>(`${this.path}/membres/${id}`).toPromise();
    //this.placeholderMembers = this.placeholderMembers.filter(item => item.id !== id);
    //return new Promise(resolve => resolve());
  }

}
