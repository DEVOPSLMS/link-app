export interface LinkModel{
    url:string;
    collectionId:string;
    tags:string
}
export interface LinkResponse{
    id:string;
    userId:string;
    Url:string;
    tags:string;
    Created:Date;
    CollectionId:string;
}
export interface UpdateLinkModel{
    url:string;
    tags:string;
}