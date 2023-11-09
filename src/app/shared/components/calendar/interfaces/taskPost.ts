import { Guid } from "guid-typescript";

export interface taskPost{
    id: Guid,
    date: Date,
    title: string,
    text: string,
    ListUsers: [Guid]
}