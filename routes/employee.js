const express = require("express");
const employeeModel = require("../models/employee");
const routes = express.Router();

// #3 GET http://localhost:3712/api/emp/employees
// User can get all employee list.
routes.get("/emp/employees", async (req, res) => {
    try {
        const employees = await employeeModel.find();
        res.status(200).send(employees);
    }
    catch (error) {
        res.status(500).send(error);
    }
});

// #4 POST http://localhost:3712/api/emp/employees
// User can create new employee.
routes.post("/emp/employees", async (req, res) => {
    try {
        const employee = await employeeModel(req.body);
        await employee.save();
        res.status(201).send(employee);
    }
    catch (error) {
        res.status(500).send(error);
    }
});

// #5 GET http://localhost:3712/api/emp/employees/{eid}
// User can get employee details by employee id.
routes.get("/emp/employees/:eid", async (req, res) => {
    try {
        const employee = await employeeModel.findById(req.params.eid);
        res.status(200).send(employee);
    }
    catch (error) {
        res.status(500).send(error);
    }
});

// #6 PUT http://localhost:3712/api/emp/employees/{eid}
// User can update employee details.
routes.put("/emp/employees?eid", async (req, res) => {
    try {
        const employee = await employeeModel.findByIdAndUpdate(req.params.eid, req.body);
        res.status(200).send(employee);
    }
    catch (error) {
        res.status(500).send(error);
    }
});

// #7 DELETE http://localhost:3712/api/emp/employees/{eid}
// User can delete employee by employee id.
routes.delete("/emp/employees/:eid", async (req, res) => {
    try {
        const employee = await employeeModel.findByIdAndDelete(req.params.eid);
        
        res.status(204).send();
        if (!employee) {
            res.status(404).send("No Item found");
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});

module.exports = routes;