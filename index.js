const express = require('express');  
const bodyParser = require('body-parser');  
const axios = require('axios');  
const swaggerUi = require('swagger-ui-express');  
const swaggerDocument = require('./swagger.json'); // Swagger config file  

const app = express();  
const PORT = 3000; // Port for the BFF layer  

// Middleware  
app.use(bodyParser.json());  

// Swagger UI  
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));  

// Base URL for the Spring Boot service  
const BASE_URL = 'http://localhost:8089/api/v1';  

// Proxy endpoints for User Service  
app.post('/bff/user/save', async (req, res) => {  
    try {  
        const response = await axios.post(`${BASE_URL}/user/save-user`, req.body);  
        res.status(response.status).json(response.data);  
    } catch (error) {  
        res.status(error.response?.status || 500).json(error.response?.data || { message: 'Error occurred' });  
    }  
});  

app.get('/bff/user/get-all', async (req, res) => {  
    try {  
        const response = await axios.get(`${BASE_URL}/user/get-all-users`);  
        res.status(response.status).json(response.data);  
    } catch (error) {  
        res.status(error.response?.status || 500).json(error.response?.data || { message: 'Error occurred' });  
    }  
});  

app.put('/bff/user/update-password/:userId', async (req, res) => {  
    try {  
        const response = await axios.put(`${BASE_URL}/user/update-password/${req.params.userId}`, req.body);  
        res.status(response.status).json(response.data);  
    } catch (error) {  
        res.status(error.response?.status || 500).json(error.response?.data || { message: 'Error occurred' });  
    }  
});  

app.delete('/bff/user/deactivate/:userId', async (req, res) => {  
    try {  
        const response = await axios.delete(`${BASE_URL}/user/deactivate-user/${req.params.userId}`);  
        res.status(response.status).json(response.data);  
    } catch (error) {  
        res.status(error.response?.status || 500).json(error.response?.data || { message: 'Error occurred' });  
    }  
});

// Endpoint to save a new role
app.post('/bff/role/save', async (req, res) => {
    try {
        const response = await axios.post(`${BASE_URL}/role/save-role`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { message: 'Error occurred' });
    }
});

// Endpoint to get all roles
app.get('/bff/role/get-all', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/role/get-all-roles`);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { message: 'Error occurred' });
    }
});

// Endpoint to save a new permission
app.post('/bff/permission/save', async (req, res) => {
    try {
        const response = await axios.post(`${BASE_URL}/permission/save`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { message: 'Error occurred' });
    }
});

// Start the server  
app.listen(PORT, () => {  
    console.log(`BFF layer running on http://localhost:${PORT}`);  
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);  
});