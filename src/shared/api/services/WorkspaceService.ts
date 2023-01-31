/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateWorkspaceDto } from '../models/CreateWorkspaceDto';
import type { UpdateWorkspaceDto } from '../models/UpdateWorkspaceDto';
import type { WorkspaceDto } from '../models/WorkspaceDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class WorkspaceService {

    /**
     * Create workspace
     * @param requestBody 
     * @returns WorkspaceDto 
     * @throws ApiError
     */
    public static workspaceControllerCreate(
requestBody: CreateWorkspaceDto,
): CancelablePromise<WorkspaceDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/workspace',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Get workspaces by querry
     * @param offset Offset of workspaces
     * @param limit Limit of workspaces
     * @param title Workspace title
     * @returns WorkspaceDto 
     * @throws ApiError
     */
    public static workspaceControllerFindAll(
offset?: number,
limit?: number,
title?: string,
): CancelablePromise<Array<WorkspaceDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/workspace',
            query: {
                'offset': offset,
                'limit': limit,
                'title': title,
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
     * @param requestBody 
     * @returns WorkspaceDto 
     * @throws ApiError
     */
    public static workspaceControllerUpdate(
id: number,
requestBody: UpdateWorkspaceDto,
): CancelablePromise<WorkspaceDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/workspace/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
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

}
