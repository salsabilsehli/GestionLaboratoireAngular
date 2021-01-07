import {Injectable} from '@angular/core';
import {GLOBAL} from '../app/app-config';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Tool} from "../models/Tool.model";

@Injectable({
    providedIn: 'root'
  }

)
export class OutilService{

  private path = `${environment.gatewayEndpoint}/outil-service`;
  // @ts-ignore
  //public placeholderTools: Tool[] = GLOBAL._DB.members;
//httpClient pour avoir la liste de la bd
  constructor(
    private httpClient: HttpClient,
  ) {
  }
  getAllTools(): Promise<Tool[]> {
    return this.httpClient.get<Tool[]>(`${this.path}/outils`).toPromise();
    // return new Promise(resolve => resolve(this.placeholderMembers));
  }

  getToolById(id: string): Promise<Tool> {
    return this.httpClient.get<Tool>(`${this.path}/outils/${id}`).toPromise();
    // return new Promise(resolve => resolve(
    //   this.placeholderMembers.filter(item => item.id === id)[0] ?? null
    // ));
  }

  /**
   * create a new member or update an old member.
   * a new member doesn't have an id
   */
  saveTool(tool: any): Promise<Tool> {
    // return this.httpClient.post<Member>('linkToRestApi', member).toPromise();
    const toolToSave = {
      id: tool.id ?? Math.ceil(Math.random() * 10000).toString(),
      createdDate: tool.createdDate ?? new Date().toISOString(), ...tool
    };
    //this.placeholderTools = [toolToSave, ...this.placeholderTools.filter(item => item.id !== tool.id)];

    return new Promise(resolve => resolve(toolToSave));
  }

  createTool(member: Tool): Promise<Tool> {
    return this.httpClient.post<Tool>(`${this.path}/outils/`, member).toPromise();
  }

  updateTool(id: string, member: Tool): Promise<Tool> {
    return this.httpClient.put<Tool>(`${this.path}/outils/${id}`, member).toPromise();
  }

  removeToolById(id: string): Promise<void> {
    return this.httpClient.delete<void>(`${this.path}/outils/${id}`).toPromise();
    //this.placeholderMembers = this.placeholderMembers.filter(item => item.id !== id);
    //return new Promise(resolve => resolve());
  }

}
