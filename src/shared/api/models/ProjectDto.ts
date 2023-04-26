/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MemberDto } from './MemberDto';

export type ProjectDto = {
    /**
     * Whether to hide the project from visible
     */
    id: number;
    /**
     * Title description
     */
    title: string;
    /**
     * Whether to hide the project from visible
     */
    isHidden: boolean;
    /**
     * Workspace id
     */
    workspaceId: number;
    /**
     * Members list of project
     */
    members: Array<MemberDto>;
};
