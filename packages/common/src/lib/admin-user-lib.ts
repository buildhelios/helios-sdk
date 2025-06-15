import { BehaviorSubject } from "rxjs";

export const ignoreAdminEmailDomains=[
    'iyio.io',
    'gardeniq.io',
    'teamimpactware.com',
]

export const hideAdminUserSubject=new BehaviorSubject<boolean>(true);
