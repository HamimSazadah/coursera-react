import React, { Component } from 'react';
import {
    Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle
} from 'reactstrap';
class DishdetailComponent extends Component {
    render() {
        return (
            <div>

            </div>
        );
    }
}

class DishDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dish: null
        }

    }
    month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    componentDidUpdate(prev) {
        if (this.props != prev)
            this.setState({
                dish: this.props
            })
    }
    renderComments() {
        return (<ul style={{ listStyleType: 'none' }}>
            {this.state.dish.dish.comments.map(n => {
                return (<><li key={n.id}>{n.comment}</li>
                    <li key={n.id + 'x'}>-- {`${n.author} ,${new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(n.date)))}`}</li></>)
            }
            )
            }
        </ul >)
    }

    renderDish(dish) {
        if (dish != null && dish.dish != null) {
            let dish2 = dish.dish
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
                        {this.renderComments(this.state.dish)}
                    </div>
                </div>
            );
        } else
            return (
                <div></div>
            );
    }

    render() {
        return (
            <div className="col-md-12 col-sm-6 m-1">
                {this.renderDish(this.state.dish)}
            </div>
        );
    }
}


export { DishdetailComponent, DishDetail };