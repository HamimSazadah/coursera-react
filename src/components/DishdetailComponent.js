import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Col, Row, Label, FormGroup
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';


function RenderComments(dish) {
    if ('comments' in dish) {
        return (<ul style={{ listStyleType: 'none' }}>
            {dish.comments.map(n => {
                return (<><li key={n.id}>{n.comment}</li>
                    <li key={n.id + 'x'}>-- {`${n.author} ,${new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(n.date)))}`}</li></>)
            })
            }
            <CommentForm />
        </ul >)
    }

}

function RenderDish(dish) {
    let dish2 = dish.dish;
    return (
        <div className='row'>
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg top src={dish2.image} alt={dish2.name} />
                    <CardBody>
                        <CardTitle>{dish2.name}</CardTitle>
                        <CardText>{dish2.description}</CardText>
                    </CardBody>
                </Card>
            </div>
            <div className="col-12 col-md-5 m-1">
                {RenderComments(dish2)}
            </div>
        </div>
    );
}

function CommentForm() {
    const [modal, setModal] = React.useState(false);
    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);
    const isNumber = (val) => !isNaN(Number(val));
    const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
    function toggle() {
        setModal(!modal)
    }

    function handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
    }
    return (
        <>
            <Button onClick={toggle} color="secondary">Submit Comment</Button>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => handleSubmit(values)}>
                        <FormGroup>
                            <Label htmlFor="rating">Rating</Label>
                            <Control.select model=".rating" id="rating" name="rating"
                                className="form-control">
                                {[1, 2, 3, 4, 5].map(n => <option>{n}</option>)}
                            </Control.select>

                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="name">Your Name</Label>
                            <Control.text model=".name" id="name" name="name"
                                placeholder="Your Name"
                                className="form-control"
                                validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }}
                            />
                            <Errors
                                className="text-danger"
                                model=".name"
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
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        </div>
    );
}


export default DishDetail;