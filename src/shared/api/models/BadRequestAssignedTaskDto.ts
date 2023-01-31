/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BadRequestAssignedTaskDto = {
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
    workTime: number;
    /**
     * Task completed?
     */
    isComplete: boolean;
};
