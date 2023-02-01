/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdateWorkspaceDto = {
    /**
     * Workspace title
     */
    title?: string;
    /**
     * Image cover
     */
    coverFile?: Blob;
    /**
     * Workspace owner id
     */
    ownerId?: number;
};
