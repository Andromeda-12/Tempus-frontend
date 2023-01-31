/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdateProjectDto = {
    /**
     * Title description
     */
    title?: string;
    /**
     * Project description
     */
    description?: string;
    /**
     * Whether to hide the project from visible
     */
    isHidden: boolean;
};
