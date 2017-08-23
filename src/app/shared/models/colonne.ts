import {Rapport} from './rapport';

export class Colonne {
  id: number;
  version: number;
  name: string;
  field: string;
  displayName: string;
  ordre: number;
  type: string;
  visible: boolean;
  internalFilter : boolean;
  cellTooltip: boolean;
  filterType: string;
  enableFiltering: boolean;
  enableLimitFiltering: boolean;
  selectOption: string;
  dynamicOption: boolean;
  dataOption: string;
  enableSorting: boolean;
  sortDirection: string;
  sortPriority: number;
  suppressRemoveSort: boolean;
  expresserSuppressexport: boolean;
  grouping: number;
  aggregationType: number;
  pinnedLeft: boolean;
  pinnedRight: boolean;
  headerCellClass: string;
  headerCellTemplate: string;
  cellFilter: string;
  cellClass: string;
  cellTemplate: string;
  footerCellClass: string;
  footerCellFilter: string;
  footerCellTemplate: string;
  width: string;
  depend: string;
  lastUpdatedStamp: Date;
  createdStamp: Date;

  constructor(){}

}