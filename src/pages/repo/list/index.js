import React from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

function ReposList({ repos }) {
  if (!repos.length) {
    return <Redirect to="/" />;
  }

  return (
    <Table
      rowKey="id"
      columns={[
        {
          title: 'FULL NAME',
          dataIndex: 'fullName',
          render(fullName) {
            return <Link to={`/repo/${fullName}`}>{fullName}</Link>;
          },
        },
        {
          title: 'DESCRIPTION',
          dataIndex: 'description',
        },
      ]}
      dataSource={repos}
    />
  );
}

const mapStateToProps = ({ repos: { repos } }) => ({ repos });

export default connect(mapStateToProps)(ReposList);
