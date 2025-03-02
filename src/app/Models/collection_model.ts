export interface CollectionModel{
    collectionName:string;
}
export interface CollectionResponse{
    id:string;
    collectionName:string;
    userId:string;
    links:[];
    created:Date;
    isPublic:boolean;
    privateKey:string;
}
export interface deleteCollection{
    id:string;
}
export interface editCollection{
    collectionName:string;
}
export interface editCollectionPublic{
    isPublic:boolean;
}

