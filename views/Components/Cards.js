import React from 'react';
import Card from "./Card";
import SearchCard from './SearchCard';

const Cards = (props) => {
    let cards = props.stocks.map((c, i) => {
       return <Card key={i} sym={c.sym} color={c.color} remove={props.remove} />;
    });
    cards.push(<SearchCard key={cards.length + 1} color={'#000'} add={props.add} message={props.message}/>);
  	return (
  	    <div className="container">
  	        <div className="cards">
  	            {cards}
  	        </div>
  	    </div>
    );
  };
export default Cards;