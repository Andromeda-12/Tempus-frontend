/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChangeUserMailDto } from '../models/ChangeUserMailDto';
import type { ChangeUserPasswordDto } from '../models/ChangeUserPasswordDto';
import type { UpdateUserDto } from '../models/UpdateUserDto';
import type { UserDto } from '../models/UserDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * Get all users by filter
     * Need authorization
     * @param taskId Task id
     * @param skip How many users need skip
     * @param take How many users need take
     * @param email Email
     * @param searchText User firstname
     * @returns UserDto 
     * @throws ApiError
     */
    public static userControllerGetAll(
taskId?: number,
skip?: number,
take?: number,
email?: string,
searchText?: string,
): CancelablePromise<Array<UserDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user',
            query: {
                'taskId': taskId,
                'skip': skip,
                'take': take,
                'email': email,
                'searchText': searchText,
            },
        });
    }

    /**
     * Update user
     * @param formData 
     * @returns UserDto 
     * @throws ApiError
     */
    public static userControllerUpdate(
formData: UpdateUserDto,
): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/user',
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }

    /**
     * Get current user
     * @returns UserDto 
     * @throws ApiError
     */
    public static userControllerGetCurrentUser(): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/currentUser',
        });
    }

    /**
     * Change password
     * @param requestBody 
     * @returns any 
     * @throws ApiError
     */
    public static userControllerChangePassword(
requestBody: ChangeUserPasswordDto,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/user/changePassword',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Change mail by token
     * @param token 
     * @returns void 
     * @throws ApiError
     */
    public static userControllerConfirmChangeMail(
token: string,
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/confirmChangeMail/{token}',
            path: {
                'token': token,
            },
        });
    }

    /**
     * Send change mail message
     * @param requestBody 
     * @returns void 
     * @throws ApiError
     */
    public static userControllerChangeMail(
requestBody: ChangeUserMailDto,
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/changeMail',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
