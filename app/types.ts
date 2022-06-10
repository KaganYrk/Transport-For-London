export interface Line {
    id: string,
    name: string,
    modeName: string,
    disruptions: Disruption,
    created: Date,
    modified: Date,
    lineStatuses: LineStatus,
    routeSections: MatchedRoute,
    serviceTypes: LineServiceTypeInfo,
    crowding: Crowding,
}

export interface Disruption {
    category: string,
    type: string,
    categoryDescription: string,
    description: string,
    summary: string,
    additionalInfo: string,
    created: Date,
    lastUpdate: Date,
    affectedRoutes: RouteSection,
    affectedStops: StopPoint,
    closureText: string,
}

export interface LineStatus {
    id: number,
    lineId: string,
    statusSeverity: number,
    statusSeverityDescription: string,
    reason: string,
    created: Date,
    modified: Date,
    validityPeriods: ValidityPeriod,
    disruption: Disruption,
}

export interface Place {
    id: string,
    url: string,
    commonName: string,
    distance: number,
    placeType: string,
    additionalProperties: AdditionalProperties,
    children: Place,
    childrenUrls: string[],
    lat: number,
    lon: number,
}

export interface Crowding {
    passengerFlows: PassengerFlow
    trainLoadings: TrainLoading
}

export interface Identifier {
    id: string,
    name: string,
    uri: string,
    fullName: string,
    type: string,
    crowding: Crowding,
    routeType: string,
    status: string,
}

export interface StopPoint {
    naptanId: string,
    platformName: string,
    indicator: string,
    stopLetter: string,
    modes: string[],
    icsCode: string,
    smsCode: string,
    stopType: string,
    stationNaptan: string,
    accessibilitySummary: string,
    hubNaptanCode: string,
    lines: Identifier,
    lineGroup: LineGroup,
    lineModeGroups: LineModeGroup,
    fullName: string,
    naptanMode: string,
    status: boolean,
    id: string,
    url: string,
    commonName: string,
    distance: number,
    placeType: string,
    additionalProperties: AdditionalProperties,
    children: Place,
    childrenUrls: string[],
    lat: number,
    lon: number,
}

export interface RouteSectionNaptanEntrySequence {
    ordinal: number,
    stopPoint: StopPoint
}

export interface RouteSection {
    id: string,
    lineId: string,
    routeCode: string,
    name: string,
    lineString: string,
    direction: string,
    originationName: string,
    destinationName: string,
    validTo: Date,
    validFrom: Date,
    routeSectionNaptanEntrySequence: RouteSectionNaptanEntrySequence,
}

export interface AdditionalProperties {
    category: string,
    key: string,
    sorucerSystemKey: string,
    value: string,
    modified: Date
}

export interface Modes {
    isTflService: boolean,
    isFarePaying: boolean,
    isScheduledService: boolean,
    modeName: string,
}

export interface MatchedRoute {
    routeCode: string,
    name: string,
    direction: string,
    originationName: string,
    destinationName: string,
    orginator: string,
    destination: string,
    serviceType: string,
    validTo: Date,
    validForm: Date
}

export interface LineServiceTypeInfo {
    name: string,
    uri: string
}

export interface ValidityPeriod {
    formDate: Date,
    toDate: Date,
    isNow: boolean
}

export interface PassengerFlow {
    timeSlice: string,
    value: number
}

export interface TrainLoading {
    line: string,
    lineDirection: string,
    platformDirection: string,
    direction: string,
    naptanTo: string,
    timeSlice: string,
    value: string
}

export interface LineGroup {
    naptanIdReference: string,
    stationAtcoCode: string,
    LineIdentifier: string
}

export interface LineModeGroup {
    modelName: string,
    lineIdentifier: string[]
}

export interface Tfl23 {
    lineId?: string;
    lineName?: string;
    direction?: string;
    isOutboundOnly?: boolean;
    mode?: string;
    lineStrings?: string[];
    stations?: any;// unnecessary data
    stopPointSequences?: Tfl21[];
    orderedLineRoutes?: any; // unnecessary data
}

export interface Tfl21 {
    lineId?: string;
    lineName?: string;
    direction?: string;
    branchId?: number;
    nextBranchIds?: number[];
    prevBranchIds?: number[];
    stopPoint?: Tfl20[]
    serviceType?: string;
}

export interface Tfl20 {
    routeId?: number;
    parentId?: string;
    stationId?: string;
    icsId?: string;
    topMostParentId?: string;
    direction?: string;
    towards?: string;
    modes?: string[];
    stopType?: string;
    stopLetter?: string;
    zone?: string;
    accessibilitySummary?: string;
    hasDisruption?: boolean;
    lines?: any; // unnecessary data
    status?: boolean;
    id?: string;
    url?: string;
    name?: string;
    lat?: number;
    lon?: number;
}

export interface Tfl39 {
    lineId?: string;
    lineName?: string;
    direction?: string;
    pdfUrl?: string;
    stations?: Tfl20[];
    stops?: Tfl20[];
    timetable?: Tfl36;
    disambiguation?: any; // unnecessary data
    statusErrorMessage?: string;
}

export interface Tfl36 {
    departureStopId: string
    routes: Tfl35[]

}

export interface Tfl35 {
    stationIntervals: any, // unnecessary data
    schedules: Tfl34[]
}

export interface Tfl34 {
    name: string
    knownJourneys: Tfl30[]
    firstJourney: Tfl30
    lastJourney: Tfl30
    periods: any // unnecessary data
}

export interface Tfl30 {
    hour: string
    minute: string,
    intervalId: number

}
