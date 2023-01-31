/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateProjectDto } from '../models/CreateProjectDto';
import type { ProjectDto } from '../models/ProjectDto';
import type { UpdateProjectDto } from '../models/UpdateProjectDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProjectsService {

    /**
     * Create project
     * @param requestBody 
     * @returns ProjectDto 
     * @throws ApiError
     */
    public static projectControllerCreate(
requestBody: CreateProjectDto,
): CancelablePromise<ProjectDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/projects',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Get projects by filter
     * @param offset Offset of projects
     * @param limit Limit of projects
     * @param owner Project owner
     * @param title Project title
     * @param isHidden Show hidden projects
     * @returns ProjectDto 
     * @throws ApiError
     */
    public static projectControllerFindAll(
offset?: number,
limit?: number,
owner?: string,
title?: string,
isHidden?: boolean,
): CancelablePromise<Array<ProjectDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/projects',
            query: {
                'offset': offset,
                'limit': limit,
                'owner': owner,
                'title': title,
                'isHidden': isHidden,
            },
        });
    }

    /**
     * Get project by id
     * @param id 
     * @returns ProjectDto 
     * @throws ApiError
     */
    public static projectControllerFindOne(
id: number,
): CancelablePromise<ProjectDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/projects/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * Update project
     * @param id 
     * @param requestBody 
     * @returns ProjectDto 
     * @throws ApiError
     */
    public static projectControllerUpdate(
id: number,
requestBody: UpdateProjectDto,
): CancelablePromise<ProjectDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/projects/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Delete project
     * @param id 
     * @returns ProjectDto 
     * @throws ApiError
     */
    public static projectControllerRemove(
id: number,
): CancelablePromise<ProjectDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/projects/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * Add member to project
     * @param id 
     * @returns ProjectDto 
     * @throws ApiError
     */
    public static projectControllerAddMember(
id: number,
): CancelablePromise<ProjectDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/projects/{id}/addMember',
            path: {
                'id': id,
            },
        });
    }

    /**
     * Remove member from project
     * @param id 
     * @returns ProjectDto 
     * @throws ApiError
     */
    public static projectControllerRemoveMember(
id: number,
): CancelablePromise<ProjectDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/projects/{id}/removeMember',
            path: {
                'id': id,
            },
        });
    }

}
