/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CountDto } from './CountDto';
import type { MemberDto } from './MemberDto';
import type { UserDto } from './UserDto';

export type WorkspaceDto = {
    /**
     * Workspace id
     */
    id: number;
    /**
     * Workspace title
     */
    title: string;
    /**
     * Workspace cover(url)
     */
    cover: string;
    /**
     * Workspace owner
     */
    owner: UserDto;
    /**
     * Workspace members
     */
    members: Array<MemberDto>;
    /**
     * Count of members and projects
     */
    count: CountDto;
};
