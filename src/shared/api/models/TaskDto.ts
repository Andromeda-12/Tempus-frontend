/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AssignedTaskDto } from './AssignedTaskDto';

export type TaskDto = {
    /**
     * Unique identificator
     */
    id: number;
    /**
     * Task title
     */
    title: string;
    /**
     * Task description
     */
    description: string;
    /**
     * Creator id
     */
    creatorId: number;
    /**
     * Array workers are assigned to task
     */
    workers: Array<AssignedTaskDto>;
};
