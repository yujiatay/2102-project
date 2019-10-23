
import * as accounts from './accounts';
import * as analytics from './analytics';
import * as articles from './articles';
import * as bookings from './bookings';
import * as restaurants from './restaurants';
import * as reviews from './reviews';

import db from './db';

export default {
  instance: db,
  accounts,
  analytics,
  articles,
  bookings,
  restaurants,
  reviews
};
