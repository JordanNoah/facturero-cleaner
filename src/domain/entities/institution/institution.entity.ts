export class InstitutionEntity {
    constructor(
        public id: number,
        public uuid: string,
        public name: string,
        public abbreviation: string,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt: Date
    ) {}
}