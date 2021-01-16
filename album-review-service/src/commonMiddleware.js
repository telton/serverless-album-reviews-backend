import middy from '@middy/core';
import cors from '@middy/http-cors';

export default (handler) => middy(handler).use([cors()]);
