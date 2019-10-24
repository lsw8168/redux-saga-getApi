import React from "react";
import { connect } from "react-redux";
import { getNews, getNewsRemove } from "../reducers";
import App from "../components/App";

const Button = ({ getNews, users, error, loading, getNewsRemove }) => {
  return (
    <App
      onGetNews={() => getNews()}
      onRemoveNews={() => getNewsRemove()}
      users={users}
      error={error}
      loading={loading}
    />
  );
};

export default connect(
  state => ({
    users: state.news,
    error: state.error,
    loading: state.loading
  }),
  { getNews, getNewsRemove }
)(Button);
