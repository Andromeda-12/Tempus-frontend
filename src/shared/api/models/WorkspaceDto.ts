/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserDto } from './UserDto';

export type WorkspaceDto = {
    /**
     * WorkSpace id
     */
    id: number;
    /**
     * WorkSpace description
     */
    title: string;
    /**
     * WorkSpace cover(url)
     */
    cover: string;
    /**
     * Workspace owner
     */
    owner: UserDto;
    /**
     * Workspace members
     */
    members: Array<string>;
};
