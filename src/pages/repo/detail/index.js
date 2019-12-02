import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Descriptions, Skeleton, Divider, Button } from 'antd';

import { loadRepoInfo } from '@/redux/actions/repoActions';

function RepoDetail({ repo: { stargazersCount, createdAt }, loadRepoInfo }) {
  const { name, repoName } = useParams();
  const history = useHistory();

  useEffect(() => {
    loadRepoInfo({ name, repoName });
  }, [name, repoName, loadRepoInfo]);

  if (!stargazersCount && !createdAt) {
    return <Skeleton active />;
  }

  return (
    <>
      <Button
        onClick={() => {
          history.push('/logout');
        }}
      >
        LOG OUT
      </Button>
      <Divider />
      <Descriptions title="Repo Info">
        <Descriptions.Item label="NAME">{repoName}</Descriptions.Item>
        <Descriptions.Item label="OWNER">{name}</Descriptions.Item>
        <Descriptions.Item label="STARGAZERSCOUNT">{stargazersCount}</Descriptions.Item>
        <Descriptions.Item label="CREATED AT">{createdAt}</Descriptions.Item>
      </Descriptions>
    </>
  );
}

const mapStateToProps = ({ repos: { repo } }) => ({ repo });
const mapDispatchToProps = { loadRepoInfo };

export default connect(mapStateToProps, mapDispatchToProps)(RepoDetail);
