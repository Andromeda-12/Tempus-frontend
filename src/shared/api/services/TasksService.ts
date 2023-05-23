/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTaskDto } from '../models/CreateTaskDto';
import type { MemberProgressDto } from '../models/MemberProgressDto';
import type { ReportDto } from '../models/ReportDto';
import type { TaskDto } from '../models/TaskDto';
import type { UpdateTaskDto } from '../models/UpdateTaskDto';
import type { ValidationUserIdDto } from '../models/ValidationUserIdDto';

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
     * @param filter Assigned filter
     * @param completedFilter Completed filter
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
completedFilter?: string,
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
                'completedFilter': completedFilter,
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
     * @param taskId 
     * @param projectId 
     * @param workspaceId 
     * @returns TaskDto 
     * @throws ApiError
     */
    public static taskControllerGetById(
taskId: number,
projectId: number,
workspaceId: number,
): CancelablePromise<TaskDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/workspace/{workspaceId}/project/{projectId}/task/{taskId}',
            path: {
                'taskId': taskId,
                'projectId': projectId,
                'workspaceId': workspaceId,
            },
        });
    }

    /**
     * Delete task
     * @param taskId 
     * @param projectId 
     * @param workspaceId 
     * @returns TaskDto 
     * @throws ApiError
     */
    public static taskControllerRemove(
taskId: number,
projectId: number,
workspaceId: number,
): CancelablePromise<TaskDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/workspace/{workspaceId}/project/{projectId}/task/{taskId}',
            path: {
                'taskId': taskId,
                'projectId': projectId,
                'workspaceId': workspaceId,
            },
        });
    }

    /**
     * Update task
     * @param taskId 
     * @param projectId 
     * @param workspaceId 
     * @param requestBody 
     * @returns TaskDto 
     * @throws ApiError
     */
    public static taskControllerUpdate(
taskId: number,
projectId: number,
workspaceId: number,
requestBody: UpdateTaskDto,
): CancelablePromise<TaskDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/workspace/{workspaceId}/project/{projectId}/task/{taskId}',
            path: {
                'taskId': taskId,
                'projectId': projectId,
                'workspaceId': workspaceId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Assign worker to task
     * @param taskId 
     * @param projectId 
     * @param workspaceId 
     * @param requestBody 
     * @returns TaskDto 
     * @throws ApiError
     */
    public static taskControllerAssignUser(
taskId: number,
projectId: number,
workspaceId: number,
requestBody: ValidationUserIdDto,
): CancelablePromise<TaskDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/workspace/{workspaceId}/project/{projectId}/task/{taskId}/assignWorker',
            path: {
                'taskId': taskId,
                'projectId': projectId,
                'workspaceId': workspaceId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Unassign user from task
     * @param taskId 
     * @param projectId 
     * @param workspaceId 
     * @param requestBody 
     * @returns TaskDto 
     * @throws ApiError
     */
    public static taskControllerRemoveUser(
taskId: number,
projectId: number,
workspaceId: number,
requestBody: ValidationUserIdDto,
): CancelablePromise<TaskDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/workspace/{workspaceId}/project/{projectId}/task/{taskId}/unassignWorker',
            path: {
                'taskId': taskId,
                'projectId': projectId,
                'workspaceId': workspaceId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Start track task
     * @param taskId 
     * @param projectId 
     * @param workspaceId 
     * @returns MemberProgressDto 
     * @throws ApiError
     */
    public static taskControllerStarTimeLine(
taskId: number,
projectId: number,
workspaceId: number,
): CancelablePromise<MemberProgressDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/workspace/{workspaceId}/project/{projectId}/task/{taskId}/startTimeLine',
            path: {
                'taskId': taskId,
                'projectId': projectId,
                'workspaceId': workspaceId,
            },
        });
    }

    /**
     * Finish track task
     * @param taskId 
     * @param projectId 
     * @param workspaceId 
     * @returns MemberProgressDto 
     * @throws ApiError
     */
    public static taskControllerEndTimeLine(
taskId: number,
projectId: number,
workspaceId: number,
): CancelablePromise<MemberProgressDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/workspace/{workspaceId}/project/{projectId}/task/{taskId}/endTimeLine',
            path: {
                'taskId': taskId,
                'projectId': projectId,
                'workspaceId': workspaceId,
            },
        });
    }

    /**
     * Complete task
     * @param taskId 
     * @param projectId 
     * @param workspaceId 
     * @returns MemberProgressDto 
     * @throws ApiError
     */
    public static taskControllerCompleteTask(
taskId: number,
projectId: number,
workspaceId: number,
): CancelablePromise<MemberProgressDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/workspace/{workspaceId}/project/{projectId}/task/{taskId}/completeTask',
            path: {
                'taskId': taskId,
                'projectId': projectId,
                'workspaceId': workspaceId,
            },
        });
    }

    /**
     * Uncomplete task
     * @param taskId 
     * @param projectId 
     * @param workspaceId 
     * @returns MemberProgressDto 
     * @throws ApiError
     */
    public static taskControllerUnCompleteTask(
taskId: number,
projectId: number,
workspaceId: number,
): CancelablePromise<MemberProgressDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/workspace/{workspaceId}/project/{projectId}/task/{taskId}/unCompleteTask',
            path: {
                'taskId': taskId,
                'projectId': projectId,
                'workspaceId': workspaceId,
            },
        });
    }

    /**
     * Get member progress
     * @param taskId 
     * @param projectId 
     * @param workspaceId 
     * @returns MemberProgressDto 
     * @throws ApiError
     */
    public static taskControllerGetMemberProgress(
taskId: number,
projectId: number,
workspaceId: number,
): CancelablePromise<MemberProgressDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/workspace/{workspaceId}/project/{projectId}/task/{taskId}/getMemberProgress',
            path: {
                'taskId': taskId,
                'projectId': projectId,
                'workspaceId': workspaceId,
            },
        });
    }

}
