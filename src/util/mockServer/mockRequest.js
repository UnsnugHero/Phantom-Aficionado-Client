import { withDelay } from '../helpers';
import { searchRequests, getRequests, makeRequest, commentRequest, likeRequest } from '../mockData/request.mocks';

const apiUrl = '/api/requests';
const resFn = (splitIdx) => (config) => {
  debugger;
  const id = config.url.split('/')[splitIdx];
  const request = getRequests[id];
  return [200, request];
};

export function mockRequestInstance(instance) {
  instance.onGet(new RegExp(`${apiUrl}/*`)).reply(resFn(3));

  instance.onPost(`${apiUrl}/search`).reply(withDelay(1000, [200, { results: searchRequests }]));
  instance.onPost(new RegExp(`${apiUrl}/create`)).reply(200, makeRequest);
  instance.onPost(new RegExp(`${apiUrl}/comment/*`)).reply(resFn(4));

  instance.onPut(new RegExp(`${apiUrl}/like/*`)).reply(resFn(4));
  instance.onPut(new RegExp(`${apiUrl}/unlike/*`)).reply(resFn(4));
}
