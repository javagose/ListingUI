import {Rapport } from './rapport';

export class InternalColonne{

  id: number;
  version: number;
  name: string;
  field: string;
  displayName: string;
  ordre: number;
  type: string;
  filterType: string;
  internalFilter: boolean;
  selectOption: string;
  dynamicOption: boolean;
  dataOption: string;
  depend: string;
  rapport: Rapport;
  lastUpdatedStamp: Date;
  createdStamp: Date;
  

  constructor(){}
}