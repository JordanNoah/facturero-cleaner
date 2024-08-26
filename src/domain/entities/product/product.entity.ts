export class ProductEntity {
    constructor(
        public id:number,
        public uuid:string,
        public name:string,
        public abbreviation:string,
        public productType:string,
        public price:number,
        public has_iva:boolean,
        public institution_id:number,
        public createdAt:Date,
        public updatedAt:Date,
        public deletedAt:Date
    ){}
}