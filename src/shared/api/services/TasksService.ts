/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AssignedTaskDto } from '../models/AssignedTaskDto';
import type { CreateTaskDto } from '../models/CreateTaskDto';
import type { ReportDto } from '../models/ReportDto';
import type { TaskDto } from '../models/TaskDto';
import type { UpdateTaskDto } from '../models/UpdateTaskDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TasksService {

    /**
     * Get report about work for user
     * @param projectId 
     * @param workspaceId 
     * @returns ReportDto 
     * @throws ApiError
     */
    public static taskControllerGetReport(
projectId: number,
workspaceId: number,
): CancelablePromise<Array<ReportDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/workspace/{workspaceId}/project/{projectId}/task/getReport',
            path: {
                'projectId': projectId,
                'workspaceId': workspaceId,
            },
        });
    }

    /**
     * Get tasks by filter
     * @param projectId 
     * @param workspaceId 
     * @param title Task title
     * @param offset Offset of tasks
     * @param limit Limit of tasks
     * @param filter Workspace title
     * @returns TaskDto 
     * @throws ApiError
     */
    public static taskControllerGetAll(
projectId: number,
workspaceId: number,
title?: string,
offset?: number,
limit?: number,
filter?: string,
): CancelablePromise<Array<TaskDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/workspace/{workspaceId}/project/{projectId}/task',
            path: {
                'projectId': projectId,
                'workspaceId': workspaceId,
            },
            query: {
                'title': title,
                'offset': offset,
                'limit': limit,
                'filter': filter,
            },
        });
    }

    /**
     * Create task
     * @param projectId 
     * @param workspaceId 
     * @param requestBody 
     * @returns TaskDto 
     * @throws ApiError
     */
    public static taskControllerCreate(
projectId: number,
workspaceId: number,
requestBody: CreateTaskDto,
): CancelablePromise<TaskDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/workspace/{workspaceId}/project/{projectId}/task',
            path: {
                'projectId': projectId,
                'workspaceId': workspaceId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Get task by id
     * @param id 
     * @param projectId 
     * @param workspaceId 
     * @returns TaskDto 
     * @throws ApiError
     */
    public static taskControllerGetById(
id: number,
projectId: number,
workspaceId: number,
): CancelablePromise<Array<TaskDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/workspace/{workspaceId}/project/{projectId}/task/{id}',
            path: {
                'id': id,
                'projectId': projectId,
                'workspaceId': workspaceId,
            },
        });
    }

    /**
     * Delete task
     * @param id 
     * @param projectId 
     * @param workspaceId 
     * @returns TaskDto 
     * @throws ApiError
     */
    public static taskControllerRemove(
id: number,
projectId: number,
workspaceId: number,
): CancelablePromise<TaskDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/workspace/{workspaceId}/project/{projectId}/task/{id}',
            path: {
                'id': id,
                'projectId': projectId,
                'workspaceId': workspaceId,
            },
        });
    }

    /**
     * Update task
     * @param id 
     * @param projectId 
     * @param workspaceId 
     * @param requestBody 
     * @returns TaskDto 
     * @throws ApiError
     */
    public static taskControllerUpdate(
id: number,
projectId: number,
workspaceId: number,
requestBody: UpdateTaskDto,
): CancelablePromise<TaskDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/workspace/{workspaceId}/project/{projectId}/task/{id}',
            path: {
                'id': id,
                'projectId': projectId,
                'workspaceId': workspaceId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Assign worker to task
     * @param id 
     * @param userId 
     * @param projectId 
     * @param workspaceId 
     * @returns AssignedTaskDto 
     * @throws ApiError
     */
    public static taskControllerAssignUser(
id: number,
userId: number,
projectId: number,
workspaceId: number,
): CancelablePromise<AssignedTaskDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/workspace/{workspaceId}/project/{projectId}/task/{id}/assignWorker',
            path: {
                'id': id,
                'projectId': projectId,
                'workspaceId': workspaceId,
            },
            query: {
                'userId': userId,
            },
        });
    }

    /**
     * Unassign user from task
     * @param id 
     * @param userId 
     * @param projectId 
     * @param workspaceId 
     * @returns AssignedTaskDto 
     * @throws ApiError
     */
    public static taskControllerRemoveUser(
id: number,
userId: number,
projectId: number,
workspaceId: number,
): CancelablePromise<AssignedTaskDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/workspace/{workspaceId}/project/{projectId}/task/{id}/unassignWorker',
            path: {
                'id': id,
                'projectId': projectId,
                'workspaceId': workspaceId,
            },
            query: {
                'userId': userId,
            },
        });
    }

    /**
     * Start track task
     * @param id 
     * @param projectId 
     * @param workspaceId 
     * @returns AssignedTaskDto 
     * @throws ApiError
     */
    public static taskControllerStarTimeLine(
id: number,
projectId: number,
workspaceId: number,
): CancelablePromise<AssignedTaskDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/workspace/{workspaceId}/project/{projectId}/task/{id}/startTimeLine',
            path: {
                'id': id,
                'projectId': projectId,
                'workspaceId': workspaceId,
            },
        });
    }

    /**
     * Finish track task
     * @param id 
     * @param projectId 
     * @param workspaceId 
     * @returns AssignedTaskDto 
     * @throws ApiError
     */
    public static taskControllerEndTimeLine(
id: number,
projectId: number,
workspaceId: number,
): CancelablePromise<AssignedTaskDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/workspace/{workspaceId}/project/{projectId}/task/{id}/endTimeLine',
            path: {
                'id': id,
                'projectId': projectId,
                'workspaceId': workspaceId,
            },
        });
    }

    /**
     * Complete task
     * @param id 
     * @param projectId 
     * @param workspaceId 
     * @returns AssignedTaskDto 
     * @throws ApiError
     */
    public static taskControllerCompleteTask(
id: number,
projectId: number,
workspaceId: number,
): CancelablePromise<AssignedTaskDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/workspace/{workspaceId}/project/{projectId}/task/{id}/completeTask',
            path: {
                'id': id,
                'projectId': projectId,
                'workspaceId': workspaceId,
            },
        });
    }

    /**
     * @param id 
     * @returns any 
     * @throws ApiError
     */
    public static taskControllerGetMemberProgress(
id: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/workspace/{workspaceId}/project/{projectId}/task/{id}/getMemberProgress',
            path: {
                'id': id,
            },
        });
    }

}
