import { ReportHandler } from 'web-vitals';

type reportWebVitalsType = (onPerfEntry?: ReportHandler | undefined)=> void

interface getFunctions {
    getCLS: (onReport: ReportHandler, reportAllChanges?: boolean | undefined)=> void,
    getFID: (onReport: ReportHandler, reportAllChanges?: boolean | undefined)=> void,
    getFCP: (onReport: ReportHandler, reportAllChanges?: boolean | undefined)=> void,
    getLCP: (onReport: ReportHandler, reportAllChanges?: boolean | undefined)=> void,
    getTTFB: (onReport: ReportHandler)=> void
}

const reportWebVitals: reportWebVitalsType = (onPerfEntry?: ReportHandler) => {
    if (onPerfEntry && onPerfEntry instanceof Function) {
        import('web-vitals').then(({
            getCLS, getFID, getFCP, getLCP, getTTFB,
        }: getFunctions): void => {
            getCLS(onPerfEntry);
            getFID(onPerfEntry);
            getFCP(onPerfEntry);
            getLCP(onPerfEntry);
            getTTFB(onPerfEntry);
        });
    }
};

export default reportWebVitals;
