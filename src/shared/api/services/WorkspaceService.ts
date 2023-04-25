/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateWorkspaceDto } from '../models/CreateWorkspaceDto';
import type { GetRoleDto } from '../models/GetRoleDto';
import type { UpdateRoleDto } from '../models/UpdateRoleDto';
import type { UpdateWorkspaceDto } from '../models/UpdateWorkspaceDto';
import type { WorkspaceDto } from '../models/WorkspaceDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class WorkspaceService {

    /**
     * Create workspace
     * @param formData 
     * @returns WorkspaceDto 
     * @throws ApiError
     */
    public static workspaceControllerCreate(
formData: CreateWorkspaceDto,
): CancelablePromise<WorkspaceDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/workspace',
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }

    /**
     * Get workspaces by querry
     * @param offset Offset of workspaces
     * @param limit Limit of workspaces
     * @param title Workspace title
     * @param filter Workspace title
     * @returns WorkspaceDto 
     * @throws ApiError
     */
    public static workspaceControllerFindAll(
offset?: number,
limit?: number,
title?: string,
filter?: string,
): CancelablePromise<Array<WorkspaceDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/workspace',
            query: {
                'offset': offset,
                'limit': limit,
                'title': title,
                'filter': filter,
            },
        });
    }

    /**
     * Get workspace by id
     * @param workspaceId 
     * @returns WorkspaceDto 
     * @throws ApiError
     */
    public static workspaceControllerFindOne(
workspaceId: number,
): CancelablePromise<WorkspaceDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/workspace/{workspaceId}',
            path: {
                'workspaceId': workspaceId,
            },
        });
    }

    /**
     * Update workspace by id
     * @param workspaceId 
     * @param formData 
     * @returns WorkspaceDto 
     * @throws ApiError
     */
    public static workspaceControllerUpdate(
workspaceId: number,
formData: UpdateWorkspaceDto,
): CancelablePromise<WorkspaceDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/workspace/{workspaceId}',
            path: {
                'workspaceId': workspaceId,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }

    /**
     * Delete workspace by id
     * @param workspaceId 
     * @returns WorkspaceDto 
     * @throws ApiError
     */
    public static workspaceControllerRemove(
workspaceId: number,
): CancelablePromise<WorkspaceDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/workspace/{workspaceId}',
            path: {
                'workspaceId': workspaceId,
            },
        });
    }

    /**
     * Add member to workspace
     * @param workspaceId 
     * @returns WorkspaceDto 
     * @throws ApiError
     */
    public static workspaceControllerAddMember(
workspaceId: number,
): CancelablePromise<WorkspaceDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/workspace/{workspaceId}/addMember',
            path: {
                'workspaceId': workspaceId,
            },
        });
    }

    /**
     * Remove member from workspace
     * @param workspaceId 
     * @returns WorkspaceDto 
     * @throws ApiError
     */
    public static workspaceControllerRemoveMember(
workspaceId: number,
): CancelablePromise<WorkspaceDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/workspace/{workspaceId}/removeMember',
            path: {
                'workspaceId': workspaceId,
            },
        });
    }

    /**
     * @param workspaceId 
     * @param requestBody 
     * @returns any 
     * @throws ApiError
     */
    public static workspaceControllerChangeWorkspaceRole(
workspaceId: number,
requestBody: UpdateRoleDto,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/workspace/{workspaceId}/changeWorkspaceRole',
            path: {
                'workspaceId': workspaceId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Get user role in workspace
     * @param workspaceId 
     * @returns GetRoleDto 
     * @throws ApiError
     */
    public static workspaceControllerGetRole(
workspaceId: number,
): CancelablePromise<GetRoleDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/workspace/{workspaceId}/getRole',
            path: {
                'workspaceId': workspaceId,
            },
        });
    }

}
