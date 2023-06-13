/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateReportDto } from '../models/CreateReportDto';
import type { ReportDto } from '../models/ReportDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ReportService {

    /**
     * Get projects by filter
     * @param requestBody 
     * @returns ReportDto 
     * @throws ApiError
     */
    public static reportControllerGenerateReport(
requestBody: CreateReportDto,
): CancelablePromise<ReportDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/report',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
