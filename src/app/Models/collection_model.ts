export interface CollectionModel{
    collectionName:string;
    created:Date;
}
export interface CollectionResponse{
    id:string;
    collectionName:string;
    userId:string;
    links:[];
    created:Date;
  
}
export interface deleteCollection{
    id:string;
}
export interface editCollection{
    collectionName:string;
}

