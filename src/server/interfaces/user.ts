export interface IUserId {
    id: string;
}

export interface IUserEmail {
    id: string;
    email: string;
}

export interface IPagination {
    page: number;
    pageSize: number;
}

export interface IUpdateData {
    firstName?: string;
    lastName?: string;
}