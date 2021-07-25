import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { history } from 'utils/history';
import messages from './messages';
import { CATEGORY, IMAGE, YEAR, TITLE, DIRECTOR} from '../../common/consts';

export function AddMovieForm(props) {
  const {parentCallback, selectedMovie} = props;
  const [newMovie, setNewMovie] = useState(selectedMovie || {});
  
  const handleSubmit = () =>{
    parentCallback(newMovie);
    history.push('/');
  }

  const handleCancel = () => {
    history.push('/');
  }

  const onFieldChange = (event) => {
    const currentMovie = newMovie;
    setNewMovie({ 
      ...currentMovie,
      [event.target.id]: event.target.value
    });
  }

  return (

    <Form className="form">
      <Form.Group className="mb-3" >
        <Form.Label>  
          <FormattedMessage {...messages.name} />
        </Form.Label>        
        <Form.Control id="Title" type="text" placeholder={newMovie.Title || TITLE} onChange={onFieldChange} />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>
          <FormattedMessage {...messages.director} />
        </Form.Label>
        <Form.Control id="Director" type="text" placeholder={newMovie.Director || DIRECTOR} onChange={onFieldChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>
          <FormattedMessage {...messages.img} />
        </Form.Label>
        <Form.Control id="Poster" type="file" onChange={onFieldChange} placeholder={IMAGE}/>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>
          <FormattedMessage {...messages.year} />
        </Form.Label>
        <Form.Control 
          id="Year" 
          type="text" 
          placeholder={newMovie.Year || YEAR}
          onChange={onFieldChange}
        />
      </Form.Group>
    
      <Form.Group className="mb-3" >
        <Form.Label>
          <FormattedMessage {...messages.category} />
        </Form.Label>
        <Form.Control id="Genre" type="text" placeholder={newMovie.Genre || CATEGORY} onChange={onFieldChange}/>
      </Form.Group> 

      <Button variant="primary" type="submit" onClick={handleSubmit}>
        <FormattedMessage {...messages.submit} />
      </Button>
      <Button variant="primary" type="button" onClick={handleCancel}>
        <FormattedMessage {...messages.cancel} />
      </Button>
    </Form>
  )
}
AddMovieForm.propTypes = {
  parentCallback: PropTypes.func,
  selectedMovie: PropTypes.object
};
  

export default (AddMovieForm);
