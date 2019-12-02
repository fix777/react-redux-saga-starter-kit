import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Card, Icon, Avatar } from 'antd';
import { connect } from 'react-redux';

import { loadUserInfo } from '@/redux/actions/userActions';

function User({ user = {}, reposCount = 0, loadUserInfo }) {
  const { login } = useParams();
  const history = useHistory();
  useEffect(() => {
    loadUserInfo({ login });
  }, [loadUserInfo, login]);

  return (
    <Card
      style={{ width: 300 }}
      actions={[
        <Button
          onClick={() => {
            history.push(`${login}/repos`);
          }}
        >
          <Icon type="github" key="github" /> View his/her {reposCount} Repos
        </Button>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar src={user.avatarUrl} />}
        title={user.name}
        description={user.bio}
      />
    </Card>
  );
}

const mapStateToProps = ({ user: { user }, repos: { repos } }) => ({
  user,
  reposCount: repos.length,
});
const mapDispatchToProps = { loadUserInfo };

export default connect(mapStateToProps, mapDispatchToProps)(User);
