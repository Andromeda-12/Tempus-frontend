/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthUserDto } from '../models/AuthUserDto';
import type { CreateUserDto } from '../models/CreateUserDto';
import type { ForgetPasswordDto } from '../models/ForgetPasswordDto';
import type { RecoveryPasswordDto } from '../models/RecoveryPasswordDto';
import type { ServerSideTokensDto } from '../models/ServerSideTokensDto';
import type { UserDto } from '../models/UserDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthService {

    /**
     * Login
     * @param requestBody 
     * @returns UserDto 
     * @throws ApiError
     */
    public static authControllerSignIn(
requestBody: AuthUserDto,
): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/signIn',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Create new user
     * @param requestBody 
     * @returns UserDto 
     * @throws ApiError
     */
    public static authControllerSignUp(
requestBody: CreateUserDto,
): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/signUp',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Logout
     * @returns any 
     * @throws ApiError
     */
    public static authControllerSignOut(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/signOut',
        });
    }

    /**
     * Refresh tokens
     * @returns UserDto 
     * @throws ApiError
     */
    public static authControllerRefresh(): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/refresh',
        });
    }

    /**
     * Refresh tokens for server side
     * @returns ServerSideTokensDto 
     * @throws ApiError
     */
    public static authControllerRefreshServerSide(): CancelablePromise<ServerSideTokensDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/refresh-server-side',
        });
    }

    /**
     * Forget password. Send message to user email
     * @param requestBody 
     * @returns any 
     * @throws ApiError
     */
    public static authControllerForgetPassword(
requestBody: ForgetPasswordDto,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/forget-password',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Restore password by token from email
     * @param token 
     * @param requestBody 
     * @returns any 
     * @throws ApiError
     */
    public static authControllerRecoveryPassword(
token: string,
requestBody: RecoveryPasswordDto,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/recovery-password/{token}',
            path: {
                'token': token,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Check recovery token for validation
     * @param token 
     * @returns any 
     * @throws ApiError
     */
    public static authControllerCheckRecoveryToken(
token: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/checkRecoveryToken/{token}',
            path: {
                'token': token,
            },
        });
    }

}
