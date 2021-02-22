import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle
} from 'reactstrap';


function renderComments(dish) {
    return (<ul style={{ listStyleType: 'none' }}>
        {dish.comments.map(n => {
            return (<><li key={n.id}>{n.comment}</li>
                <li key={n.id + 'x'}>-- {`${n.author} ,${new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(n.date)))}`}</li></>)
        }
        )
        }
    </ul >)
}

function renderDish(dish) {
    if (dish != null) {
        return (
            <div className='row'>
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg top src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12 col-md-5 m-1">
                    {renderComments(dish)}
                </div>
            </div>
        );
    } else
        return (
            <div></div>
        );
}

const DishDetail = (props) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 col-sm-6 m-1">
                    {renderDish(props.dish)}
                </div>
            </div>
        </div>
    );
}


export default DishDetail;