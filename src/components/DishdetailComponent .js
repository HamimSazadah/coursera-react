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

    componentDidUpdate(x) {
        if (this.state.dish != x)
            this.setState({
                dish: x
            })
    }
    renderDish(dish) {
        if (dish != null){
            dish = dish.dish
            console.log(dish)
            return (
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
            }else
            return (
                <div></div>
            );
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                   {this.renderDish(this.state.dish)}
                </div>
            </div>
        );
    }
}


export { DishdetailComponent, DishDetail };