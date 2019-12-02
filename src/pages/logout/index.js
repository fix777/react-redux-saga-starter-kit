import React from 'react';
import { useHistory } from 'react-router-dom';
import { Result, Button } from 'antd';

function getHandleReLogin(history) {
  return () => history.push('/');
}

function Logout() {
  const history = useHistory();

  return (
    <Result
      status="success"
      title="You are currently logged-out."
      extra={[
        <Button key="re-login" onClick={getHandleReLogin(history)}>
          RE-LOG IN
        </Button>,
      ]}
    />
  );
}

export default Logout;
