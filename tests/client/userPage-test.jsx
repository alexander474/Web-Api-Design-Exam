const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');

const {UserPage} = require('../../src/client/user/userPage');
const {overrideFetch, asyncCheckCondition} = require('../mytest-utils');
const {app} = require('../../src/server/app');

const {resetAllUsers} = require('../../src/server/db/users');

beforeEach(() => {
    resetAllUsers();
});

async function signup(email, password) {

    const response = await fetch('/api/signup', {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: userId, password: password})
        }
    );

    return response.status === 201;
}