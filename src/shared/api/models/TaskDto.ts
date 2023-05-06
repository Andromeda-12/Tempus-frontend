/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserDto } from './UserDto';

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
    description?: string;
    /**
     * Creator
     */
    creator: UserDto;
    /**
     * Members assigned to task
     */
    members: Array<string>;
};
