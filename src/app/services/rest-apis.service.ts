// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class RestApisService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const endpointAddress = 'http://demo.dfoundry.io:3000';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestService {
  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }


  createProtocol(createProtocolRequest): Observable<any> {
    var request = createProtocolRequest;
    return this.http
      .post(endpointAddress + '/protocol', request, httpOptions)
      .pipe(map(this.extractData), catchError(this.handleError<any>('createProtocol')));
  }

  getProtocols() {
    return this.http
      .get(endpointAddress + '/protocols', {})
      .pipe(map(this.extractData), catchError(this.handleError<any>('getProtocols')));
  }

  getUploadedFiles(protocolId) {
    return this.http
      .get(endpointAddress + '/raw-files?protocol=' + protocolId, {})
      .pipe(map(this.extractData), catchError(this.handleError<any>('getUploadedFiles')));
  }

  viewProtocol(protocolId) {
    return this.http
      .get(endpointAddress + '/protocol/' + protocolId, {})
      .pipe(map(this.extractData), catchError(this.handleError<any>('viewProtocol')));
  }

  getAllUploadedRawFiles(protocolId) {
    return this.http
      .get(endpointAddress + '/raw-files?protocol=' + protocolId, {})
      .pipe(map(this.extractData), catchError(this.handleError<any>('getAllUploadedRawFiles')));
  }


  getTablesOperationsList(protocolId) {
    return this.http
      .get(endpointAddress + '/tables?protocol=' + protocolId, {})
      .pipe(map(this.extractData), catchError(this.handleError<any>('getTablesOperationsList')));
  }

  viewSDTMData(protocolId, categoryType) {
    return this.http
      .get(endpointAddress + '/sdtm/' + protocolId + '?category=' + categoryType, {})
      .pipe(map(this.extractData), catchError(this.handleError<any>('viewSDTMData')));
  }

  viewSDTMQuery(protocolId, categoryType) {
    return this.http
      .get(endpointAddress + '/sdtm/query/' + protocolId + '?category=' + categoryType, {})
      .pipe(map(this.extractData), catchError(this.handleError<any>('viewSDTMQuery')));
  }

  applyEditedStatement(editSuggestionsObj) {
    var request = editSuggestionsObj
    return this.http
      .post(endpointAddress + '/editsuggestions', request, httpOptions)
      .pipe(map(this.extractData), catchError(this.handleError<any>('applyEditedStatement')));
  }

  convertToSDTM(protcolId, categoryObj, query) {
    return this.http
      .post(endpointAddress + '/protocol/' + protcolId, { category: categoryObj, query }, httpOptions)
      .pipe(map(this.extractData), catchError(this.handleError<any>('createProtocol')));
  }

  getConvertedSdtms() {
    return this.http
      .get(endpointAddress + '/protocols/grouped', {})
      .pipe(map(this.extractData), catchError(this.handleError<any>('getProtocols')));
  }

  auditLogs(protocolId) {
    return this.http
      .get(endpointAddress + '/audits/' + protocolId, {})
      .pipe(map(this.extractData), catchError(this.handleError<any>('auditLogs')));
  }

  errorLogs(protocolId) {
    return this.http
      .get(endpointAddress + '/unparsed/' + protocolId, {})
      .pipe(map(this.extractData), catchError(this.handleError<any>('errorLogs')));
  }

  // Error handler block
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
