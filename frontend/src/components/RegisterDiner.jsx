import React from 'react';
import { Button, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";

const RegisterDinerForm = (props) => {
  const {handleChange, submitForm} = props;
  const {username, email, password, referral} = props.form;
  return (
    <Form role="form">
      <FormGroup>
        <InputGroup className="input-group-alternative mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-circle-08" />
            </InputGroupText>
          </InputGroupAddon>
          <Input placeholder="Username" type="text" value={username}
            onChange={(e) => handleChange('username', e)}/>
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <InputGroup className="input-group-alternative mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-email-83" />
            </InputGroupText>
          </InputGroupAddon>
          <Input placeholder="Email" type="email" value={email}
            onChange={(e) => handleChange('email', e)}/>
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-lock-circle-open" />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            placeholder="Password"
            type="password"
            autoComplete="off"
            value={password}
            onChange={(e) => handleChange('password', e)}
          />
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="fa fa-users" />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            placeholder="Referral code (if any)"
            type="text"
            value={referral}
            onChange={(e) => handleChange('referral', e)}
          />
        </InputGroup>
      </FormGroup>
      <div className="text-center">
        <Button
          className="mt-4"
          color="primary"
          type="button"
          onClick={() => submitForm("diner")}
        >
          Create account
        </Button>
      </div>
    </Form>
  );
}

export default RegisterDinerForm;