export interface Employee {
    _id: string;
    name: string;
    company: string;
    address: string;
}


export interface Geo {
    lat: string;
    lng: string;
}

export interface Address {
    street?: string;
    suite?: string;
    city: string;
    zipcode?: string;
    geo?: Geo;
}

export interface Company {
    name: any;
    catchPhrase?: string;
    bs?: string;
}

export interface User {
    id: number;
    name: string;
    username?: string;
    email?: string;
    address?: Address;
    phone?: string;
    website?: string;
    company?: Company;
}

export interface DialogConfigData {
    dialogData: Dialogdata,
    id: string
    
}

export interface Dialogdata {
    title: string;
    description: string;
    action: string;
}