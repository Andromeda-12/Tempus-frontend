/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChangeUserPasswordDto } from '../models/ChangeUserPasswordDto';
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
     * @returns UserDto 
     * @throws ApiError
     */
    public static userControllerChangePassword(
requestBody: ChangeUserPasswordDto,
): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/user/changePassword',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
