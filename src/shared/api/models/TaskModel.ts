/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserDto } from './UserDto';

export type TaskModel = {
    /**
     * Unique identificator
     */
    id: number;
    /**
     * Task title
     */
    title: string;
    /**
     * Task is complete?
     */
    isComplete: boolean;
    /**
     * Task description
     */
    description?: string;
    /**
     * Creator
     */
    creator: UserDto;
};
