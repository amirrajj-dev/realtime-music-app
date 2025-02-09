export interface IUser {
    _id : string;
    id?: string
    fullname: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ISong {
    _id :string;
    title: string;
    artist: string;
    imageUrl : string ;
    audioUrl : string ;
    albumId : string | null;
    duration: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IAlbum {
    _id: string;
    title: string;
    artist: string;
    releaseYear: number;
    imageUrl: string;
    songs: ISong[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IMessage {
    _id: string;
    senderId: string;
    receiverId: string;
    message: string;
    createdAt?: Date;
    updatedAt?: Date;
}