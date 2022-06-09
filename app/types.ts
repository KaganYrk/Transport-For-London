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
