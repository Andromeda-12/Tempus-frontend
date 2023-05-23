/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MemberProgressDto = {
    /**
     * Task in progress?
     */
    isRunning: boolean;
    /**
     * Task is complete?
     */
    isComplete: boolean;
    /**
     * How much time are tracked
     */
    trackedTime: number;
    /**
     * osas
     */
    lastTimeLineStartTime: string;
};
