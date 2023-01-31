/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TimeLineDto } from './TimeLineDto';

export type AssignedTaskDto = {
    /**
     * Assigned task id
     */
    id: number;
    /**
     * Task id
     */
    taskId: number;
    /**
     * Worker id
     */
    workerId: number;
    /**
     * Task started?
     */
    isActive: boolean;
    /**
     * Task completed?
     */
    isComplete: boolean;
    /**
     * Task work time
     */
    workTime: number;
    /**
     * Time lines
     */
    TimeLines: Array<TimeLineDto>;
};
