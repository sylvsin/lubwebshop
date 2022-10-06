import React, {
  useEffect,
  useReducer,
} from 'react';

import axios from 'axios';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { formatCurrency } from '../util';
import { getError } from '../utils';

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const ProductScreen: React.FC = () => {
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err: any) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, [slug]);

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <Row>
      <Col md={6}>
        <img className="img-large" src={product.image} alt={product.name}></img>
      </Col>
      <Col md={3}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Helmet>
              <title>{product.name}</title>
            </Helmet>
            <h1>{product.name}</h1>
          </ListGroup.Item>
        </ListGroup>
        <ListGroup.Item>
          <Rating
            rating={product.rating}
            numReviews={product.numReviews}></Rating>
        </ListGroup.Item>
        <ListGroup.Item>Price: {formatCurrency(product.price)}</ListGroup.Item>
        <ListGroup.Item>
          Description: <p>{product.description}</p>
        </ListGroup.Item>
      </Col>
      <Col md={3}>
        <Card>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Col>Price: </Col>
                <Col>{formatCurrency(product.price)}</Col>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Col>Status: </Col>
                <Col>
                  {product.countInStock > 0 ? (
                    <Badge bg="success">In Stock</Badge>
                  ) : (
                    <Badge bg="danger">Unavailable</Badge>
                  )}
                </Col>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button variant="primary">Add To Cart</Button>
                  </div>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ProductScreen;
