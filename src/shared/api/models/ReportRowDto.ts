/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TaskModel } from './TaskModel';
import type { TimeLineDto } from './TimeLineDto';
import type { UserDto } from './UserDto';

export type ReportRowDto = {
    /**
     * Member info
     */
    member: UserDto;
    /**
     * Project title
     */
    projectTitle: string;
    /**
     * Task info
     */
    task: TaskModel;
    /**
     * Total tracked time
     */
    timeLine: TimeLineDto;
    /**
     * Total tracked time
     */
    trackedTime: number;
    /**
     * Total tracked time
     */
    day: string;
};
