/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AssignedTaskDto } from '../models/AssignedTaskDto';
import type { BadRequestAssignedTaskDto } from '../models/BadRequestAssignedTaskDto';
import type { CreateTaskDto } from '../models/CreateTaskDto';
import type { ReportDto } from '../models/ReportDto';
import type { TaskDto } from '../models/TaskDto';
import type { UpdateTaskDto } from '../models/UpdateTaskDto';
import type { ValidationUserId } from '../models/ValidationUserId';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TasksService {

    /**
     * Get all assigned tasks by user
     * @param userId User id
     * @param title Task title
     * @returns BadRequestAssignedTaskDto 
     * @throws ApiError
     */
    public static taskControllerGetAssignedTasks(
userId?: number,
title?: string,
): CancelablePromise<Array<BadRequestAssignedTaskDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tasks/getAssignedTasks',
            query: {
                'userId': userId,
                'title': title,
            },
        });
    }

    /**
     * Get report about work for user
     * @returns ReportDto 
     * @throws ApiError
     */
    public static taskControllerGetReport(): CancelablePromise<Array<ReportDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tasks/getReport',
        });
    }

    /**
     * Get all created tasks by user
     * @param userId User id
     * @param title Task title
     * @returns TaskDto 
     * @throws ApiError
     */
    public static taskControllerGetByCreatorId(
userId?: number,
title?: string,
): CancelablePromise<Array<TaskDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tasks/getUserTasks',
            query: {
                'userId': userId,
                'title': title,
            },
        });
    }

    /**
     * Get all tasks and them workers
     * @returns TaskDto 
     * @throws ApiError
     */
    public static taskControllerGetAll(): CancelablePromise<Array<TaskDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tasks',
        });
    }

    /**
     * Create task
     * @param requestBody 
     * @returns TaskDto 
     * @throws ApiError
     */
    public static taskControllerCreate(
requestBody: CreateTaskDto,
): CancelablePromise<TaskDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tasks',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Get first task
     * @param id 
     * @returns TaskDto 
     * @throws ApiError
     */
    public static taskControllerGetFirst(
id: number,
): CancelablePromise<Array<TaskDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tasks/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * Delete task
     * @param id 
     * @returns TaskDto 
     * @throws ApiError
     */
    public static taskControllerRemove(
id: number,
): CancelablePromise<TaskDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/tasks/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * Update task
     * @param id 
     * @param requestBody 
     * @returns TaskDto 
     * @throws ApiError
     */
    public static taskControllerUpdate(
id: number,
requestBody: UpdateTaskDto,
): CancelablePromise<TaskDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/tasks/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Create task for one user
     * @param requestBody 
     * @returns BadRequestAssignedTaskDto 
     * @throws ApiError
     */
    public static taskControllerCreateForCreator(
requestBody: CreateTaskDto,
): CancelablePromise<BadRequestAssignedTaskDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tasks/createUserTask',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Assign worker to task
     * @param id 
     * @param requestBody 
     * @returns AssignedTaskDto 
     * @throws ApiError
     */
    public static taskControllerAssignUser(
id: number,
requestBody: ValidationUserId,
): CancelablePromise<AssignedTaskDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tasks/{id}/assignWorker',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Unassign user from task
     * @param id 
     * @param requestBody 
     * @returns AssignedTaskDto 
     * @throws ApiError
     */
    public static taskControllerRemoveUser(
id: number,
requestBody: ValidationUserId,
): CancelablePromise<AssignedTaskDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tasks/{id}/unassignWorker',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Start track task
     * @param id 
     * @param requestBody 
     * @returns AssignedTaskDto 
     * @throws ApiError
     */
    public static taskControllerStarTimeLine(
id: number,
requestBody: ValidationUserId,
): CancelablePromise<AssignedTaskDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tasks/{id}/startTimeLine',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Finish track task
     * @param id 
     * @returns AssignedTaskDto 
     * @throws ApiError
     */
    public static taskControllerEndTimeLine(
id: number,
): CancelablePromise<AssignedTaskDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tasks/{id}/endTimeLine',
            path: {
                'id': id,
            },
        });
    }

    /**
     * Complete task
     * @param id 
     * @returns AssignedTaskDto 
     * @throws ApiError
     */
    public static taskControllerCompleteTask(
id: number,
): CancelablePromise<AssignedTaskDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tasks/{id}/completeTask',
            path: {
                'id': id,
            },
        });
    }

}
