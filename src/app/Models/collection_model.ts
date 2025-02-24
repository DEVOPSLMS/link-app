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
}
export interface deleteCollection{
    id:string;
}
export interface editCollection{
    collectionName:string;
}

