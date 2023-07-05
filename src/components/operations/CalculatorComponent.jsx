import React, { useState } from 'react';
import ApiService from '../../service/ApiService';

const CalculatorComponent = () => {
    const [firstOperand, setFirstOperand] = useState('');
    const [secondOperand, setSecondOperand] = useState('');
    const [result, setResult] = useState('');

    const multiplication = (e) => {
        e.preventDefault();
        const data = {
            firstOperand,
            secondOperand
        };
        ApiService.multiplication(data)
            .then((res) => {
                setResult(res.data);
            }).catch(error => {
            manageError(error);
        });
    };

    const addition = (e) => {
        e.preventDefault();
        const data = {
            firstOperand,
            secondOperand
        };
        ApiService.addition(data)
            .then((res) => {
                setResult(res.data);
            }).catch(error => {
            manageError(error);
        });
    };

    const subtraction = (e) => {
        e.preventDefault();
        const data = {
            firstOperand,
            secondOperand
        };
        ApiService.subtraction(data)
            .then((res) => {
                setResult(res.data);
            }).catch(error => {
            manageError(error);
        });
    };

    const division = (e) => {
        e.preventDefault();
        const data = {
            firstOperand,
            secondOperand
        };
        ApiService.division(data)
            .then((res) => {
                console.log(res);
                setResult(res.data);
            }).catch(error => {
            manageError(error);
        });
    };

    const squareRoot = (e) => {
        e.preventDefault();
        const data = {
            firstOperand,
            secondOperand
        };
        ApiService.squareRoot(data)
            .then((res) => {
                setResult(res.data);
            }).catch(error => {
            manageError(error);
        });
    };

    const randomString = (e) => {
        e.preventDefault();
        const data = {
            firstOperand,
            secondOperand
        };
        ApiService.randomString(data)
            .then((res) => {
                setResult(res.data);
            }).catch(error => {
            manageError(error);
        });
    };

    const clearOperands = (e) => {
        e.preventDefault();
        setFirstOperand('');
        setSecondOperand('');
        setResult('');
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        if (name === 'firstOperand') {
            setFirstOperand(value);
        } else if (name === 'secondOperand') {
            setSecondOperand(value);
        }
    };

    const manageError = (error) => {
        console.error(error);
        redirectToLogin();
    }

    const loadRecords = (e) => {
        e.preventDefault();
        window.location.href = "/records";
    }

    const logout = (e) => {
        e.preventDefault();
        ApiService.logout()
            .then((res) => {
                localStorage.removeItem('token');
                setResult(res.data);
                this.redirectToLogin();
            }).catch(error => {
            manageError(error);
        });
    }

   const redirectToLogin = () => {
        window.location.href = "/login";
    }

    return (
        <div>
            <h2 className="text-center">Perform Operation</h2>
            <div className="form-group">
                <button className="btn btn-link" onClick={loadRecords}>Records</button>
                <button className="btn btn-primary" onClick={logout}>Logout</button>
            </div>
            <form>
                <div className="form-group">
                    <label>First Operand:</label>
                    <input
                        type="text"
                        placeholder="First Operand"
                        name="firstOperand"
                        className="form-control"
                        value={firstOperand}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label>Second Operand:</label>
                    <input
                        type="text"
                        placeholder="Second Operand"
                        name="secondOperand"
                        className="form-control"
                        value={secondOperand}
                        onChange={onChange}
                    />
                </div>

                <div className="form-group">
                    <button className="btn btn-success" onClick={addition}>+</button>
                    <button className="btn btn-success" onClick={subtraction}>-</button>
                    <button className="btn btn-success" onClick={multiplication}>*</button>
                    <button className="btn btn-success" onClick={division}>/</button>
                    <button className="btn btn-success" onClick={squareRoot}>√</button>
                    <button className="btn btn-success" onClick={clearOperands}>C</button>
                </div>
                <div className="form-group">
                    <button className="btn btn-success" onClick={randomString}>Random String</button>
                </div>
                <div className="form-group">
                    <label>Result:</label>
                    <input
                        type="text"
                        placeholder="Result"
                        readOnly
                        name="result"
                        className="form-control"
                        value={result}
                    />
                </div>
            </form>
        </div>
    );
};

export default CalculatorComponent;
