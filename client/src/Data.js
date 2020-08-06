import config from './config';

export default class Data {
    /**
     * api helper method is used to make the GET and POST requests to the REST API
     * It accepts an API endpoint as its first argument (path), followed by the HTTP method, and body
     * which will contain any data associated with the request.  
     * @param {string} path 
     * @param {string} method 
     * @param {object} body 
     * @param {boolean} requiresAuth 
     * @param {object} credentials 
     * @returns {function} fetch api to make a promise based request 
     */

    api(path, method='GET', body = null, requiresAuth = false, credentials = null) {
        const url = config.apiBaseUrl + path;

        //send a request with the HTTP method and the request headers and a stringified body(if body is provided)  
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-origin': '*',
            },
        };

        //stringified the body if the body is provided
        if(body !== null) {
            options.body = JSON.stringify(body);
        }

        //check if the auth is required
        if(requiresAuth){
            //btoa() method creates a base-64 encoded ASCII string from a ‘string’ of data.
            const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
            //send an authorization header on each required auth request 
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }
        return fetch(url, options)
    }

    /** 
     * 'getCourses' method perform a syn operation that get list of courses 
     * If the HTTP response is 200, the response data is returned.
     * If the HTTP response is 404, the response is logged to the console and null is returned 
    */
    async getCourses(){
        const response = await this.api('/courses', 'GET', null, false, null);
        if(response.status === 200){
            return response.json().then(data => data);
        }
        if(response.status === 404){
            console.log(response)
            return null;
        }
        throw new Error();
    } 

    /** 
     * 'getCourse' method perform a syn operation that returns a course with an id that matches the parameter 'courseId'
     * @param {number} courseId 
     * If the HTTP response is 200, the response data is returned.
     * If the HTTP response is 404, the response is logged to the console and null is returned
     * A new error is thrown when an unexpected error occurs 
    */
    async getCourse(courseId){
        const response = await this.api(`/courses/${courseId}`, 'GET', null, false, null);
        if(response.status === 200){
            return response.json().then(data => data);
        }
        if(response.status === 404){
            console.log(response.status);
            console.log(response.statusText)
            return null;
        }
        throw new Error();
    }

     /** 
     * 'createCourses' method perform a syn operation that post a new course payload 
     * @param {object} course 
     * If the HTTP response is 201, an emprty array is returned 
     * If the HTTP response is 400, the response data errors are returned 
     * A new error is thrown when an unexpected error occurs 
    */
    async createCourse(course){
        const response = await this.api(`courses/create`, 'POST', course, true, null);
        if(response.status === 201) {
            return []
        }
        if(response.status === 400) {
            return response.json(data => {
                return data.errors;
            });       
        }
        throw new Error();
    }

    /** 
     * 'UpdateCourses' method perform a syn operation that update a course payload 
     * @param {number} courseId
     * If the HTTP response is 201, an emprty array is returned 
     * If the HTTP response is 400, the response data errors are returned 
     * A new error is thrown when an unexpected error occurs 
    */

    /** 
     * 'DeleteCourses' method perform a syn operation that delete a course payload 
     * @param {number} courseId 
     * If the HTTP response is 201, an emprty array is returned 
     * If the HTTP response is 400, the response data errors are returned 
     * A new error is thrown when an unexpected error occurs 
    */


    /** 
     * 'getUser' method perform a syn operation that returns a user with credentials that matches the parameters 'emailAddress' and 'password'
     * @param {string} emailAddress 
     * @param {string} password 
     * If the HTTP response is 200, the response data is returned.
     * If the HTTP response is 404, the response is logged to the console and null is returned
     * A new error is thrown when an unexpected error occurs 
    */
    async getUser(emailAddress, password){
        const response = await this.api('/users', 'GET', null, true, {emailAddress, password});
        if(response.status === 200){
            return response.json().then(data => data);
        }
        if(response.status === 401){
            console.log(response.statusText);
            return null;
        }
        throw new Error();
    }

    /** 
     * 'createUser' method perform a syn operation that creates a user with provided body. The body contains properties assigned to new user details
     * @param {object} user 
     * If the HTTP response is 201, an emprty array is returned 
     * If the HTTP response is 400, the response data errors are returned 
     * A new error is thrown when an unexpected error occurs 
    */
    async createUser(user){
        const response = await this.api('/users', 'POST', user);
        console.log(`This is the user object in createUser`, user); //looks okay - contains all the supplied inputs
        if(response.status === 201){
            return [];
        }
        if(response.status === 400){
            return response.json().then( data => {
                console.log('Errors from data.js', data);
                return data;
            });
            
        }
        throw new Error();
    }
}