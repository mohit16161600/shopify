// const fetch = require('node-fetch'); // Native fetch in Node 18+

async function testLogin() {
    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'xesecybi@mailinator.com',
                password: 'Pa$$w0rd!'
            })
        });
        const data = await response.json();
        console.log('Status:', response.status);
        console.log('Body:', data);
    } catch (e) {
        console.error(e);
    }
}

testLogin();
