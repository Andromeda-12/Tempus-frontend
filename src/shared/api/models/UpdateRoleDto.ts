/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdateRoleDto = {
    /**
     * New member role
     */
    role: 'Manager' | 'Member';
    /**
     * Member id for change role
     */
    memberId: number;
};
