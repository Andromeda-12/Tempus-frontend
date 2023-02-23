/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdateUserDto = {
    /**
     * Email
     */
    email?: string;
    /**
     * User firstname
     */
    firstName?: string;
    /**
     * User lastname
     */
    lastName?: string;
    /**
     * User password
     */
    password?: string;
    /**
     * User avatar (File)
     */
    avatarFile?: Blob;
};
