/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateProjectDto } from '../models/CreateProjectDto';
import type { GetRoleDto } from '../models/GetRoleDto';
import type { ProjectDto } from '../models/ProjectDto';
import type { UpdateProjectDto } from '../models/UpdateProjectDto';
import type { UpdateRoleDto } from '../models/UpdateRoleDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProjectsService {

    /**
     * Create project
     * @param workspaceId 
     * @param requestBody 
     * @returns ProjectDto 
     * @throws ApiError
     */
    public static projectControllerCreate(
workspaceId: number,
requestBody: CreateProjectDto,
): CancelablePromise<ProjectDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/workspace/{workspaceId}/projects',
            path: {
                'workspaceId': workspaceId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Get projects by filter
     * @param workspaceId 
     * @param offset Offset of projects
     * @param limit Limit of projects
     * @param filter Send showHidden or null
     * @param title Project title
     * @returns ProjectDto 
     * @throws ApiError
     */
    public static projectControllerGetProjects(
workspaceId: number,
offset?: number,
limit?: number,
filter?: string,
title?: string,
): CancelablePromise<Array<ProjectDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/workspace/{workspaceId}/projects/getProjects',
            path: {
                'workspaceId': workspaceId,
            },
            query: {
                'offset': offset,
                'limit': limit,
                'filter': filter,
                'title': title,
            },
        });
    }

    /**
     * Get all projects by filter (for workspace owner|manager)
     * @param workspaceId 
     * @param offset Offset of projects
     * @param limit Limit of projects
     * @param filter Send showHidden or null
     * @param title Project title
     * @returns ProjectDto 
     * @throws ApiError
     */
    public static projectControllerGetAllProjects(
workspaceId: number,
offset?: number,
limit?: number,
filter?: string,
title?: string,
): CancelablePromise<Array<ProjectDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/workspace/{workspaceId}/projects/getAllProjects',
            path: {
                'workspaceId': workspaceId,
            },
            query: {
                'offset': offset,
                'limit': limit,
                'filter': filter,
                'title': title,
            },
        });
    }

    /**
     * Get project by id
     * @param projectId 
     * @param workspaceId 
     * @returns ProjectDto 
     * @throws ApiError
     */
    public static projectControllerFindOne(
projectId: number,
workspaceId: number,
): CancelablePromise<ProjectDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/workspace/{workspaceId}/projects/{projectId}',
            path: {
                'projectId': projectId,
                'workspaceId': workspaceId,
            },
        });
    }

    /**
     * Update project
     * @param projectId 
     * @param workspaceId 
     * @param requestBody 
     * @returns ProjectDto 
     * @throws ApiError
     */
    public static projectControllerUpdate(
projectId: number,
workspaceId: number,
requestBody: UpdateProjectDto,
): CancelablePromise<ProjectDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/workspace/{workspaceId}/projects/{projectId}',
            path: {
                'projectId': projectId,
                'workspaceId': workspaceId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Delete project
     * @param projectId 
     * @param workspaceId 
     * @returns ProjectDto 
     * @throws ApiError
     */
    public static projectControllerRemove(
projectId: number,
workspaceId: number,
): CancelablePromise<ProjectDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/workspace/{workspaceId}/projects/{projectId}',
            path: {
                'projectId': projectId,
                'workspaceId': workspaceId,
            },
        });
    }

    /**
     * Add member to project
     * @param projectId 
     * @param workspaceId 
     * @returns ProjectDto 
     * @throws ApiError
     */
    public static projectControllerAddMember(
projectId: number,
workspaceId: number,
): CancelablePromise<ProjectDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/workspace/{workspaceId}/projects/{projectId}/addMember',
            path: {
                'projectId': projectId,
                'workspaceId': workspaceId,
            },
        });
    }

    /**
     * Remove member from project
     * @param projectId 
     * @param workspaceId 
     * @returns ProjectDto 
     * @throws ApiError
     */
    public static projectControllerRemoveMember(
projectId: number,
workspaceId: number,
): CancelablePromise<ProjectDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/workspace/{workspaceId}/projects/{projectId}/removeMember',
            path: {
                'projectId': projectId,
                'workspaceId': workspaceId,
            },
        });
    }

    /**
     * Change member role
     * @param projectId 
     * @param workspaceId 
     * @param requestBody 
     * @returns any 
     * @throws ApiError
     */
    public static projectControllerChangeProjectRole(
projectId: number,
workspaceId: number,
requestBody: UpdateRoleDto,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/workspace/{workspaceId}/projects/{projectId}/changeProjectRole',
            path: {
                'projectId': projectId,
                'workspaceId': workspaceId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Get user role in project
     * @param projectId 
     * @param workspaceId 
     * @returns GetRoleDto 
     * @throws ApiError
     */
    public static projectControllerGetRole(
projectId: number,
workspaceId: number,
): CancelablePromise<GetRoleDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/workspace/{workspaceId}/projects/{projectId}/getRole',
            path: {
                'projectId': projectId,
                'workspaceId': workspaceId,
            },
        });
    }

}
