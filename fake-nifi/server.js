const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

// Define the static directory for serving the index.html file
app.use(express.static(path.join(__dirname)));

app.get('/route', function (req, res) {
    console.log('helloooo')
    setTimeout(() => {
        res.send('Hello World')
    }, 150000)
  })

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});