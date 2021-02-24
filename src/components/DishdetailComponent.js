import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Col, Row, Label, FormGroup
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


function RenderComments({ comments, postComment, dishId }) {
    if (typeof comments != 'undefined') {
        // console.log(comments, addComment, dishId);
        return (<ul style={{ listStyleType: 'none' }}>
            <Stagger in>
                {comments.map((comment) => {
                    return (
                        <Fade in>
                            <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
                            </li>
                        </Fade>
                    );
                })}
            </Stagger>
            <CommentForm dishId={dishId} postComment={postComment} />
        </ul >)
    } else {
        return (<></>)
    }

}

function RenderDish(props) {
    let dish2 = props.dish;
    console.log(props)
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null)
        return (
            <>
                <FadeTransform
                    in
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                    <Card>
                        <CardImg top src={baseUrl + dish2.image} alt={dish2.name} />
                        <CardBody>
                            <CardTitle>{dish2.name}</CardTitle>
                            <CardText>{dish2.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
                <RenderComments comments={props.comments}
                    addComment={props.addComment}
                    dishId={props.dish.id}
                />
            </>
        );
}

class CommentForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);

    }


    toggle(x) {
        this.setState({ ...this.state, modal: !x })
    }

    handleSubmit(values) {
        // this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
        // console.log('Current State is: ' + JSON.stringify(values));
        // alert('Current State is: ' + JSON.stringify(values));
    }
    render() {
        return (
            <>
                <Button onClick={() => this.toggle(this.state.modal)} color="secondary">Submit Comment</Button>
                <Modal isOpen={this.state.modal} toggle={() => this.toggle(this.state.modal)} >
                    <ModalHeader toggle={() => this.toggle(this.state.modal)}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <FormGroup>
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" id="rating" name="rating"
                                    className="form-control">
                                    {[1, 2, 3, 4, 5].map(n => <option>{n}</option>)}
                                </Control.select>

                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author" id="author" name="author"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required ',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="comment" >Comment</Label>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                    placeholder=""
                                    className="form-control"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Button type="submit" color="primary">
                                    Submit
                            </Button>
                            </FormGroup>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        )
    }
}

const DishDetail = (props) => {
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>

                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments}
                        postComment={props.postComment}
                        dishId={props.dish.id}
                    />
                </div>
            </div>
        </div>
    );
}


export default DishDetail;