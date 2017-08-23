export class Rapport {

    id : number;
    version: number;
    nom : string;
    typeRapport: string;
    requete: string;
    description: string;
    enableGridMenu: boolean;
    enableFiltring: boolean;
    enableLimitFiltring: boolean;
    sorting: boolean;
    pagination: boolean;
    paginationPageSize: boolean;
    paginationPageSizes: boolean;
    enableGrouping: boolean;
    exporterMenuXls: boolean;
    exporterMenuPdf: boolean;
    exporterMenuCsv: boolean;
    exporterMenuAllData: boolean;
    exporterMenuVisisbleData: boolean;
    permission: boolean;  
    lastUpdatedStamp: Date;
    createdStamp: Date;

    constructor(){}

    // constructeur sans arguments
    construct( nom?, typeRapport?, requete?, description?, enableFiltring?, enableLimitFiltring?,
            sorting? ,pagination?  ){ 
                this.nom = nom;
                this.typeRapport = typeRapport;
                this.requete = requete;
                this.description =description;
                this.enableFiltring = enableFiltring;
                this.enableLimitFiltring = enableLimitFiltring;
                this.sorting = sorting;
                this.pagination = pagination;    
            }
}