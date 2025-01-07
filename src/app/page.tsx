"use client"

import React, { useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50',
    },
  },
});

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
}

const Menu = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [products] = useState<Product[]>([
    { id: 1, name: 'Latte', price: 4.5, image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg' },
    { id: 2, name: 'Cappuccino', price: 4.0, image: 'https://images.pexels.com/photos/2878019/pexels-photo-2878019.jpeg' },
    { id: 3, name: 'Espresso', price: 3.0, image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg' },
    { id: 4, name: 'Croissant', price: 3.5, image: 'https://images.pexels.com/photos/1070880/pexels-photo-1070880.jpeg' },
  ]);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index: number) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price, 0);
  };

  const submitOrder = () => {
    // TODO: オーダー送信処理
    console.log('Submitting order:', cart);
    setCart([]);
  };

  const CartView = () => (
    <div className="bg-white min-h-screen px-6 py-8">
      <h2 className="text-2xl font-bold mb-4">Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <Grid container spacing={4}>
            {cart.map((product, index) => (
              <Grid size={{xs: 12}} key={index}>
                <Card className="flex justify-between items-center">
                  <Box display="flex" alignItems="center">
                    <CardMedia
                      component="img"
                      height="80"
                      image={product.image}
                      alt={product.name}
                      className="mr-4"
                      sx={{ width: 80 }}
                    />
                    <div>
                      <Typography variant="h6">{product.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        ${product.price.toFixed(2)}
                      </Typography>
                    </div>
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => removeFromCart(index)}
                  >
                    Remove
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box mt={4} display="flex" justifyContent="flex-end">
            <Typography variant="h6" fontWeight="bold">
              Total: ${calculateTotal().toFixed(2)}
            </Typography>
          </Box>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={submitOrder}
            >
              Submit Order
            </Button>
          </Box>
        </div>
      )}
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <div className="bg-white min-h-screen">
        <header className="bg-primary py-4 px-6 text-white">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Cloud Village</h1>
            <button onClick={() => setShowCart(!showCart)} className="flex items-center">
              <ShoppingCartIcon />
              <span>Cart ({cart.length})</span>
            </button>
          </div>
        </header>

        {showCart ? (
          <CartView />
        ) : (
          <main className="px-6 py-8">
            <h2 className="text-2xl font-bold mb-4">Menu</h2>
            <Grid container spacing={4}>
              {products.map((product) => (
                <Grid size={{xs: 12, sm:6, md:4}} key={product.id}>
                  <Card className="h-full">
                    <CardMedia
                      component="img"
                      height="140"
                      image={product.image}
                      alt={product.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ${product.price.toFixed(2)}
                      </Typography>
                      <Box mt={2}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => addToCart(product)}
                        >
                          Add to Cart
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </main>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Menu;
