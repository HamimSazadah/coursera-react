import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem
} from 'reactstrap';
import { Link } from 'react-router-dom';


function RenderComments(dish) {
    if ('comments' in dish) {
        return (<ul style={{ listStyleType: 'none' }}>
            {dish.comments.map(n => {
                return (<><li key={n.id}>{n.comment}</li>
                    <li key={n.id + 'x'}>-- {`${n.author} ,${new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(n.date)))}`}</li></>)
            })
            }
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