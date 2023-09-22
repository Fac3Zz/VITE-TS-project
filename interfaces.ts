export interface UserData {
    avatar: string;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    email: string;
    phone_number: string;
    employment: {
        title: string;
        key_skill: string;
    };
    address: {
        city: string;
        street_name: string;
        street_address: string;
        zip_code: string;
        state: string;
        country: string;
        coordinates: {
            lat: string;
            lng: string;
        };
    };
    subscription: {
        plan: string;
        status: string;
        payment_method: string;
        term: string;
    };
}

export interface RandomDataApi {
    defaultURL: string;
    getUserList: (size?: number) => Promise<UserData[]>;
}