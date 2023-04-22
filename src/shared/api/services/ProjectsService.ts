/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateProjectDto } from '../models/CreateProjectDto';
import type { ProjectDto } from '../models/ProjectDto';
import type { UpdateProjectDto } from '../models/UpdateProjectDto';
import type { UpdateRoleDto } from '../models/UpdateRoleDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProjectsService {

    /**
     * Create project
     * @param id 
     * @param requestBody 
     * @returns ProjectDto 
     * @throws ApiError
     */
    public static projectControllerCreate(
id: number,
requestBody: CreateProjectDto,
): CancelablePromise<ProjectDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/workspace/{id}/projects',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Get projects by filter
     * @param id 
     * @param offset Offset of projects
     * @param limit Limit of projects
     * @param filter own|others|all
     * @param title Project title
     * @param isHidden Show hidden projects
     * @returns ProjectDto 
     * @throws ApiError
     */
    public static projectControllerGetProjects(
id: number,
offset?: number,
limit?: number,
filter?: string,
title?: string,
isHidden?: boolean,
): CancelablePromise<Array<ProjectDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/workspace/{id}/projects/getProjects',
            path: {
                'id': id,
            },
            query: {
                'offset': offset,
                'limit': limit,
                'filter': filter,
                'title': title,
                'isHidden': isHidden,
            },
        });
    }

    /**
     * Get all projects by filter (for workspace owner|manager)
     * @param id 
     * @param offset Offset of projects
     * @param limit Limit of projects
     * @param filter own|others|all
     * @param title Project title
     * @param isHidden Show hidden projects
     * @returns ProjectDto 
     * @throws ApiError
     */
    public static projectControllerGetAllProjects(
id: number,
offset?: number,
limit?: number,
filter?: string,
title?: string,
isHidden?: boolean,
): CancelablePromise<Array<ProjectDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/workspace/{id}/projects/getAllProjects',
            path: {
                'id': id,
            },
            query: {
                'offset': offset,
                'limit': limit,
                'filter': filter,
                'title': title,
                'isHidden': isHidden,
            },
        });
    }

    /**
     * Get project by id
     * @param projectId 
     * @returns ProjectDto 
     * @throws ApiError
     */
    public static projectControllerFindOne(
projectId: number,
): CancelablePromise<ProjectDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/workspace/{id}/projects/{projectId}',
            path: {
                'projectId': projectId,
            },
        });
    }

    /**
     * Update project
     * @param projectId 
     * @param requestBody 
     * @returns ProjectDto 
     * @throws ApiError
     */
    public static projectControllerUpdate(
projectId: number,
requestBody: UpdateProjectDto,
): CancelablePromise<ProjectDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/workspace/{id}/projects/{projectId}',
            path: {
                'projectId': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Delete project
     * @param projectId 
     * @returns ProjectDto 
     * @throws ApiError
     */
    public static projectControllerRemove(
projectId: number,
): CancelablePromise<ProjectDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/workspace/{id}/projects/{projectId}',
            path: {
                'projectId': projectId,
            },
        });
    }

    /**
     * Add member to project
     * @param projectId 
     * @returns ProjectDto 
     * @throws ApiError
     */
    public static projectControllerAddMember(
projectId: number,
): CancelablePromise<ProjectDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/workspace/{id}/projects/{projectId}/addMember',
            path: {
                'projectId': projectId,
            },
        });
    }

    /**
     * Remove member from project
     * @param projectId 
     * @returns ProjectDto 
     * @throws ApiError
     */
    public static projectControllerRemoveMember(
projectId: number,
): CancelablePromise<ProjectDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/workspace/{id}/projects/{projectId}/removeMember',
            path: {
                'projectId': projectId,
            },
        });
    }

    /**
     * @param projectId 
     * @param requestBody 
     * @returns any 
     * @throws ApiError
     */
    public static projectControllerChangeProjectRole(
projectId: number,
requestBody: UpdateRoleDto,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/workspace/{id}/projects/{projectId}/changeProjectRole',
            path: {
                'projectId': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
