import config from '../config';
import { Line, Modes, Tfl23, Tfl39 } from '../types';
import { Fetch } from '../utilities/helpers';

const endpoints = {
  getvalidmodes: config.api.tfl('Line/Meta/Modes'),
  getservicetypes: config.api.tfl('Line/Meta/ServiceTypes'),
  getlinesbymode: config.api.tfl('Line/Mode'),
  getroutestops: config.api.tfl('Line/'),
  getstationtimetable: config.api.tfl('Line/'),

};

const LineServices = {

  GetValidModes(): Promise<Array<Modes>> {
    const requestOptions = {
      method: 'GET',
    };

    return Fetch(endpoints.getvalidmodes, requestOptions);
  },

  GetLinesByMode(data: { modes: string[], serviceTypes?:string }): Promise<Array<Line>> {
    const requestOptions = {
      method: 'GET',
    };
    return Fetch(`${endpoints.getlinesbymode}/${data.modes}/Route?serviceTypes=${data.serviceTypes}`, requestOptions);
  },

  GetServiceTypes(): Promise<Array<string>> {
    const requestOptions = {
      method: 'GET',
    };
    return Fetch(endpoints.getservicetypes, requestOptions);
  },
  GetRouteStops(data:{id:string, serviceType:string}) :Promise<Tfl23> {
    const requestOptions = {
      method: 'GET',
    };
    return Fetch(`${endpoints.getroutestops}/${data.id}/Route/Sequence/all?serviceTypes=${data.serviceType}`, requestOptions);
  },
  GetStationTimetable(data:{stopId:string, lineId:string}) :Promise<Tfl39> {
    const requestOptions = {
      method: 'GET',
    };
    return Fetch(`${endpoints.getstationtimetable}/${data.lineId}/Timetable/${data.stopId}`, requestOptions);
  },
};

export default LineServices;
