/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ReportRowDto } from './ReportRowDto';

export type ReportDto = {
    /**
     * Total tracked time
     */
    totalTime: number;
    /**
     * Report rows array
     */
    rows: Array<ReportRowDto>;
};
