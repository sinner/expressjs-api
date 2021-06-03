import pressCorp from 'press-corp';
import l from '../../util/logger';
// import config from '../../properties/config';

const clientErrorLogger = l.getNamedLogger('client');

export default pressCorp.log({
  logger: clientErrorLogger,
});
