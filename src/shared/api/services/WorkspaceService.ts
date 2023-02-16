/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateWorkspaceDto } from '../models/CreateWorkspaceDto';
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
     * @param isOwned Workspace title
     * @returns WorkspaceDto 
     * @throws ApiError
     */
    public static workspaceControllerFindAll(
offset?: number,
limit?: number,
title?: string,
isOwned?: boolean,
): CancelablePromise<Array<WorkspaceDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/workspace',
            query: {
                'offset': offset,
                'limit': limit,
                'title': title,
                'isOwned': isOwned,
            },
        });
    }

    /**
     * Get workspace by id
     * @param id 
     * @returns WorkspaceDto 
     * @throws ApiError
     */
    public static workspaceControllerFindOne(
id: number,
): CancelablePromise<WorkspaceDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/workspace/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * Update workspace by id
     * @param id 
     * @param formData 
     * @returns WorkspaceDto 
     * @throws ApiError
     */
    public static workspaceControllerUpdate(
id: number,
formData: UpdateWorkspaceDto,
): CancelablePromise<WorkspaceDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/workspace/{id}',
            path: {
                'id': id,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }

    /**
     * Delete workspace by id
     * @param id 
     * @returns WorkspaceDto 
     * @throws ApiError
     */
    public static workspaceControllerRemove(
id: number,
): CancelablePromise<WorkspaceDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/workspace/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * Add member to workspace
     * @param id 
     * @returns WorkspaceDto 
     * @throws ApiError
     */
    public static workspaceControllerAddMember(
id: number,
): CancelablePromise<WorkspaceDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/workspace/{id}/addMember',
            path: {
                'id': id,
            },
        });
    }

    /**
     * Remove member from workspace
     * @param id 
     * @returns WorkspaceDto 
     * @throws ApiError
     */
    public static workspaceControllerRemoveMember(
id: number,
): CancelablePromise<WorkspaceDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/workspace/{id}/removeMember',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id 
     * @param requestBody 
     * @returns any 
     * @throws ApiError
     */
    public static workspaceControllerChangeWorkspaceRole(
id: number,
requestBody: UpdateRoleDto,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/workspace/{id}/changeWorkspaceRole',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
