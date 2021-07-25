import { defineMessages } from 'react-intl';

export const scope = 'app.components.AddMovieForm';

export default defineMessages({
  create: {
    id: `${scope}.create`,
    defaultMessage: 'create new movie',
  },
  loading: {
    id: `${scope}.loading`,
    defaultMessage: 'loading...',
  },
  error: {
    id: `${scope}.error`,
    defaultMessage: 'error occured',
  }
});