/// ////////////////////////////////////////////////////////////////////////////////
// Technically, we should do this in any API call to enhance promise with response :
// let result = axios.get(url).then(response => result.response = response)
//
// but, Promise prototype is not writable
// So let's polyfill it, whith a Promise-like object

const ApiData = function (promise) {
  const self = this;

  this.response = null;
  this.error = null;
  this.promise_ = promise;
  this.data = null;
  this.loading = true;

  promise.then(
    async (response) => {
      self.data = await response.json();
      self.loading = false;
      self.response = response;
    },
    (error) => {
      self.loading = false;
      self.error = error;
    }
  );
};

ApiData.prototype.then = function (successCallback, errorCallback) {
  this.promise_.then(successCallback, errorCallback);
  return this;
};

ApiData.prototype.catch = function (callback) {
  this.promise_.catch(callback);
  return this;
};

const BaseApi = function (apiUrl) {
  this.baseUrl = apiUrl;
  this.headers = new Map();
};

BaseApi.prototype.setDefaultHeaders = function (name, value) {
  if (value) {
    this.headers.set(name, value);
  } else {
    this.headers.delete(name);
  }
};

// eslint-disable-next-line eqeqeq
const removeEmpty = (params) => Object.entries(params).reduce((a, [k, v]) => (v == null ? a : ((a[k] = v), a)), {});

/**
 * Generic request helpers
 */
BaseApi.prototype.get = function (url, params) {
  const input = new URL(url, this.baseUrl);
  if (params) {
    input.search = new URLSearchParams(removeEmpty(params)).toString();
  }
  return new ApiData(fetch(input, { headers: this.headers }));
};

BaseApi.prototype.post = function (url, body) {
  return new ApiData(fetch(new URL(url, this.baseUrl), { method: 'POST', body, headers: this.headers }));
};

BaseApi.prototype.put = function (url, body) {
  return new ApiData(fetch(new URL(url, this.baseUrl), { method: 'PUT', body, headers: this.headers }));
};

BaseApi.prototype.delete = function (url, body) {
  return new ApiData(fetch(new URL(url, this.baseUrl), { method: 'DELETE', body, headers: this.headers }));
};

export default BaseApi;
