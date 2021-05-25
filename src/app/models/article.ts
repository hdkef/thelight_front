import { Comment } from "./comment";
import { WriterInfo } from "./writerinfo";

export interface Article {
    ID:Number,
    Title:string,
    Date:string,
    ImageURL:string,
    Preview:string,
    Body,
    WriterInfo:WriterInfo,
    Tag:string[],
}