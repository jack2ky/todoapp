const expect = require("expect");
const request = require("supertest")
const {ObjectID} = require("mongoose").mongo


const {app} = require("./../server")
const {Todo} = require("./../models/todo");

const {User} = require("./../models/user");
const {todos, populateTodos, users, populateUsers} = require("./seeds/seed");





// beforeEach() will automatically execute before EACH test case
beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {

    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    // return here, just stop the execution of continuing
                    return done(err);
                }

                // here we make the assumption that the DB is initially empty
                Todo.find({ text }).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})//pass here, invalid data
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                //check the DB
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });

});


describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            // we use .toHeString() to the id, cause we get an id Object and not String
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        // make a new ID, and make sure you get a 404 back
        var hexID = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${hexID}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non-object ids', (done) => {
        // /todos/123  again make sure you get a 404 back
        request(app)
            .get('/todos/123abc')
            .expect(404)
            .end(done);
    });
});

describe("GET /users/me", () =>{
    it("should retur usr if authenticated", (done) =>{
        request(app)
            .get("/users/me")
            .set("x-auth", users[0].tokens[0].token)
            .expect((res) =>{
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email)
            })
            .end(done);
    })

    it("should return 401 if not authenticated", (done) =>{
        request(app)
            .get("/users/me")
            .expect(401)
            .expect((res) =>{
                expect(res.body).toEqual({});
            })
            .end(done)
    })
})

describe("POST /users", () =>{
    // it("should create a user", (done) =>{
    //     var email = "example@example.com";
    //     var password = "123mnb";

    //     request(app)
    //         .post("/users")
    //         .send({email, password})
    //         .expect(200)
    //         .expect(res =>{
    //             expect(res.headers["x-auth"]).toExist();
    //             expect(res.body._id).toExist();
    //             expect(res.body.email).toBe(email);
    //         })
    //         .end(done)

    // })

    it("should create a user", (done) =>{
        var email = "eamil@g.com";
        var password = "1234567";


        request(app)
            .post("/users")
            .send({email, password})
            .expect(200)
            .expect(res =>{
                expect(res.headers["x-auth"]).toBeTruthy();
                expect(res.body._id).toBeTruthy();
                expect(res.body.email).toBe(email)
            })
            .end(err =>{
                if(err) return done(err);
            

                User.findOne({email}).then(user =>{
                    console.log("USER___" , user)
                    expect(user).toBeTruthy();
                    expect(user.password).not.toBe(password);
                    done();
                })
            })


    })
    it("Should return validation errors if request invalid", (done) =>{
        var email = "myname@gmail.com";
        var password = "1234";
        request(app)
            .post("/users")
            .send({email , password})
            .expect(400)
            .end(done)
    })

    it("Should not create user if email in user", (done) =>{
        console.log("EMAIL : ",users[0].email)
        email = users[0].email;
        request(app)
            .post("/users")
            .send({email})
            .expect(400)
            .end(done)
    })
})

// describe('DELETE /todos/:id', () => {
//     it('should remove a todo', (done) => {
//         var hexID = todos[1]._id.toHexString();

//         request(app)
//             .delete(`/todos/${hexID}`)
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body.todo._id).toBe(hexID);
//             })
//             .end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 // query DB using findById
//                 // expect(null).toNotExist();
//                 Todo.findById(hexID).then((todo) => {
//                     expect(todo).toNotExist();
//                     done();
//                 }).catch((e) => done(e));
//             });
//     });

//     it('should return 404 if todo not found', (done) => {
//         var hexID = new ObjectID().toHexString();
//         request(app)
//             .delete(`/todos/${hexID}`)
//             .expect(404)
//             .end(done);
//     });

//     it('should return 404 if object id is invalid', (done) => {
//         request(app)
//             .delete('/todos/123abc')
//             .expect(404)
//             .end(done);
//     });
// });

// describe('PATCH /todos/:id', () => {

//     it('should update the todo', (done) => {
//         // grab id of 1rst item
//         var hexID = todos[0]._id.toHexString();
//         // update text, set completed to true
//         var text = "Updated Item through Test";

//         request(app)
//             .patch(`/todos/${hexID}`)
//             .send({
//                 completed: true,
//                 text
//             })
//             // 200
//             .expect(200)
//             .expect((res) => {
//                 // text is equal to our text, complete is true
//                 expect(res.body.todo.text).toBe(text);
//                 expect(res.body.todo.completed).toBe(true);
//                 // and completedAt is a number .toBeA
//                 expect(res.body.todo.completedAt).toBeA('number');
//             })
//             .end(done);
//     });

//     it('should clear completedAt when todo is not completed', (done) => {
//         // grab id of 2nd item
//         var hexID = todos[1]._id.toHexString();
//         // update text, set completed to false
//         var text = "Updated Item through Test2";
//         request(app)
//             .patch(`/todos/${hexID}`)
//             .send({
//                 completed: false,
//                 text
//             })
//             // 200
//             .expect(200)
//             .expect((res) => {
//                 // text is changed, completed false,
//                 expect(res.body.todo.text).toBe(text);
//                 expect(res.body.todo.completed).toBe(false);
//                 //  completedAt is null . toNotExist
//                 expect(res.body.todo.completedAt).toNotExist();
//             })
//             .end(done);
//     });
// });