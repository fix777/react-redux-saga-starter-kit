import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

function getHandleSubmit(form, history) {
  return e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      history.push(values['username']);
    });
  };
}

function GithubLoginForm({ form }) {
  const history = useHistory();
  const { getFieldDecorator } = form;

  return (
    <Form layout="inline" onSubmit={getHandleSubmit(form, history)}>
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Please input your username!' }],
        })(<Input placeholder="Username" />)}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Form.create({ name: 'github_login' })(GithubLoginForm);
