/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateTaskDto = {
    /**
     * Task title
     */
    title: string;
    /**
     * Task description (Optional)
     */
    description?: string;
    /**
     * Creator id
     */
    creatorId: number;
};
