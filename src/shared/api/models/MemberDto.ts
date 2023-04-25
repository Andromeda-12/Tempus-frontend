/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Role } from './Role';

export type MemberDto = {
    /**
     * User id
     */
    id: number;
    /**
     * Email
     */
    email: string;
    /**
     * User firstname
     */
    firstName: string;
    /**
     * User lastname
     */
    lastName: string;
    /**
     * User avatar (Url)
     */
    avatar: string;
    /**
     * Member role
     */
    role: Role;
};
