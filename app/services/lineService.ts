import config from '../config';
import { Line, Modes } from '../types';
import { Fetch } from '../utilities/helpers';

const endpoints = {
  getvalidmodes: config.api.tfl('Line/Meta/Modes'),
  getservicetypes: config.api.tfl('Line/Meta/ServiceTypes'),
  getlinesbymode: config.api.tfl('Line/Mode'),
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

};

export default LineServices;
