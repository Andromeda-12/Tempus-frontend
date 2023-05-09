/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MemberDto } from './MemberDto';

export type MembersInfo = {
    /**
     * User info
     */
    member: MemberDto;
    /**
     * Task isComplete by user?
     */
    isComplete: boolean;
    /**
     * How much user track time
     */
    workTime: number;
};
