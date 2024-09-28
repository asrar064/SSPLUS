export interface UserTypes {
    _id?: string;
    name: string,
    email: string,
    phone: number,
    password?: string,
    storeName: string,
    storeAddress: string,
    createdAt?: Date;
}