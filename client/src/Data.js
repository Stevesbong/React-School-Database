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
        return fetch(url, options);
    }

    /** 
     * 'getCourses' method perform a async operation that get list of courses.
    */
    async getCourses(){
        const response = await this.api('/courses', 'GET');
        if(response.status === 200){
            return response.json().then(data => data);
        } else if(response.status === 404){
            return null;
        } else {
            throw new Error();
        }
    } 

    /** 
     * 'getCourse' method perform a async operation that returns a course.
     * @param {number} courseId 
    */
    async getCourse(courseId){
        const response = await this.api(`/courses/${courseId}`, 'GET');
        if(response.status === 200){
            return response.json().then(data => data.course);
        } else if(response.status === 404){
            return null;
        } else {
            throw new Error();
        }
    }

    /**
     * 'createCourse' method perform a sync operation that create a course.
     * @param {object} course 
     * @param {object} authUser 
     */
    async createCourse(course, authUser){
        const { emailAddress, password } = authUser;
        const response = await this.api(`/courses`, 'POST', course, true, { emailAddress, password });
        if(response.status === 201) {
            return []
        } else if(response.status === 400) {
            return response.json(data => {
                return data.errors;
            });       
        } else {
            throw new Error();
        }
    }

    /** 
     * 'UpdateCourses' method perform a async operation that update a course. 
     * @param {object} course
     * @param {object} authUser
    */
    async updateCourse(course, authUser){
        const { emailAddress, password } = authUser;
        const response = await this.api(`/courses/${course.id}`, 'PUT', course, true, { emailAddress, password });
        if(response.status === 204) {
            return [];
        } else if(response.status === 400) {
            return response.json().then(data => {
                return data.errors
            });
        } else {
            throw new Error();
        }
    }

    /** 
     * 'DeleteCourses' method perform a async operation that delete a course.
     * @param {number} courseId 
    */
    async deleteCourse(courseId, authUser){
        const { emailAddress, password } = authUser;
        const response = await this.api(`/courses/${courseId}`, 'DELETE', null, true, { emailAddress, password });
        if(response.status === 204) {
            return [];
        } else if(response.status === 400) {
            return response.json().then(data => {
                return data.errors
            })
        } else {
            throw new Error();
        }
    }


    /** 
     * 'getUser' method perform a async operation that returns a user
     * with credentials that matches the parameters 'emailAddress' and 'password'
     * @param {string} emailAddress
     * @param {string} password
    */
    async getUser(emailAddress, password){
        const response = await this.api('/users', 'GET', null, true, {emailAddress, password});
        if(response.status === 200){
            return response.json().then(data => data);
        } else if(response.status === 401){
            console.log(response.statusText);
            return null;
        } else {
            throw new Error();
        }
    }

    /** 
     * 'createUser' method perform a async operation that create user.
     * @param {object} user  
    */
    async createUser(user){
        const response = await this.api('/users', 'POST', user);
        if(response.status === 201){
            return [];
        } else if(response.status === 400){
            return response.json().then( data => {
                return data.errors;
            });
        } else {
            throw new Error();
        }
    }
}