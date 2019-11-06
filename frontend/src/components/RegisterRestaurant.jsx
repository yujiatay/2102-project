import React from 'react';
import { Button, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import { cuisineTypesList } from "constants.js";

const RegisterRestaurantForm = (props) => {
  const {handleChange, submitForm} = props;
  const {username, email, password, name, openingHours, branchLocation, capacity, cuisineType} = props.form;
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
        <InputGroup className="input-group-alternative mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-shop" />
            </InputGroupText>
          </InputGroupAddon>
          <Input placeholder="Your restaurant name" type="text" value={name}
            onChange={(e) => handleChange('name', e)}/>
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <InputGroup className="input-group-alternative mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-calendar-grid-58" />
            </InputGroupText>
          </InputGroupAddon>
          <Input placeholder="Opening hours e.g. Mon to Fri, 12pm - 10pm" type="text" value={openingHours}
            onChange={(e) => handleChange('openingHours', e)}/>
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <InputGroup className="input-group-alternative mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-square-pin" />
            </InputGroupText>
          </InputGroupAddon>
          <Input placeholder="Address" type="text" value={branchLocation}
            onChange={(e) => handleChange('branchLocation', e)}/>
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <InputGroup className="input-group-alternative mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-single-02" />
            </InputGroupText>
          </InputGroupAddon>
          <Input placeholder="Max capacity" type="number" value={capacity}
            onChange={(e) => handleChange('capacity', e)}/>
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <InputGroup className="input-group-alternative mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-tag" />
            </InputGroupText>
          </InputGroupAddon>
          <Input type="select" name="select" id="cuisine"
            value={cuisineType}
            onChange={(e) => handleChange('cuisineType', e)}>
            {
              cuisineTypesList.map(ct => (
                <option value={ct[1]} key={ct[1]}>{ct[0]}</option>
              ))
            }
          </Input>
        </InputGroup>
        
      </FormGroup>
      <div className="text-center">
        <Button
          className="mt-4"
          color="primary"
          type="button"
          onClick={() => submitForm("restaurant")}
        >
          Create account
        </Button>
      </div>
    </Form>
  );
}

export default RegisterRestaurantForm;