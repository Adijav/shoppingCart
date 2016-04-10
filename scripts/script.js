(function(){
  var fruits = [
    {
      id: 1,
      name: 'Apple',
      price: 1.18,
      currency: '$',
      image: 'images/apple.jpeg'
    },
    {
      id: 2,
      name: 'Banana',
      price: 0.86,
      currency: '$',
      image: 'images/banana.jpg'
    },
    {
      id: 3,
      name: 'Grapes',
      price: 2.55,
      currency: '$',
      image: 'images/grapes.jpg'
    },
    {
      id: 4,
      name: 'Kiwi',
      price: 2.5,
      currency: '$',
      image: 'images/kiwi.jpeg'
    },
    {
      id: 5,
      name: 'Orange',
      price: 3.2,
      currency: '$',
      image: 'images/orange.jpg'
    },
    {
      id: 6,
      name: 'Peach',
      price: 2.8,
      currency: '$',
      image: 'images/peach.jpg'
    },
    {
      id: 7,
      name: 'Pineapple',
      price: 1.8,
      currency: '$',
      image: 'images/pineapple.jpg'
    },
    {
      id: 8,
      name: 'Strawberry',
      price: 1.6,
      currency: '$',
      image: 'images/strawberry.jpg'
    },
    {
      id: 9,
      name: 'Watermelon',
      price: 1.7,
      currency: '$',
      image: 'images/watermelon.jpg'
    }
  ]

  var Cart = React.createClass({
    getInitialState: function(){
      $.subscribe('cart.added', this.addFruit);
      $.subscribe('cart.removed', this.removeFruit);

      return {
        items: [],
        totalPrice: 0,
        currency: "$" 
      };
    },
    addFruit: function(e, item){
      this.state.items.push(item);
      this.totalAmount();
    },
    removeFruit: function(e, itemId){
      var itemIndex=0;
      this.state.items.some(function(item, index){
        if(item.id === itemId) {
          itemIndex = index;
          return true;
        }
      });
      if(typeof(itemId) != 'undefined'){
        this.setState(this.state.items.splice(itemIndex,1));
      }
    },
    totalAmount: function() {
      var total = 0;
      this.state.items.forEach(function(data){
        total += data.price;
      });
      this.setState({totalPrice: total});
    },
    render: function(){
      var items = this.state.items.map(function(data){
        return (
          <div className="row">
            <div className="col-lg-6">{data.name}</div>
            <div className="text-right col-lg-6">{data.currency}{data.price}</div>
          </div>
        );
      });
      var products = (<div>
                        {items}
                        <h3 className="totalPrice text-right">${this.state.totalPrice.toFixed(2)}</h3>
                      </div>);
      var empty = (<div className="text-center">Cart is Empty</div>);
      return (
        <div>{items.length > 0 ? products : empty}</div>
      );
    }
  });

  var FruitsList = React.createClass({
    render: function(){
      var products = this.props.data.map(function(product){
        return(
          <Product data={product}/>
        );
      });
      return (
        <div>
          {products}
        </div>
      );
    }
  });

  var Product = React.createClass({
    getInitialState:function(){
      return {added: false};
    },
    addToCart: function(){
      if(!this.state.added){
        $.publish('cart.added', this.props.data);
      }
      else {
        $.publish('cart.removed', this.props.data.id);
      }
      this.setState({
        added: !this.state.added
        });
      },
    render: function() {
      var data = this.props.data;

      return (
        <div className="col-md-4">
          <div className="imageContainer">
            <img src={data.image} className="img-responsive"/>
          </div>
          <div className="fruitDetails">
            <h4 className="text-center">
              <strong>{data.name}:</strong>
              <span>{data.currency}{data.price}</span>
            </h4>
            <div className="text-center">
              <button className={this.state.added ? 'btn btn-danger' : 'btn btn-primary'} onClick={this.addToCart}>
                {this.state.added ? 'Remove' : 'Add to cart'}
              </button>
            </div>
          </div>
        </div>
      );
    }
  });

  ReactDOM.render(<FruitsList data={fruits} />, document.getElementById('fruitsList'));
  ReactDOM.render(<Cart />, document.getElementById('addToCart'));

})();
